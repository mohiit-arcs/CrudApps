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
exports.getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield Employee.find({});
        // when there is no entry found in db
        if (employees.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No employees found"
            });
        }
        // response
        res.status(200).json({
            success: true,
            data: employees,
            message: "Employee entries are fetched"
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
exports.getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Invalid Id');
            return res.status(400).json({
                success: false,
                error: `Invalid employee id: ${id}`,
                message: "Please provide a valid employee id"
            });
        }
        const employee = yield Employee.findById({ _id: id });
        if (!employee) {
            console.log('Invalid Employee');
            return res.status(404).json({
                success: false,
                message: "No employee data found"
            });
        }
        return res.status(200).json({
            success: true,
            data: employee,
            message: `Employee data for ${id} fetched successfully`
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
