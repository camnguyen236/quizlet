const mongoose = require('mongoose');

const StudySetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card'
        }
    ]
});

module.exports = mongoose.model('StudySet', StudySetSchema);
