const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const AuthMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({ result: false, message: "Token not found. Unauthorized" });
        }

        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Virified User :", verifiedUser);
        
        const user = await UserModel.findById(verifiedUser.id).select("-password");
        // console.log("User :", user);
        
        if (!user) {
            return res.status(401).json({ result: false, message: "User not found. Unauthorized" });
        }

        if (user) {
            req.user = user;
        } else {
            return res.status(401).json({ result: false, message: "Unauthorized" });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ result: false, message: "Unauthorized" });
    }
};

module.exports = AuthMiddleware;