const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const accountController = require("./accountController");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { clearConfigCache } = require("prettier");

class authController {
  createJWTs = async (req, res, user) => {
    try {
      const cookies = req.cookies;
      if (user) {
        // Create JWTs
        const accessToken = jwt.sign(
          { username: user.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        const newRefreshToken = jwt.sign(
          { username: user.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        console.log(user._id);
        let newRefreshTokenArray = !cookies?.refreshToken
          ? user.refreshToken
          : user.refreshToken.filter((rt) => rt !== cookies.refreshToken);

        if (cookies?.refreshToken) {
          const refreshToken = cookies.refreshToken;
          const foundToken = await Account.findOne({
            refreshToken,
          }).exec();

          // Detected refresh token reuse
          if (!foundToken) {
            console.log("attempted refresh token reuse at login");
            // Clear out all previous refresh tokens
            newRefreshTokenArray = [];
          }

          res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
          });
        }

        // Saving refreshToken with current user
        user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await user.save();
        console.log(result);

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        res.status(200).json({ user, accessToken });
        // res.redirect('http://localhost:5000/auth/main');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  // [POST] /login
  handleLogin = (req, res) => {
    passport.authenticate("local", (result, user) => {
      if (user) {
        this.createJWTs(req, res, user);
      } else res.redirect("http://localhost:5000/auth/login");
    })(req, res);
  };

  // [GET] /google/callback
  handleLoginWithGoogle = (req, res) => {
    passport.authenticate("google", (result, user) => {
      if (user) {
        this.createJWTs(req, res, user);
      }
    })(req, res);
  };

  // [GET] /facebook/callback
  handleLoginWithFacebook = (req, res) => {
    passport.authenticate("facebook", (result, user) => {
      if (user) {
        this.createJWTs(req, res, user);
      }
    })(req, res);
  };

  // [GET] /logout
  handleLogout = catchAsync(async (req, res, next) => {
    // req.logout(function (err) {
    //    if (err) {
    //       return next(err);
    //    }
    //    res.redirect('/auth/login');
    // });
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      return res.sendStatus(204); // No content
    }
    const refreshToken = cookies.refreshToken;

    // Is refreshToken in db?
    const foundUser = await Account.findOne({
      refreshToken: refreshToken,
    }).exec();
    if (!foundUser) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken
    );
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.sendStatus(204);
    // res.redirect('http://localhost:5000/auth/login');
  });

  // [POST] /register
  handleRegister = catchAsync(async (req, res, next) => {
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newAccount = new Account({
      username: req.body.username,
      password: hashedPass,
      email: req.body.email,
      birthday: req.body.birthday,
      profilePicture: req.body.profilePicture,
      achievement: {
        month: new Date().getMonth() + 1,
        achieve: [],
        dayStreak: 0,
        weekStreak: 0,
      },
    });
    //create new account to db

    await newAccount.save();
    //if success send response true and status to FE
    res.status(200).send(true);
  });

  // Return true if USERNAME existed
  // Return false if USERNAME is new
  checkExistedUsername = catchAsync(async (req, res) => {
    const check = await accountController.getAccountByProp(
      "username",
      req.query.username
    );
    if (check) {
      res.send(true);
      return true;
    } else {
      res.send(false);
      return false;
    }
  });

  //Return true if EMAIL existed
  //Return false if EMAIL is new
  checkExistedEmail = catchAsync(async (req, res) => {
    const check = await accountController.getAccountByProp(
      "email",
      req.query.email
    );
    if (check) {
      res.send(true);
      return true;
    } else {
      res.send(false);
      return false;
    }
  });
  // [GET] /auth/:usernameOrEmail
  checkExistedUsernameOrEmail = async (req, res) => {
    try {
      const account = await Account.findOne({
        $or: [
          { username: req.params.usernameOrEmail },
          { email: req.params.usernameOrEmail },
        ],
      });
      const { email, ...others } = account;
      console.log(account);
      res.status(200).json({
        status: "Success",
        data: email,
      });
    } catch (err) {
      res.status(500).json({
        status: "Fail",
        message: err,
      });
    }
  };
}

module.exports = new authController();
