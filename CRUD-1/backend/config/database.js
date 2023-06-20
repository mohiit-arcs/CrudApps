"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("DB connected successfully"))
        .catch((error) => {
        console.log("DB not connected");
        console.log(error.message);
        process.exit(1);
    });
};
module.exports = dbConnect;
