const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const db = require('./config/db');
const route = require('./routes');

require('./config/passport')(passport);

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
app.use(cookieParser());

app.use(session({
    secret: "quizlet secret",
    saveUninitialized: true,
    // cookie: { maxAge: 1000 },
    resave: false
}))

app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
db.connect()

//routes init
route(app);

app.listen(5000, (req, res) => {
    console.log("Backend is running on port 5000");
})