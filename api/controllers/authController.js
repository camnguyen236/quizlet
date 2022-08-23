const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const accountController = require('./accountController');

class authController {
   // [POST] /login
   handleLogin = async (req, res) => {
      try {
         const cookies = req.cookies;

         if (req.user) {
            // Create JWTs
            const accessToken = jwt.sign(
               { "username": req.user.username },
               process.env.ACCESS_TOKEN_SECRET,
               { expiresIn: '15m' }
            );
            const newRefreshToken = jwt.sign(
               { "username": req.user.username },
               process.env.REFRESH_TOKEN_SECRET,
               { expiresIn: '1d' }
            );

            let newRefreshTokenArray = 
               !cookies?.refreshToken
                     ? req.user.refreshToken
                     : req.user.refreshToken.filter(rt => rt !== cookies.refreshToken);

            if (cookies?.refreshToken) {
               const refreshToken = cookies.refreshToken;
               const foundToken = await Account.findOne({ refreshToken }).exec();

               // Detected refresh token reuse
               if (!foundToken) {
                     console.log('attempted refresh token reuse at login');
                     // Clear out all previous refresh tokens
                     newRefreshTokenArray = [];
               }

               res.clearCookie('refreshToken', {
                     httpOnly: true,
                     secure: false,
                     sameSite: "strict"
               });
            }                    
            
            // Saving refreshToken with current user
            req.user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await req.user.save();
            // console.log(result);
            
            res.cookie('refreshToken', newRefreshToken, {
               httpOnly: true,
               secure: false,
               sameSite: "strict"
            });
            res.status(200).json({ accessToken });
         }
      } catch (error) {
          res.status(500).json(error);
      }
   }

   // [GET] /logout
   handleLogout = async (req, res, next) => {
      // req.logout(function (err) {
      //    if (err) {
      //       return next(err);
      //    }
      //    res.redirect('/auth/login');
      // });

      try {
         const cookies = req.cookies;
         if (!cookies?.refreshToken) {
            return res.sendStatus(204); // No content
         }
         const refreshToken = cookies.refreshToken;

         // Is refreshToken in db?
         const foundUser = await Account.findOne({ refreshToken: refreshToken}).exec();
         if (!foundUser) {
            res.clearCookie('refreshToken', {
               httpOnly: true,
               secure: false,
               sameSite: "strict"
            });
            return res.sendStatus(204);
         }

         // Delete refreshToken in db
         foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
         const result = await foundUser.save();
         console.log(result);

         res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
         });
         return res.sendStatus(204);
      } catch (error) {
            res.status(500).json(error);
      }
   };

   // [POST] /register
   handleRegister = async (req, res) => {
      try {
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
               weekStreak: 0
            }
         });
         //create new account to db
         await newAccount.save();
         //if success send response true and status to FE
         res.status(200).send(true);
      } catch (err) {
         res.status(500).send(false);
      }
   };

   // Return true if USERNAME existed
   // Return false if USERNAME is new
   checkExistedUsername = async (req, res) => {
      try {
         const check = await accountController.getAccountByProp(
            'username',
            req.query.username
         );
         if (check) {
            res.send(true);
            return true;
         } else {
            res.send(false);
            return false;
         }
      } catch (err) {
         res.status(500).json(err);
      }
   };

   //Return true if EMAIL existed
   //Return false if EMAIL is new
   checkExistedEmail = async (req, res) => {
      try {
         const check = await accountController.getAccountByProp(
            'email',
            req.query.email
         );
         if (check) {
            res.send(true);
            return true;
         } else {
            res.send(false);
            return false;
         }
      } catch (err) {
         res.status(500).json(err);
      }
   };
}

module.exports = new authController();
