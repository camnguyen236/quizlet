const StudySet = require('../models/StudySet');

class studySetController {
    // [POST] 
    async addStudySet(req, res, next) {
        try {
            const studySet = new StudySet(req.body);
            const save = await studySet.save();
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET]
    async getAllStudySets(req, res, next) {
        
    }
}

module.exports = new studySetController();