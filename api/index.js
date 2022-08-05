const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected to mongoDB")).catch(err => console.log(err));

app.listen(5000, (req, res) => {
    console.log("Backend is running on port 5000");
})