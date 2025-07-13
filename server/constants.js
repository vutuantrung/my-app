const path = require("path");
const SERVER_FOLDER_PATH = process.cwd();

const IDOL_AVATAR_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "idol-avatars");
const MOVIE_THUMBS_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "movie-thumbs");
const CACHED_FOLDER = path.join(SERVER_FOLDER_PATH, "cached");

module.exports = {
    IDOL_AVATAR_FOLDER,
    MOVIE_THUMBS_FOLDER,
    CACHED_FOLDER
}