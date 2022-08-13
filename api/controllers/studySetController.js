const StudySet = require('../models/StudySet');
const Account = require('../models/Account')

class studySetController {
    // [POST] 
    async addStudySet(req, res, next) {
        try {
            const studySet = new StudySet(req.body);
            const save = await studySet.save();
            // if (req.body.author) {
            //     const author = await Account.findById(req.body.author);
            //     await author.updateOne({ $push: { studySets: save._id}});
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
}

module.exports = new studySetController();