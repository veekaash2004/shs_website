const express = require('express');
const router = express.Router();
const Question = require('../models/questionModel');

router.post('/question', async (req, res) => {
    try {
        const { testId, questionText, options, correctOption } = req.body;

        if (!testId || !questionText || !options || !correctOption) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        const newQuestion = new Question({
            testId,
            questionText,
            options,
            correctOption
        });

        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;