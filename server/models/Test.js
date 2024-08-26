// models/Test.js

const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;