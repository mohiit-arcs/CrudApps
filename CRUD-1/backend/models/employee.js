"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    gender: {
        type: String,
        required: true,
        maxLength: 10
    },
    email: {
        type: String,
        required: true,
        maxLength: 50
    },
    mobile: {
        type: String,
        required: true,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        maxLength: 30,
    },
    employment_type: {
        type: String,
        required: true,
        maxLength: 15
    },
    address: {
        type: String,
        required: true,
        maxLength: 150
    },
    state: {
        type: String,
        maxLength: 50
    },
    pincode: {
        type: String,
        maxLength: 20
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});
module.exports = mongoose.model('Employee', employeeSchema);
