const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const Account = require('./models/Account');
const bcrypt = require('bcrypt');

dotenv.config();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(morgan('combined'));
app.set('view engine', 'ejs');

app.use(cors());

app.use(session({
    secret: "secret", saveUninitialized: false, resave: false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected to mongoDB")).catch(err => console.log(err));

passport.use(new LocalStrategy(
    function(username, password, done) {
        // console(username, password);
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

app.use("/api/auth", authRoute);

app.listen(5000, (req, res) => {
    console.log("Backend is running on port 5000");
})