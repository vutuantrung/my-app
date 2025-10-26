const express = require('express');
const router = express.Router();
const { searchIdol, getPagination } = require("../controllers/idol.controller");

// READ ALL + optional ?name= filter
router.get('/', getPagination);

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
router.post('/search', searchIdol);

router.post('/test', async (req, res) => {
    res.send("wanna test something ?");
})

module.exports = router;
