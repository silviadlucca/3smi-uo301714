// Book cover configuration

const repo = '/covers/';

module.exports = {
    UPLOADS: '/uploads/',           // Location of uploaded covers
    PUBLIC: repo,                   // Public location of covers
	DEFAULT: repo + 'default.png',  // Default cover
    NAME_PREFIX: 'cover-',          // Prefix of the public cover file name
    EXTENSION: '.png'               // Transcoding format
};