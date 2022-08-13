const Card = require('../models/Card');
const StudySet = require('../models/StudySet')

class cardController {
    // [POST] 
    async addCard(req, res, next) {
        try {
            const card = new Card(req.body);
            const save = await card.save();
            if (req.body.studySet) {
                const studySet = await StudySet.findById(req.body.studySet);
                await studySet.updateOne({ $push: { cards: save._id}});
            }
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET]
    async getAllCards(req, res, next) {
        try {
            const allCards = await Card.find();
            res.status(200).json(allCards);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET] /:id
    async getACard(req, res, next) {
        try {
            const card = await Card.findById(req.params.id).populate('studySet');
            res.status(200).json(card);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new cardController();