const path = require("path");
const SERVER_FOLDER_PATH = process.cwd();

const EXTERNAL_DB_PATH = "H:";
const IDOL_AVATAR_FOLDER = path.join(EXTERNAL_DB_PATH, "my-app-db", "database", "idol-avatars");
const MOVIE_THUMBS_FOLDER = path.join(EXTERNAL_DB_PATH, "my-app-db", "database", "movie-thumbs");
const CACHED_FOLDER = path.join(EXTERNAL_DB_PATH, "my-app-db", "database", "cached");

module.exports = {
    IDOL_AVATAR_FOLDER,
    MOVIE_THUMBS_FOLDER,
    CACHED_FOLDER
}