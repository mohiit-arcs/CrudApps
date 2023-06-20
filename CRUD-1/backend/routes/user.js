"use strict";
const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');

router.post('/login', login);
router.post('/signup', signup);
// protected route
router.get('/', auth, (req, res) => {
    res.json({
        success: true,
        message: 'Path authorized for main page'
    });
});
module.exports = router;
