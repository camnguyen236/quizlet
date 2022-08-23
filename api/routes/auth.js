const router = require("express").Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const { isAuthenticated } = require("../middlewares/auth");

////////////// REGISTER ///////////////////////////////

router.post("/register", authController.handleRegister);

//api to get user by username
router.get("/user/username/", authController.checkExistedUsername);

//api to get user by email
router.get("/user/email/", authController.checkExistedEmail);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/google/callback", authController.handleLoginWithGoogle
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/facebook/callback", authController.handleLoginWithFacebook
);

////////////// LOGIN ///////////////////////

router.get("/main", (req, res) => {
  res.render("main");
});
router.get("/login", function (req, res, next) {
  res.render("login");
});

// Login with username and password
router.post(
  "/login", authController.handleLogin
);

// Logout
router.get("/logout", authController.handleLogout);

module.exports = router;
