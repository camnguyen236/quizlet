const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
   username: {
      type: String,
      require: true,
      unique: true,
   },
   password: {
      type: String,
   },
   email: {
      type: String,
      unique: true,
   },
   birthday: {
      type: String,
   },
   profilePicture: {
      type: String,
      default: './defaultProfilePic.jpg',
   },
   googleId: {
      type: String,
   },
   facebookId: {
      type: String,
   },
   refreshToken: [String],
   achievement: {
      month: {
         type: Number,
         required: false,
      },
      achieve: {
         type: Array,
         required: false,
      },
      dayStreak: Number,
      weekStreak: Number,
   },
});

module.exports = mongoose.model('Account', AccountSchema);
