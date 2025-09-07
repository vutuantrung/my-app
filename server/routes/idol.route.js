const fs = require("fs");
const path = require("path");
const express = require('express');
const router = express.Router();

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const idolMovieDbServices = require("../services/idolMovie.services.database");
const idolCrawlingServices = require("../services/idol.service.crawl");
const { treatIdolName, toMime, updateHTMLTemplate, render404Page, shuffleArray } = require("../helpers");
const { getJJGirlsImageIndex } = require("../features/jjgirls/jjgirls.utils");

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
        const { name, updateRecord, displayType } = req.body;
        const curName = treatIdolName(name);
        console.log("\n👩  ", curName);

        // Todo: check the inversed name

        // 1. search in db
        const idolsFound = await idolDbServices.searchIdolsByName(curName);
        // console.log('[idolsFound]', idolsFound);

        // 2. if has => return
        if (idolsFound.err) {
            throw new Error(err.message);
        }
        // console.log('[idolsFound]', idolsFound);
        if (idolsFound.data.length > 0 && !updateRecord) {
            const searchMoviesReq = await idolMovieDbServices.searchMovieByIdolName(curName);
            const moviesCode = searchMoviesReq.map(e => e.movie_code);
            const shuffledMoviesCode = shuffleArray(moviesCode).slice(0, 8).filter(Boolean);
            const moviesDataReq = await movieDbServices.searchMoviesByCodes(shuffledMoviesCode);
            // console.log(moviesDataReq);
            let resultSendback = displayType === "json"
                ? JSON.stringify(idolsFound.data[0])
                : updateHTMLTemplate(idolsFound.data[0], moviesDataReq.data);

            res.status(200).send(resultSendback);
            return;
        }
        // 3. crawl from internet
        // const cachedPath = `../cached/${name}.json`
        const cachedPath = path.join(process.cwd(), "cached", curName + ".json")
        const exist = fs.existsSync(cachedPath);

        let idolData = null, jjgirlData = null;
        if (exist) {
            const d = fs.readFileSync(cachedPath, "utf-8");
            idolData = JSON.parse(d);
        } else {
            idolData = await idolCrawlingServices.crawlIdolByName(curName);
            const indexData = await getJJGirlsImageIndex(curName);
            jjgirlData = indexData ? `${indexData.name}|${indexData.folderIndex}|${indexData.imageIndex}` : ""
        }

        if (!idolData && !jjgirlData) {
            console.log('❌ Idol not found');
            res.status(200).send(render404Page());
            return;
        }

        // console.log(idolData);
        // 4. treat data
        // 4.1 idol
        const idol = {
            name: curName,
            dob: idolData?.dob,
            measurements: idolData?.measurements,
            height: idolData?.height,
            country: idolData?.birthplace,
            cup: idolData?.cup,
            movies_count: idolData?.movies.length,
            note: idolData?.note,
            favorite: idolData?.favorite,
            my_favorite: 0,
            jp: idolData?.jp,
            created_time: Date.now(),
            updated_time: Date.now(),
            metadata: JSON.stringify({
                avatar: idolData?.avatar,
                age: idolData?.age,
                debut: idolData?.debut,
                sign: idolData?.sign,
                blood: idolData?.blood,
                shoe_size: idolData?.shoe_size,
                hair_length: idolData?.['hair_length(s)'],
                hair_color: idolData?.['hair_color(s)'],
                tags: idolData?.tags ? idolData.tags.map(tag => tag.name + ":" + tag.value).join("|") : "",
                jjgirlData: jjgirlData
            })
        }

        // 4.3 idol - movie
        const idolMovies = idolData?.movies
            ? idolData.movies.map(movie => ({
                movie_code: movie.code,
                idol_name: curName
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
            const updateIdolResult = await idolDbServices.updateIdolByName(curName, idol);
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
            : updateHTMLTemplate(idol, movies);
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
