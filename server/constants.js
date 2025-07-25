const path = require("path");
const SERVER_FOLDER_PATH = process.cwd();

const EXTERNAL_DB_PATH = "G:";
const IDOL_AVATAR_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "idol-avatars");
const MOVIE_THUMBS_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "movie-thumbs");
const CACHED_FOLDER = path.join(SERVER_FOLDER_PATH, "database", "cached");

module.exports = {
	SERVER_FOLDER_PATH,
	IDOL_AVATAR_FOLDER,
	MOVIE_THUMBS_FOLDER,
	CACHED_FOLDER
}