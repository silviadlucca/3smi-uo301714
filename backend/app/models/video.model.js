// Book model

// Import modules
const coverConfig = require('../config/cover.config');

// Book object properties
module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define("videos", {  // Table name and fields
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        {
        thumbnail:{
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: videoConfig.DEFAULT_THUMBNAIL
        },
        path: {
            type: Sequelize.STRING,
            allowNull: true
        },
        dash: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Video;
};