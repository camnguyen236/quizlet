const Card = require('../models/Card');
const StudySet = require('../models/StudySet');

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

    // [PUT] /:id
    async UpdateCard(req, res, next) {
        try {
            await Card.updateOne({ _id: req.params.id }, req.body);
            res.status(200).json('Updated successfully');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [DELETE] /:id
    async DeleteCard(req, res, next) {
        try {
            await StudySet.updateMany({cards: req.params.id}, {$pull: {cards: req.params.id}});
            await Card.deleteOne({ _id: req.params.id });
            // res.redirect('back');
            res.status(200).json('Deleted successfully');
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new cardController();