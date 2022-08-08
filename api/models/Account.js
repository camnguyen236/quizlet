const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: true,
        default: "./defaultProfilePic.jpg"
    }
});

module.exports = mongoose.model("Account", AccountSchema);
