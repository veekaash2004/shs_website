const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    classLevel: { type: String, required: true },
    stream: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    profileImagePath: { type: String }  // New field for storing profile image path
});

const User = mongoose.model("User", userSchema);

module.exports = User;