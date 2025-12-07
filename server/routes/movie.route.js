const express = require('express');
const router = express.Router();

const { searchMovie, searchMultiple, searchMoviesByMyFavorite, searchMovieByContentId, getPagination, searchMovieByCodeContentId } = require('../controllers/movie.controller');

// SEARCH
router.get('/', getPagination);
router.get('/search', searchMovieByCodeContentId);
router.get('/contentId', searchMovieByContentId);
router.get('/top', searchMoviesByMyFavorite);
router.get('/searchMulti', searchMultiple);
router.post('/search', searchMovie);

module.exports = router;
