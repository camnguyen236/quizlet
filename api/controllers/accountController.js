const bcrypt = require('bcrypt');
const Account = require('../models/Account');

class accountController {
   // [PUT] /accounts/update?id=
   updateAccount = async (req, res) => {
      //if update password then hash it
      if (req.body.password) {
         const salt = await bcrypt.genSalt(10);
         req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
         await Account.findByIdAndUpdate(
            req.query.id,
            {
               $set: req.body
               //options.new: true => return the modified doc rather than the original
            },
            { new: true, overwrite: false }
         );
         res.status(200).json('Updated account successfully!');
      } catch (err) {
         res.status(500).json(err);
      }
   };

   // [DELETE] /accounts/delete?id=
   deleteAccount = async (req, res) => {
      try {
         await Account.findByIdAndDelete(req.query.id);
         res.status(200).json('Deleted account successfully!');
      } catch (err) {
         res.status(500).json(err);
      }
   };

   // [GET] /accounts/find?id=
   getAccount = async (req, res) => {
      try {
         const account = await Account.findById(req.query.id);
         const { password, ...others } = account._doc;
         res.status(200).json(others);
      } catch (err) {
         res.status(500).json(err);
      }
   };

   //thật là thắc mắc??? tại sao truyền [prop: val] vào findOne không được?
   // truyền condition = {prop: val} cũng k đc
   // mà như dưới lại đc???? ủa
   //get được trả về true
   getAccountByProp = async (prop, val) => {
      const condition = {};
      condition[prop] = val;
      let flag = false;
      const account = await Account.findOne(condition);
      if (account !== null) flag = true;
      return flag;
   };

   //////////////// ACHIEVEMENT ////////////////

   //[GET] /accounts/find/achievement?id=
   getAchievements = async (req, res) => {
      try {
         const account = await Account.findByIdAndUpdate(req.query.id);
         const { achievement, ...others } = account._doc;
         res.status(200).json(achievement);
      } catch (err) {
         res.status(500).json(err);
      }
   };

   calDayStreak = (date, currentDayStreak) => {
      if (date[date.length - 1] - date[date.length - 2] === 1) {
         if (currentDayStreak === 0) return 2;
         else return currentDayStreak + 1;
      } else return 0;
   };

   calWeekStreak = (dayStreak, weekStreak) => {
      if (dayStreak > weekStreak * 7) {
         return Math.floor(dayStreak / 7);
      } else {
         return weekStreak;
      }
   };

   //[PUT] /accounts/update/achievement?id=
   //fe must have state updateAchieve
   //once user click on learning call api then set updateAchive true
   //to make sure api is called only one time
   updateAchievement = async (req, res) => {
      try {
         const userAchievement = await Account.findById(req.query.id).select(
            'achievement'
         );
         userAchievement.achievement.month = new Date().getMonth() + 1;
         userAchievement.achievement.achieve.push(new Date().getDate());
         userAchievement.achievement.dayStreak = this.calDayStreak(
            userAchievement.achievement.achieve,
            userAchievement.achievement.dayStreak
         );
         userAchievement.achievement.weekStreak = this.calWeekStreak(
            userAchievement.achievement.dayStreak,
            userAchievement.achievement.weekStreak
         );

         const updated = await Account.updateOne(
            { _id: req.query.id },
            {
               $set: {
                  'achievement.achieve': userAchievement.achievement.achieve,
                  'achievement.month': userAchievement.achievement.month,
                  'achievement.dayStreak':
                     userAchievement.achievement.dayStreak,
                  'achievement.weekStreak':
                     userAchievement.achievement.weekStreak
               }
            }
         );
         console.log(updated);
         res.status(200).json('Updated achievement successfully!');
      } catch (err) {
         console.log(err);
         res.status(500).json(err);
      }
   };
}

module.exports = new accountController();
