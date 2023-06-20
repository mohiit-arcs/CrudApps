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
const Employee = require('../models/employee');
exports.createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, gender, email, mobile, password, employment_type, pincode, state, address } = req.body;
        const data = yield Employee.create({
            name, gender, email, mobile, password, employment_type, pincode, state, address
        });
        // checking if all required fields are provided
        if (!name || !gender || !email || !mobile || !password || !employment_type || !pincode || !state || !address) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Please provide all required fields'
            });
        }
        res.status(200).json({
            success: true,
            data: data,
            message: "Data inserted succcessfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: "Data not inserted",
            message: error.message
        });
    }
});
