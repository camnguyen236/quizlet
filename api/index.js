const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const {Strategy: GoogleStrategy} = require("passport-google-oauth20");
const FacebookStrategy = require('passport-facebook').Strategy;
const Account = require("./models/Account");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(console.log("Connected to mongoDB")).catch(err => console.log(err));

app.use(cors());

//use session to save register/login session
app.use(session({
    secret: "secret", saveUninitialized: false, resave: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (acc, done) {
    done(null, acc.id);
});

passport.deserializeUser(function (id, done) {
    Account.findById(id, (err, acc) => {
        done(err, acc);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, function (accessToken, refreshToken, profile, cb) {
    //use findOne or Create user by mongoose method
    // or install mongoose-findorcreate package to use findOrCreate() + require + plugin shcema
    if (profile.id) {
        Account.findOne({googleId: profile.id})
            .then((existingUser) => {
                if (existingUser) {
                    cb(null, existingUser);
                } else {
                    new Account({
                        username: profile.id,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        profilePicture: profile.photos[0].value
                    })
                        .save()
                        .then(user => cb(null, user));
                    console.log("save to db");
                }
            });
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields: ['id', 'emails', 'photos']
}, function (accessToken, refreshToken, profile, cb) {
    if (profile.id) {
        Account.findOne({facebookId: profile.id})
            .then((existingUser) => {
                if (existingUser) {
                    cb(null, existingUser);
                } else {
                    new Account({
                        username: profile.id,
                        email: profile.emails[0].value,
                        facebookId: profile.id,
                        profilePicture: profile.photos[0].value
                    })
                        .save()
                        .then(user => cb(null, user));
                    console.log("saved to db");
                }
            });
    }
}));

app.use("/auth", authRoute);

app.listen(5000, (req, res) => {
    console.log("Backend is running on port 5000");
})