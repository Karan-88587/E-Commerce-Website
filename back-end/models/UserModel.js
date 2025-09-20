const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    profilePic: {
        type: String
    },
    role: {
        type: String,
        default: "user",
    },
});

module.exports = mongoose.model("User", userSchema);