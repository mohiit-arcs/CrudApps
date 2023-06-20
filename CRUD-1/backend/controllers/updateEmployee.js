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
Object.defineProperty(exports, "__esModule", { value: true });
const Employee = require('../models/employee');
const mongoose = require('mongoose');
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, gender, email, mobile, password, employment_type, pincode, state, address } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: `Invalid employee id: ${id}`,
                message: "Please provide a valid employee id"
            });
        }
        // Check that at least one field is being updated
        if (!name && !gender && !email && !mobile && !password && !employment_type && !pincode && !state && !address) {
            return res.status(400).json({
                success: false,
                error: "No fields to update",
                message: "Please provide at least one field to update"
            });
        }
        const employee = yield Employee.findByIdAndUpdate({ _id: id }, { name, gender, email, mobile, password, employment_type, pincode, state, address, updatedAt: Date.now() });
        res.status(200).json({
            success: true,
            data: employee,
            message: "Updated successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
            success: false,
            error: error.message,
            message: "Server Error"
        });
    }
});
module.exports = updateEmployee;
