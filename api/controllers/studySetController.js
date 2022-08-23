const StudySet = require('../models/StudySet');
const Card = require('../models/Card');
const Account = require('../models/Account');

class studySetController {
    // [POST] 
    async addStudySet(req, res, next) {
        try {
            const studySet = new StudySet(req.body);
            const save = await studySet.save();
            // if (req.body.account) {
            //     const account = await Account.findById(req.body.account);
            //     await account.updateOne({ $push: { studySets: save._id}});
            // }
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET]
    async getAllStudySets(req, res, next) {
        try {
            const allStudySets = await StudySet.find();
            res.status(200).json(allStudySets);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET] /:id
    async getAStudySet(req, res, next) {
        try {
            const studySet = await StudySet.findById(req.params.id).populate('cards');
            res.status(200).json(studySet);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /:id
    async UpdateStudySet(req, res, next) {
        try {
            await StudySet.updateOne({ _id: req.params.id }, req.body);
            res.status(200).json('Updated successfully');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [DELETE] /:id
    async DeleteStudySet(req, res, next) {
        try {
            // await Account.updateMany({studySets: req.params.id}, {$pull: {studySets: req.params.id}});
            await Card.deleteMany({ studySet: req.params.id });
            await StudySet.deleteOne({ _id: req.params.id });
            // res.redirect('back');
            res.status(200).json('Deleted successfully');
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new studySetController();