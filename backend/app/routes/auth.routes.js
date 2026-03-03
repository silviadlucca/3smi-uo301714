// Authorization routes

// Import modules
const express = require('express');
const router = express.Router();
const controller = require("../controllers/auth.controller");
const validator = require('../middlewares/validators/auth.validator');

// User registration
router.post('/signup', validator.validateUser, controller.signup);
// User authentication
router.post('/login', validator.validateLogin, controller.login);

module.exports = router;
