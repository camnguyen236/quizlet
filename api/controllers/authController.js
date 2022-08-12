const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const passport = require('passport');

class authController {
    // [POST] /login
    handleLogin = () => {
        passport.authenticate('local', 
        { 
            successRedirect: '/auth/main',
            failureRedirect: '/auth/login'
        })
    }

    // [GET] /logout
    handleLogout = (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/auth/login');
        });
    }
};

module.exports = new authController();