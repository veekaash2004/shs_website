const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    testId: {
        type: String,
        required: true,
    },
    answers: {
        type: Map,
        of: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    notes: {
        type: Map,
        of: String,
        default: {},
    },
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;