const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
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
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    }
});

module.exports = mongoose.model("Account", AccountSchema);
