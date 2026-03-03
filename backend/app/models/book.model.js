// Book model

// Import modules
const coverConfig = require('../config/cover.config');

// Book object properties
module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {  // Table name and fields
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cover: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: coverConfig.DEFAULT
        }
    });

    return Book;
};