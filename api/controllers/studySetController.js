const StudySet = require('../models/StudySet');
const Card = require('../models/Card');
const Account = require('../models/Account');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class studySetController {
    // [POST]
    addStudySet = catchAsync(async (req, res, next) => {
        const studySet = new StudySet(req.body);
        const save = await studySet.save();
        if (req.body.account) {
            const account = await Account.findById(req.body.account);
            await account.updateOne({ $push: { studySets: save._id}});
        }
        res.status(200).json({
            status: 'success',
            data: save
        });
    });

    // [GET]
    getAllStudySets = catchAsync(async (req, res, next) => {
        const allStudySets = await StudySet.find();
        res.status(200).json({
            status: 'success',
            data: allStudySets
        });
    });

    // [GET] /:id
    getAStudySet = catchAsync(async (req, res, next) => {
        const studySet = await StudySet.findById(req.params.id).populate(
            'cards'
        );
        res.status(200).json({
            status: 'success',
            data: studySet
        });
    });

    // [PUT] /:id
    UpdateStudySet = catchAsync(async (req, res, next) => {
        const studySet = await StudySet.updateOne(
            { _id: req.params.id },
            req.body
        );
        res.status(200).json({
            status: 'success',
            data: studySet
        });
    });

    // [DELETE] /:id
    DeleteStudySet = catchAsync(async (req, res, next) => {
        await Account.updateMany({studySets: req.params.id}, {$pull: {studySets: req.params.id}});
        await Card.deleteMany({ studySet: req.params.id });
        await StudySet.deleteOne({ _id: req.params.id });
        // res.redirect('back');
        res.status(200).json({
            status: 'success',
            data: null
        });
    });
}

module.exports = new studySetController();