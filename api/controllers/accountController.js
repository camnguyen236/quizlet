const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account");

class accountController {
    // [PUT] /accounts/username
    updateAccount = async (req, res) => {
        //if update password then hash it
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedAccount = await Account.findOneAndUpdate(
                { username: req.params.username },
                {
                    $set: req.body
                    //options.new: true => return the modified doc rather than the original
                },
                { new: true, overwrite: false }
            );
            res.status(200).json({
                status: 'Success',
                data: updatedAccount
            });
        } catch (err) {
            res.status(500).json({
                status: 'Fail',
                message: err
            });
        }
    };

    // [DELETE] /accounts/username
    deleteAccount = async (req, res) => {
        try {
            await Account.findOneAndDelete({ username: req.params.username });
            res.status(200).json('Deleted account successfully!');
        } catch (err) {
            res.status(500).json(err);
        }
    };

  // [GET] /accounts/username
  getAccount = async (req, res) => {
    try {
        const account = await Account.findOne({
            username: req.params.username
        });
        const { password, achievement, studySet, refreshToken, ...others } =
            account._doc;
        res.status(200).json({
            status: 'Success',
            data: others
        });
    } catch (err) {
        res.status(500).json({
            status: 'Fail',
            message: err
        });
    }
};

  // [GET] /accounts/
  getAccountByAccToken = (req, res) => {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
      const token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) return res.sendStatus(403); // invalid token
          const user = await Account.findOne({
            username: decoded.username,
          }).exec();
          const { password, achievement, studySet, refreshToken, ...others } = user._doc;
          res.status(200).json(others);
        }
      );
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

    //[GET] /accounts/username/achievement
    getAchievements = async (req, res) => {
        try {
            const account = await Account.findOne({
                username: req.params.username
            });
            const { achievement, ...others } = account._doc;
            res.status(200).json({
                status: 'Success',
                data: achievement
            });
        } catch (err) {
            res.status(500).json({
                status: 'Fail',
                message: err
            });
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

    //[PUT] /accounts/username/achievement
    //fe must have state updateAchieve
    //once user click on learning call api then set updateAchive true
    //to make sure api is called only one time
    updateAchievement = async (req, res) => {
        try {
            const userAchievement = await Account.findOne({
                username: req.params.username
            }).select('achievement');
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

            const updatedAchievement = await Account.findOneAndUpdate(
                { username: req.params.username },
                {
                    $set: {
                        'achievement.achieve':
                            userAchievement.achievement.achieve,
                        'achievement.month': userAchievement.achievement.month,
                        'achievement.dayStreak':
                            userAchievement.achievement.dayStreak,
                        'achievement.weekStreak':
                            userAchievement.achievement.weekStreak
                    }
                },
                { new: true, overwrite: false }
            );
            res.status(200).json({
                status: 'Success',
                data: updatedAchievement.achievement
            });
        } catch (err) {
            res.status(500).json({
                status: 'Fail',
                message: err
            });
        }
    };
}

module.exports = new accountController();
