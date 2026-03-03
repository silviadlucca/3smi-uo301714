// Book validator

// Import modules
const {body, validationResult, param} = require('express-validator');
const { expressjwt: jwt }  = require('express-jwt');
const auth = require('../../config/auth.config');
const path = require('path');

// Book data validation
module.exports.create = [
  jwt({ secret: auth.secret, algorithms: [ auth.algorithm ] }),
  body('title')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Book title can not be empty!')
    .bail(),
  body('author')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Invalid author!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

// Data validation for book cover upload 
module.exports.upload = [
  jwt({ secret: auth.secret, algorithms: [ auth.algorithm ] }),
  param('id', 'missing book id')
    .exists()
    .isNumeric()
    .bail(),
  body('coverFile', 'Please upload cover image file!')
    .custom((value, { req }) => {
      const extension = (path.extname(req.files.coverFile.name)).toLowerCase();
      switch (extension) {
        case '.jpg':
          return '.jpg';
        case '.jpeg':
          return '.jpeg';
        case  '.png':
          return '.png';
        default:
          return false;
      }
    })
    .bail(),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
  },
];