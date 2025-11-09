const express = require("express");
const router = express.Router();

const { searchMovie, searchMultiple, searchMoviesByMyFavorite, searchMoviesByContentId } = require("../controllers/movie.controller");

// SEARCH
router.get("/contentId", searchMoviesByContentId);
router.get("/top", searchMoviesByMyFavorite);
router.get("/searchMulti", searchMultiple);
router.post("/search", searchMovie);

module.exports = router;
