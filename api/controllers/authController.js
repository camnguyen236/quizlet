const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const passport = require('passport');

class authController {
    // [POST] /login
    handleLogin = () => {
        passport.authenticate('local', 
        { 
            successRedirect: '/api/auth/main',
            failureRedirect: '/api/auth/login', 
            // failureMessage: true
        })
    }

    // [GET] /logout
    handleLogout = (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/api/auth/login');
        });
    }
};

module.exports = new authController();