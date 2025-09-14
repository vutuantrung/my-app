const fs = require("fs");
const path = require("path");
const express = require('express');
const router = express.Router();

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const idolMovieDbServices = require("../services/idolMovie.services.database");
const idolCrawlingServices = require("../services/idol.service.crawl");
const { parseIdolName, renderIdolHTMLTemplate, render404Page, shuffleArray } = require("../helpers");
const { crawlIdolFromJJGirl } = require("../features/jjgirls/jjgirls.utils");

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
    try {
        const TESTING = true;// This will return immediately after detect idol data is saved
        const { name, updateRecord, displayType } = req.body;
        let [name_jdb, name_jher, name_jjg] = name.split(",");

        const mainName = parseIdolName(name_jdb).replace("_", "");// REMOVE UNDER_SCORE
        console.log("\n👩  ", mainName);

        // 1. search in db
        const idolsFound = await idolDbServices.searchIdolsByName(mainName);
        // console.log('[idolsFound]', idolsFound);

        // 2. if has => return
        if (idolsFound.err) {
            throw new Error(err.message);
        }
        // console.log('[idolsFound]', idolsFound);
        if (idolsFound.data.length > 0 && !updateRecord) {
            const searchMoviesReq = await idolMovieDbServices.searchMovieByIdolName(mainName);
            const moviesCode = searchMoviesReq.map(e => e.movie_code);
            const shuffledMoviesCode = shuffleArray(moviesCode).slice(0, 8).filter(Boolean);
            const moviesDataReq = await movieDbServices.searchMoviesByCodes(shuffledMoviesCode);
            // console.log(moviesDataReq);
            let resultSendback = displayType === "json"
                ? JSON.stringify(idolsFound.data[0])
                : renderIdolHTMLTemplate(idolsFound.data[0], moviesDataReq.data);

            res.status(200).send(resultSendback);
            return;
        }

        // 3. crawl from internet
        // const cachedPath = `../cached/${name}.json`
        const cachedPath = path.join(process.cwd(), "cached", mainName + ".json")
        const exist = fs.existsSync(cachedPath);

        let idolData = null;
        if (exist && !updateRecord) {
            const d = fs.readFileSync(cachedPath, "utf-8");
            idolData = JSON.parse(d);
        } else {
            const tmp_name_jher = name_jher
                ? (name_jher[0] === "_" ? name_jher : parseIdolName(name_jher))
                : (name_jdb[0] === "_" ? name_jdb : parseIdolName(name_jdb));
            const tmp_name_jjg = name_jjg
                ? name_jjg[0] === "_" ? name_jjg : parseIdolName(name_jjg)
                : (name_jdb[0] === "_" ? name_jdb : parseIdolName(name_jdb));

            if (idolsFound.data.length > 0) {
                const savedRecord = idolsFound.data[0];
                const metadata = JSON.parse(savedRecord.metadata);
                name_jdb = "_" + savedRecord.name;
                name_jher = metadata.javherQueryName ? "_" + metadata.javherQueryName : tmp_name_jher;
                name_jjg = metadata.jjGirlQueryName ? "_" + metadata.jjGirlQueryName : tmp_name_jjg;
            } else {
                name_jdb = name_jdb[0] === "_" ? name_jdb : parseIdolName(name_jdb);
                name_jher = tmp_name_jher;
                name_jjg = tmp_name_jjg;
            }

            idolData = await idolCrawlingServices.crawlIdolByName({ name_jdb, name_jher, name_jjg });
        }

        // console.log(idolData);
        // 4. treat data
        // 4.1 idol
        const idol = JSON.parse(JSON.stringify(idolData));
        delete idol.movies;

        // 4.3 idol - movie
        const idolMovies = idolData?.movies
            ? idolData.movies.map(movie => ({
                movie_code: movie.code,
                idol_name: mainName
            }))
            : [];

        // 4.4 movies
        const movies = idolData?.movies
            ? idolData.movies.map(movie => ({
                code: movie.code,
                title: movie.desc,
                release_date: movie.releaseDate,
                thumbs_short: movie.thumbsShort,
                movieLink: movie.movieLink,
                created_time: Date.now(),
                updated_time: Date.now()
            }))
            : [];

        // 5. save to db
        // 5.1 save idol
        if (idolsFound.data.length > 0) {
            const updateIdolResult = await idolDbServices.updateIdolByName(mainName, idol);
            console.log('[updateIdolResult]', updateIdolResult)
        } else {
            const createIdolResult = await idolDbServices.createIdols([idol]);
            console.log('[createIdolResult]', createIdolResult)
        }

        // 5.2 save movie(s)
        if (movies.length === 0) console.log('No movies to save.');
        else {
            const createMoviesResult = await movieDbServices.createMovies(movies);
            console.log('[createMoviesResult]', createMoviesResult);
        }

        // 5.3 save idol - movie (s)
        // console.log('[idol]', idol);
        if (idolMovies.length === 0) console.log('No idol movies to save.');
        else {
            const createIdolMovies = await idolMovieDbServices.createIdolMovies(idolMovies);
            console.log('[createIdolMovies]', createIdolMovies);
        }

        let resultSendback = displayType === "json"
            ? JSON.stringify(idol)
            : renderIdolHTMLTemplate(idol, movies);
        res.status(200).send(resultSendback);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

router.post('/setIdolAvatar', async (req, res) => {
    const { url, idolName } = req.body;
    const saveImageSuccess = idolCrawlingServices.setAvatar(url, idolName);
    res.status(200).send({ success: saveImageSuccess });
})

router.post('/test', async (req, res) => {
    res.send("wanna test something ?");
})

module.exports = router;
