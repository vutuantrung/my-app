const path = require("path");
const SERVER_FOLDER_PATH = process.cwd();

const EXTERNAL_DB_PATH = "G:";
const IDOL_AVATAR_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "idol-avatars");
const MODEL_AVATAR_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "model-avatars");
const MOVIE_THUMBS_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "movie-thumbs");
const ALBUM_THUMBS_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "album-thumbs");
const CACHED_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "cached");
const BAT_FOLDER = "C:/Users/trung/Documents/CSProjects/Personal-Project/NodeJS/my-app/server/savefiles/chromeProfiles";

module.exports = {
    BAT_FOLDER,
    SERVER_FOLDER_PATH,
    IDOL_AVATAR_FOLDER,
    MODEL_AVATAR_FOLDER,
    MOVIE_THUMBS_FOLDER,
    ALBUM_THUMBS_FOLDER,
    CACHED_FOLDER
}