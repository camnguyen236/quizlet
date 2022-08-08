const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const accountRoute = require('./routes/accounts');
const refreshRoute = require('./routes/refresh');
const verifyJWT = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser');

dotenv.config();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// middleware for cookie
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected to mongoDB")).catch(err => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/refresh", refreshRoute);

app.use(verifyJWT);
app.use("/api/account", accountRoute);

app.listen(5000, (req, res) => {
    console.log("Backend is running on port 5000");
})