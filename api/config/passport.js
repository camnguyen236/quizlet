const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcrypt");
const Account = require("../models/Account");

<<<<<<< HEAD
require("dotenv").config();

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      console.log(username + " " + password);
      Account.findOne({ username: username }, async function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }
        return done(null, user);
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      function (accessToken, refreshToken, profile, cb) {
        //use findOne or Create user by mongoose method
        // or install mongoose-findorcreate package to use findOrCreate() + require + plugin shcema
        if (profile.id) {
          Account.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
              cb(null, existingUser);
            } else {
              new Account({
                username: profile.id,
                email: profile.emails[0].value,
                googleId: profile.id,
                profilePicture: profile.photos[0].value,
              })
                .save()
                .then((user) => cb(null, user));
              console.log("saved to db");
            }
          });
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ["id", "emails", "photos"],
      },
      function (accessToken, refreshToken, profile, cb) {
        if (profile.id) {
          Account.findOne({ facebookId: profile.id }).then((existingUser) => {
            if (existingUser) {
              cb(null, existingUser);
            } else {
              new Account({
                username: profile.id,
                email: profile.emails[0].value,
                facebookId: profile.id,
                profilePicture: profile.photos[0].value,
              })
                .save()
                .then((user) => cb(null, user));
              console.log("saved to db");
            }
          });
        }
      }
    )
  );

  passport.serializeUser(function (acc, done) {
    done(null, acc.id);
  });

  passport.deserializeUser(function (id, done) {
    Account.findById(id, (err, acc) => {
      done(err, acc);
    });
  });
=======
require('dotenv').config();

module.exports = function (passport) {
   passport.use(
      new LocalStrategy(function (username, password, done) {
         Account.findOne({ username: username }, async function (err, user) {
            if (err) {
               return done(err);
            }
            if (!user) {
               return done(null, false, {
                  message: 'Incorrect username or password.',
               });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
               return done(null, false, {
                  message: 'Incorrect username or password.',
               });
            }
            return done(null, user);
         });
      })
   );

   passport.serializeUser(function (acc, done) {
      done(null, acc.id);
   });

   passport.deserializeUser(function (id, done) {
      Account.findById(id, (err, acc) => {
         done(err, acc);
      });
   });

   passport.use(
      new GoogleStrategy(
         {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/google/callback',
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
         },
         function (accessToken, refreshToken, profile, cb) {
            //use findOne or Create user by mongoose method
            // or install mongoose-findorcreate package to use findOrCreate() + require + plugin shcema
            if (profile.id) {
               Account.findOne({ googleId: profile.id }).then(
                  (existingUser) => {
                     if (existingUser) {
                        cb(null, existingUser);
                     } else {
                        new Account({
                           username: profile.id,
                           email: profile.emails[0].value,
                           googleId: profile.id,
                           profilePicture: profile.photos[0].value,
                        })
                           .save()
                           .then((user) => cb(null, user));
                        console.log('saved to db');
                     }
                  }
               );
            }
         }
      )
   );

   passport.use(
      new FacebookStrategy(
         {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:5000/auth/facebook/callback',
            profileFields: ['id', 'emails', 'photos'],
         },
         function (accessToken, refreshToken, profile, cb) {
            if (profile.id) {
               Account.findOne({ facebookId: profile.id }).then(
                  (existingUser) => {
                     if (existingUser) {
                        cb(null, existingUser);
                     } else {
                        new Account({
                           username: profile.id,
                           email: profile.emails[0].value,
                           facebookId: profile.id,
                           profilePicture: profile.photos[0].value,
                        })
                           .save()
                           .then((user) => cb(null, user));
                        console.log('saved to db');
                     }
                  }
               );
            }
         }
      )
   );
>>>>>>> aba857b (Account model + CRUD 🍬)
};
