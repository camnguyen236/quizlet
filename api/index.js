const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const cors = require('cors');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected to mongoDB")).catch(err => console.log(err));

app.use(cors());

app.use("/api/auth", authRoute);

app.listen(5000, (req, res) => {
    console.log("Backend is running on port 5000");
})