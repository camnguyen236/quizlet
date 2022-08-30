const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class accountController {
    // [PUT] /accounts/username
    updateAccount = catchAsync(async (req, res, next) => {
        //if update password then hash it
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedAccount = await Account.findOneAndUpdate(
            { username: req.params.username },
            {
                $set: req.body
                //options.new: true => return the modified doc rather than the original
            },
            { new: true, overwrite: false }
        );
        if (!updatedAccount) {
            return next(
                new AppError(
                    `No account found with this username: ${req.params.username}`,
                    404
                )
            );
        }
        res.status(200).json({
            status: 'Success',
            data: updatedAccount
        });
    });

    // [DELETE] /accounts/username
    deleteAccount = catchAsync(async (req, res, next) => {
        const account = await Account.findOneAndDelete({
            username: req.params.username
        });
        if (!account) {
            return next(
                new AppError(
                    `No account found with this username: ${req.params.username}`,
                    404
                )
            );
        }
        res.status(200).json({
            status: 'Success',
            data: null
        });
    });

    // [GET] /accounts/username
    getAccount = catchAsync(async (req, res, next) => {
        const account = await Account.findOne({
            username: req.params.username
        });
        if (!account) {
            return next(
                new AppError(
                    `No achievement found with this username: ${req.params.username}`,
                    404
                )
            );
        }
        const { password, achievement, studySet, refreshToken, ...others } =
            account._doc;
        res.status(200).json({
            status: 'Success',
            data: others
        });
    });
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
    getAccountByAccToken = catchAsync((req, res, next) => {
        const authHeader =
            req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); // invalid token
                const user = await Account.findOne({
                    username: decoded.username
                }).exec();
                const {
                    password,
                    achievement,
                    studySet,
                    refreshToken,
                    ...others
                } = user._doc;
                res.status(200).json(others);
            }
        );
    });

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
    getAchievements = catchAsync(async (req, res, next) => {
        const account = await Account.findOne({
            username: req.params.username
        });
        const { achievement, ...others } = account._doc;
        res.status(200).json({
            status: 'Success',
            data: achievement
        });
    });

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
    updateAchievement = catchAsync(async (req, res, next) => {
        const userAchievement = await Account.findOne({
            username: req.params.username
        }).select('achievement');

        if (!userAchievement) {
            return next(new AppError('No achievement found with that ID', 404));
        }
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
                    'achievement.achieve': userAchievement.achievement.achieve,
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
    });
}

module.exports = new accountController();
