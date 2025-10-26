const express = require("express");
const router = express.Router();

const { searchMovie, searchMultiple } = require("../controllers/movie.controller");

// SEARCH
router.get("/searchMulti", searchMultiple);
router.post("/search", searchMovie);

module.exports = router;
