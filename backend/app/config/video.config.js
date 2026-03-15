// Video configuration

const videoRepo = '/videos/';
const thumbRepo = '/thumbnails/';

module.exports = {
    UPLOADS: '/uploads/',
    PUBLIC: videoRepo,
    THUMBNAILS: thumbRepo,
    DEFAULT_THUMBNAIL: thumbRepo + 'default.png',
    NAME_PREFIX: 'video-',
    THUMB_PREFIX: 'thumb-',
    EXTENSION: '.mp4'
};