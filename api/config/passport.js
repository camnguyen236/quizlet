const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const Account = require('../models/Account');

require('dotenv').config()

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
          Account.findOne({ username: username }, async function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Incorrect username or password.' }); }
            const validPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!validPassword) { return done(null, false, { message: 'Incorrect username or password.' }); }
            return done(null, user);
          });
          
        }
    ));
    
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        Account.findOne({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/api/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        Account.findOne({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    
    passport.serializeUser(function (acc, done) {
        done(null, acc.id);
    });
    
    passport.deserializeUser(function (id, done) {
        Account.findById(id, (err, acc) => {
            done(err, acc);
        });
    });
}