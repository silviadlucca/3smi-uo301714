// Authorization controller

// Import modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/db').User;
const config = require('../config/auth.config');

// User registration
module.exports.signup = async (req, res, next) => {
    try {
        // Create a user    
        const user = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, config.salt) // Store hashed version of the pass
        });
        res.status(201).send({ message: "User was registered successfully!" });
    }
    catch (error) {
        return next(error);
    }
};

// User authentication
module.exports.login = async (req, res, next) => {
    try {
        // No validation needed
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                token: null,
                message: "Invalid user or password!"  // Don't tell atacker that the password is wrong
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
            algorithm: config.algorithm
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            token: token
        });
    }
    catch (error) {
        return next(error);
    }
};