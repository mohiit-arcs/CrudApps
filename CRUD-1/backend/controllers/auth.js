"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// signup route handler
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data from req body
        const { name, email, password } = req.body;
        // check if user exist
        const existingUser = yield User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            });
        }
        // secure password
        let hashedPassword;
        try {
            hashedPassword = yield bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password'
            });
        }
        // create user entry
        const user = yield User.create({
            name, email, password: hashedPassword
        });
        return res.status(200).json({
            success: true,
            message: 'Account Created Successfully'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error,
            message: "Account cannot be created, Try Again!"
        });
    }
});

exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take data from req body
        const { email, password } = req.body;
        // console.log(email)
        // console.log(password)
        // validation
        console.log("hello")
        if (!email || !password) {
            console.log("hello")
            return res.status(400).json({
                success: false,
                message: 'Please fill all details carefully!'
            });
        }
        let user = yield User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found, Please Sign Up First!"
            });
        }
        const payload = {
            email: user.email,
            id: user._id
        };
        // verify password
        const flag = yield bcrypt.compare(password, user.password);
        // console.log("Hello World")
        // console.log(flag)
        if (yield bcrypt.compare(password, user.password)) {
            // create jwt token
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });
            // user['token'] = token;
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User Logged In successfully'
            });
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            });
        }
    }
    catch (error) {
        console.log("hello")
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure"
        });
    }
});
