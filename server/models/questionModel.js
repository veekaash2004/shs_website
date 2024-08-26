const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    testId: {
        type: String,
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctOption: {
        type: Number,
        required: true,
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;