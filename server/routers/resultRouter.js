const express = require('express');
const router = express.Router();
const Result = require('../models/resultModel');

router.post('/', async (req, res) => {
    const result = new Result({
        userId: req.body.userId,
        score: req.body.score,
        answers: req.body.answers,
    });

    try {
        const newResult = await result.save();
        res.status(201).json(newResult);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const results = await Result.find({ userId: req.params.userId });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;