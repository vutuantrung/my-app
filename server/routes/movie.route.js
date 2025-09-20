const fs = require("fs");
const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const path = require("path");

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const movieCrawlingServices = require("../services/movie.service.crawl")
const idolMovieDbServices = require("../services/idolMovie.services.database");
const idolCrawlingServices = require("../services/idol.service.crawl");
const { treatMovieCode, renderMovieHTMLTemplate } = require("../helpers");

// SEARCH
router.post('/search', async (req, res) => {
    try {
        const { code, url, updateRecord, displayType } = req.body;
        if (!code && !url) {
            throw new Error("Invalid inputs");
        }

        let curCode = "", curUrl = "";
        if (code) {
            curCode = treatMovieCode(code);
            curUrl = "https://www.javdatabase.com/movies/" + code;
        } else if (url) {
            const regUrlCode = /https:\/\/www\.javdatabase\.com\/movies\/(?<code>.*[^\/])\/*/;
            if (regUrlCode.test(url)) {
                const matchGroups = url.match(regUrlCode);
                curCode = matchGroups.groups.code;
            } else {
                curCode = crypto.createHash('md5').update(url).digest('hex');
            }
            curUrl = url;
        }
        console.log("🎞️  ", curCode);
        console.log("\n");

        // 1. search in db
        const moviesFound = await movieDbServices.searchMovieByCode(curCode);
        // console.log('[moviesFound]', moviesFound);
        // 2. if has => return
        if (moviesFound.err) {
            throw new Error(err.message);
        }
        if (moviesFound.data.length > 0 && !updateRecord) {
            const searchIdolsReq = await idolMovieDbServices.searchIdolsByMovieCode(curCode);
            const idolList = searchIdolsReq.map(e => e.idol_name);

            let resultSendback = displayType === "json"
                ? JSON.stringify(moviesFound.data)
                : renderMovieHTMLTemplate(moviesFound.data[0], idolList);

            res.status(200).send(resultSendback);
            return;
        }
        // 3. crawl from internet
        // const cachedPath = `../cached/${name}.json`
        const cachedPath = path.join(process.cwd(), "cached", curCode + ".json")
        const exist = fs.existsSync(cachedPath);

        let movieData = null;
        if (exist) {
            const d = fs.readFileSync(cachedPath, "utf-8");
            movieData = JSON.parse(d);
        } else {
            movieData = await movieCrawlingServices.crawlMovieService(curCode, curUrl);
        }
        // console.log(movieData);

        // 4. treat data
        // 4.1 movie
        const movie = {
            code: curCode,
            title: movieData.title,
            studio: movieData.studio?.raw,
            release_date: movieData.release_date,
            runtime: movieData.runtime?.replace(".", ""),
            note: movieData.note,
            favorite: movieData.favorite,
            thumbs_short: movieData.thumbs?.cover,
            thumbs: movieData.thumbs?.full,
            images: movieData.images.join("|"),
            created_time: Date.now(),
            updated_time: Date.now(),
            metadata: JSON.stringify({
                content_id: movieData.content_id,
                jav_series: movieData.jav_series,
                director: movieData.director,
                genres: movieData.genres.map(genre => genre.name).join("|")
            })
        }

        // 4.3 idol - movie (s)
        const idolMovies = movieData.idols.map(idol => ({ movie_code: curCode.toLowerCase(), idol_name: idol.raw }));

        // 4.4 idol(s)
        const idols = movieData.idols.map(idol => ({
            name: idol.raw,
            created_time: Date.now(),
            updated_time: Date.now(),
        }));

        // 5. save to db
        // 5.1 save idol(s)
        const createIdolResult = await idolDbServices.createIdols(idols);
        console.log('[createIdolResult]', createIdolResult)
        // 5.2 save movie
        if (moviesFound.data.length > 0) {
            const updateMovieResult = await movieDbServices.updateMovieByCode(curCode, movie);
            console.log('[updateMovieResult]', updateMovieResult)
        } else {
            const createMoviesResult = await movieDbServices.createMovies([movie]);
            console.log('[createMoviesResult]', createMoviesResult)
        }

        // 5.3 save idol - movie (s)
        const createIdolMovies = await idolMovieDbServices.createIdolMovies(idolMovies);
        console.log('[createIdolMovies]', createIdolMovies);

        let resultSendback = displayType === "json"
            ? JSON.stringify(moviesFound.data)
            : renderMovieHTMLTemplate(movie, idols.map(e => e.name));

        res.status(200).send(resultSendback);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.post('/setIdolAvatar', async (req, res) => {
    const { url, idolName } = req.body;
    const saveImageSuccess = idolCrawlingServices.setAvatar(url, idolName);
    res.status(200).send({ success: saveImageSuccess });
})

module.exports = router;
