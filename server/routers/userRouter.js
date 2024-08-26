const router = require("express").Router();
const User = require("../models/userModel");
const Question = require('../models/questionModel');
const Result = require('../models/resultModel.js');
const Test = require('../models/Test');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



router.post("/register", async (req, res) => {
    try {
        const { name, classLevel, stream, phone, email, password, passwordVerify } = req.body;

        // Check if all required fields are provided
        if (!name || !classLevel || !stream || !phone || !email || !password || !passwordVerify) {
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ errorMessage: "Please enter a password of at least 6 characters." });
        }

        // Check if password and passwordVerify match
        if (password !== passwordVerify) {
            return res.status(400).json({ errorMessage: "Passwords do not match." });
        }

        // Check if email is already in use
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ errorMessage: "An account with this email already exists." });
        }

        // Check if phone number is already in use
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ errorMessage: "An account with this phone number already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save the new user account to the database
        const newUser = new User({
            name,
            classLevel,
            stream,
            phone,
            email,
            passwordHash
        });

        const savedUser = await newUser.save();

        // Create and send JWT token
        const token = jwt.sign(
            {
                user: savedUser._id,
            },
            process.env.JWT_SECRET_KEY
        );

        // Send the token in HTTP only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
// Login

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate
        if (!email || !password) {
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ errorMessage: "Wrong email or password." });
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            return res.status(401).json({ errorMessage: "Wrong email or password" });
        }

        // Log the user in
        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET_KEY
        );

        // Send the token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
// To logout

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
});

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.send(true);
    } catch (err) {
        res.json(false);
    }
});

router.get("/user", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(verified.user);

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, classLevel, stream, phone, email } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ errorMessage: "User not found" });
        }

        user.name = name;
        user.classLevel = classLevel;
        user.stream = stream;
        user.phone = phone;
        user.email = email;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.post("/questions/:testId", async (req, res) => {
    try {
        const { testId } = req.params;
        const { questionText, options, correctOption } = req.body;

        if (!testId || !questionText || !options || options.length < 2 || correctOption === undefined) {
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
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
        console.error(err);
        res.status(500).send();
    }
});

// Bulk add questions
router.post('/bulk', async (req, res) => {
    try {
        const questions = req.body.questions;
        if (!questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const result = await Question.insertMany(questions);
        res.status(201).json(result);
    } catch (error) {
        console.error('Failed to add questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get("/questions/:testId", async (req, res) => {
    try {
        const questions = await Question.find({ testId: req.params.testId });
        res.json(questions);
    } catch (err) {
        console.error("Failed to fetch questions:", err);
        res.status(500).json({ error: "Failed to fetch questions" });
    }
});
router.post("/results/:userId/:testId", async (req, res) => {
    try {
        const { userId, testId } = req.params;
        const { answers, score, notes } = req.body;

        // Check if all required fields are provided
        if (!answers || score === undefined || !notes) {
            return res.status(400).json({ errorMessage: "Please provide answers, score, and notes." });
        }

        // Create a new result document or update the existing one
        const result = await Result.findOneAndUpdate(
            { userId, testId },
            { userId, testId, answers, score, notes },
            { new: true, upsert: true }
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to get a result
router.get("/results/:userId/:testId", async (req, res) => {
    try {
        const { userId, testId } = req.params;

        const result = await Result.findOne({ userId, testId });
        if (!result) {
            return res.status(404).json({ errorMessage: "Result not found." });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// New endpoint to update notes only
router.put("/results/:userId/:testId/notes", async (req, res) => {
    try {
        const { userId, testId } = req.params;
        const { notes } = req.body;

        // Check if notes field is provided
        if (!notes) {
            return res.status(400).json({ errorMessage: "Please provide notes." });
        }

        // Update notes in the existing result document
        const result = await Result.findOneAndUpdate(
            { userId, testId },
            { notes },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ errorMessage: "Result not found." });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/addtest', async (req, res) => {
    const { id } = req.body;
    if (testIds.includes(id)) {
        return res.status(400).json({ message: 'Test ID already exists' });
    }
    testIds.push(id);
    res.status(201).json({ message: 'Test ID added', id });
});

router.post('/tests', async (req, res) => {
    const { id } = req.body;
    try {
        const newTest = new Test({ id });
        await newTest.save();
        res.status(201).send('Test ID added successfully');
    } catch (err) {
        console.error('Failed to add test ID:', err);
        res.status(500).send('Failed to add test ID');
    }
});

// Route to get all test IDs
router.get('/tests', async (req, res) => {
    try {
        const tests = await Test.find({});
        res.status(200).json(tests);
    } catch (err) {
        console.error('Failed to fetch test IDs:', err);
        res.status(500).send('Failed to fetch test IDs');
    }
});

module.exports = router;