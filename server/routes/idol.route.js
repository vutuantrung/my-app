const fs = require("fs");
const path = require("path");
const express = require('express');
const db = require('../database/db');
const router = express.Router();

const idolDbServices = require("../services/idol.service.database");
const idolCrawlingServices = require("../services/idol.service.crawl");

// CREATE
router.post('/', (req, res) => {
    throw new Error("No implementation exception");
});

// READ ALL + optional ?name= filter
router.get('/', (req, res) => {
    throw new Error("No implementation exception");
});

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
router.post('/search', async (req, res) => {
    const { name } = req.body;
    console.log(name)
    // Todo:
    // 1. search in db
    const idolsFound = await idolDbServices.searchIdolsByName(name);
    console.log('[idolsFound]', idolsFound);
    // 2. if has => return
    if (idolsFound.err) {
        throw new Error(err.message);
    }
    if (idolsFound.data.length > 0) {
        return idolsFound.data;
    }
    // 3. crawl from internet
    // const cachedPath = `../cached/${name}.json`
    const cachedPath = path.join(process.cwd(), "cached", name + ".json")
    console.log(cachedPath)
    const exist = fs.existsSync(cachedPath);
    console.log(exist)

    let idolData = null;
    if (exist) {
        const d = fs.readFileSync(cachedPath, "utf-8");
        idolData = JSON.parse(d);
    } else {
        // idolData = await idolCrawlingServices.crawlIdolByName(name);
    }
    console.log(idolData);
    // 4. save in db
});

module.exports = router;
