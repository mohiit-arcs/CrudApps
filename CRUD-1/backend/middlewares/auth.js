"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// auth, isStudent, isAdmin
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.auth = (req, res, next) => {
    try {
        // extract JWT token from req body or header or cookie
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }
        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode; // payload
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication Denied"
        });
    }
};
