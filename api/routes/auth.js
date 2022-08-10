const router = require('express').Router();
const authController = require('../controller/authController')
const passport = require("passport");

//Register

router.post("/register", authController.handleRegister);

//api to get user by username
router.get("/user/username/", authController.checkExistedUsername);

//api to get user by email
router.get("/user/email/", authController.checkExistedEmail);

router.get('/google', passport.authenticate('google',{scope : [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]}));

router.get("/google/callback" ,passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/latest',
    failureRedirect: 'http://localhost:5000/auth/google'
}));

router.get('/facebook',
    passport.authenticate('facebook', {scope: [
            'public_profile',
            'email'
        ]}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/latest',
    failureRedirect: 'http://localhost:5000/auth/facebook'
}));

module.exports = router;