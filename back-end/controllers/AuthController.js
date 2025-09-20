const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ result: false, message: "All the fields are required" });
        }

        if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "") {
            return res.status(400).json({ result: false, message: "Required fields cannot be empty" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ firstName, lastName, email, password: hashedPassword });

        await newUser.save();

        // const createdUser = await UserModel.findById(newUser._id).select("-password");

        // const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "development" ? false : true,
        //     sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
        //     maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days = days * hours * minutes * seconds * milliseconds (converted to milliseconds)
        // });

        return res.status(200).json({
            result: true,
            message: "User registered successfully"
        });

    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Error creating user",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ result: false, message: "All fields are required" });
        }

        if (email.trim() === "" || password.trim() === "") {
            return res.status(400).json({ result: false, message: "Fields cannot be empty" });
        }

        const user = await UserModel.findOne({ email });
        // console.log("User is :", user);

        if (!user) {
            return res.status(404).json({ result: false, message: "User not found. Please register" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ result: false, message: "Invalid email or password" });
        }

        // Remove password before sending response
        const userData = user.toObject();   // Convert to plain JS object and remove password
        delete userData.password;

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days = days * hours * minutes * seconds * milliseconds (converted to milliseconds)
        });

        return res.status(200).json({
            result: true,
            message: "User logged in successfully",
            data: userData
        });

    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Error logging in user",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
        });

        return res.status(200).json({
            result: true,
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Error logging out user",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
    }
};

exports.checkAuth = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId).select("-password");
        return res.status(200).json({
            result: true,
            message: "User authenticated successfully",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Error checking authentication",
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
    }
};