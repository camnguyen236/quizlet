const mongoose = require('mongoose');

const StudySetSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    author: {
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

module.exports = mongoose.model("StudySet", StudySetSchema);