// Authorization validator

// Import modules
const {body, validationResult} = require('express-validator');

// Signup data validation
exports.validateUser = [
  body('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Username can not be empty!')
    .bail()
    .isLength({min: 4})
    .withMessage('Minimum 4 characters required!')
    .bail(),
  body('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Invalid password!')
    .bail()
    .isLength({min: 4})
    .withMessage('Minimum 4 characters required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

// Login data validation
exports.validateLogin = [
  body('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Username cannot be empty!')
    .bail(),
  body('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];