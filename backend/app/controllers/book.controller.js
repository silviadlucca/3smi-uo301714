// Book controller

// Import modules
const Book = require('../models/db').Book;
const path = require('path');
const encoding = require('../media/encoding');
const coverConfig = require('../config/cover.config');


// Retrieve all books
module.exports.getAll = async (req, res, next) => {
    // We should query the database
    const books = await Book.findAll();
    res.status(200).json(books);
};

// Create a new book
module.exports.create = async (req, res, next) => {
    // No validation needed
    const book = await Book.create( { title: req.body.title, author: req.body.author } );
    res.status(201).json(book);
};

// Get an existing book
module.exports.get = async (req, res, next) => {
    // No validation needed
    const book = await Book.findByPk( req.params.id );
    if (book) {
        res.status(200).json(book);
    }
    else {
        res.status(404).end();
    }    
};

// Upload the cover image to an existing book
module.exports.upload = async (req, res, next) => {
    try {
        const book = await Book.findByPk( req.params.id );
        if (!book) {
            res.status(404).end();
            return;
        }

        // Move cover file to temporary location and encode it to final location
        const coverFile = req.files.coverFile;
        const extension = path.extname(coverFile.name);
        const coverFileName = coverConfig.NAME_PREFIX + book.id;;
        const uploadedFileName = coverConfig.UPLOADS + coverFileName + extension;
        coverFile.mv(uploadedFileName);

        const outputFile = coverConfig.PUBLIC + coverFileName + '.png';
        const destination = await encoding.normalize(uploadedFileName, outputFile);

        // Update book
        await book.update({ cover: destination });
        res.status(200).json(book);
    }
    catch (error) {
        return next(error);
    }
};
