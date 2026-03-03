// Book routes

// Import modules
const express = require('express');
const router = express.Router();
const controller = require("../controllers/book.controller.js");
const validator = require('../middlewares/validators/book.validator');
const fileUpload = require('express-fileupload');

// Parse requests of content-type: multipart/form-data
router.use(fileUpload({ createParentPath: true }))

// Get all books
router.get('/', controller.getAll);
// Create a new book
router.post('/', validator.create, controller.create);
// Get a single book
router.get('/:id', controller.get);
// Upload a book cover
router.post('/:id/upload', validator.upload, controller.upload)

module.exports = router;
