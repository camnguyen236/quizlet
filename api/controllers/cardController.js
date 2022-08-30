const Card = require('../models/Card');
const StudySet = require('../models/StudySet');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class cardController {
    // [POST]
    addCard = catchAsync(async (req, res, next) => {
        const card = new Card(req.body);
        const save = await card.save();
        if (req.body.studySet) {
            const studySet = await StudySet.findById(req.body.studySet);
            await studySet.updateOne({ $push: { cards: save._id } });
        }
        res.status(200).json({
            status: 'success',
            data: save
        });
    });

    // [GET]
    getAllCards = catchAsync(async (req, res, next) => {
        const allCards = await Card.find();
        console.log(req.session);
        res.status(200).json({
            status: 'success',
            data: allCards
        });
    });

    // [GET] /:id
    getACard = catchAsync(async (req, res, next) => {
        const card = await Card.findById(req.params.id).populate('studySet');
        res.status(200).json({
            status: 'success',
            data: card
        });
    });

    // [PUT] /:id
    UpdateCard = catchAsync(async (req, res, next) => {
        const card = await Card.updateOne({ _id: req.params.id }, req.body);
        if (!card) {
            return next(
                new AppError(
                    `No Card found with that ID: ${req.params.id}!`,
                    404
                )
            );
        }
        res.status(200).json({
            status: 'success',
            data: card
        });
    });

    // [DELETE] /:id
    DeleteCard = catchAsync(async (req, res, next) => {
        await StudySet.updateMany(
            { cards: req.params.id },
            { $pull: { cards: req.params.id } }
        );
        const card = await Card.deleteOne({ _id: req.params.id });
        // res.redirect('back');
        if (!card) {
            return next(
                new AppError(
                    `No Card found with that ID: ${req.params.id}!`,
                    404
                )
            );
        }
        res.status(200).json({
            status: 'success',
            data: null
        });
    });
}

module.exports = new cardController();
