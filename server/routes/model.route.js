const express = require('express');
const router = express.Router();
const { searchModel, getPagination } = require("../controllers/model.controller");

// READ ALL + optional ?name= filter
// router.get('/', getPagination);

// READ ONE
router.get('/:id', (req, res) => {
	throw new Error("No implementation exception");
});

// UPDATE
router.put('/:id', (req, res) => {
	throw new Error("No implementation exception");
});

// DELETE
router.delete('/:id', (req, res) => {
	throw new Error("No implementation exception");
});

// SEARCH
router.get('/', getPagination);
router.post('/search', searchModel);

router.post('/test', async (req, res) => {
	res.send("wanna test something ?");
})

module.exports = router;
