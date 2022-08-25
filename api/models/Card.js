const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    studySet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudySet'
    }
});

module.exports = mongoose.model('Card', CardSchema);
