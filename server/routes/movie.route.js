const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const path = require("path");

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const movieCrawlingServices = require("../services/movie.service.crawl");
const idolMovieDbServices = require("../services/idolMovie.services.database");
const idolCrawlingServices = require("../services/idol.service.crawl");
const { treatMovieCode, renderMovieHTMLTemplate } = require("../helpers");

// SEARCH
router.post("/search", async (req, res) => {
    try {
        const { code, url, updateRecord, reuseSavedFile, displayType } = req.body;
        if (!code && !url) {
            throw new Error("Invalid inputs");
        }

        let curCode = "",
            curUrl = "";
        if (code) {
            curCode = treatMovieCode(code);
            curUrl = "https://www.javdatabase.com/movies/" + code;
        } else if (url) {
            const regUrlCode = /https:\/\/www\.javdatabase\.com\/movies\/(?<code>.*[^\/])\/*/;
            if (regUrlCode.test(url)) {
                const matchGroups = url.match(regUrlCode);
                curCode = matchGroups.groups.code;
            } else {
                curCode = crypto.createHash("md5").update(url).digest("hex");
            }
            curUrl = url;
        }
        console.log("🎞️  ", curCode);
        console.log("\n");

        // 1. search in db
        let moviesFound = await movieDbServices.searchMovieByCode(curCode);
        let idolListFound = await idolMovieDbServices.searchIdolsByMovieCode(curCode);
        // console.log('[moviesFound]', moviesFound);

        if (moviesFound.data.length > 0 && idolListFound.length > 0 && !updateRecord) {
            let resultSendback =
                displayType === "json"
                    ? JSON.stringify(moviesFound.data)
                    : renderMovieHTMLTemplate(
                        moviesFound.data[0],
                        idolListFound.map((e) => e.idol_name)
                    );
            res.status(200).send(resultSendback);
            return;
        }

        // 3. crawl from internet
        // const cachedPath = `../cached/${name}.json`
        const cachedPath = path.join(process.cwd(), "cached", curCode + ".json");
        const exist = fs.existsSync(cachedPath);

        let movieData = null;
        if (exist && reuseSavedFile) {
            const d = fs.readFileSync(cachedPath, "utf-8");
            movieData = JSON.parse(d);
        } else {
            movieData = await movieCrawlingServices.crawlMovieService(curCode, curUrl);
        }
        console.log('[movieData]', movieData);

        // 4. treat data
        const movie = movieData
            ? {
                code: movieData.dvd_id,
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
                    genres: movieData.genres.map((genre) => genre.name).join("|"),
                }),
            }
            : null;

        const idolMovies = Array.isArray(movieData?.idols)
            ? movieData.idols.map((idol) => ({
                movie_code: movieData.dvd_id.toLowerCase(),
                idol_name: idol.raw,
            }))
            : null;

        // 4.4 idol(s)
        const idols = Array.isArray(movieData?.idols)
            ? movieData.idols.map((idol) => ({
                name: idol.raw,
                created_time: Date.now(),
                updated_time: Date.now(),
            }))
            : null;

        // 4.2 recheck if curcode contains "_" character
        if (curCode.startsWith("_")) {
            moviesFound = await movieDbServices.searchMovieByCode(movie.code);
            idolListFound = await idolMovieDbServices.searchIdolsByMovieCode(curCode);
        }

        // 5. SAVE TO DB
        // 5.1 save idol(s)
        if (idols) {
            await idolDbServices.createIdols(idols);
        }

        // 5.2 save movie
        if (movie) {
            if (moviesFound.data.length > 0) {
                await movieDbServices.updateMovieByCode(movie.code, movie);
            } else {
                await movieDbServices.createMovies([movie]);
            }
        }

        // 5.3 save idol - movie (s)
        if (idolMovies) {
            await idolMovieDbServices.createIdolMovies(idolMovies);
        }

        const movieDisplay = movieData ? movie : moviesFound.data.length > 0 ? moviesFound.data[0] : null;
        const idolsDisplay = movieData ? idols.map((e) => e.name) : idolListFound?.length > 0 ? idolListFound.map((e) => e.idol_name) : null;
        // console.log(movieDisplay, idolsDisplay);
        const resultSendback = movieDisplay
            ? displayType === "json"
                ? JSON.stringify(moviesFound.data)
                : renderMovieHTMLTemplate(movieDisplay, idolsDisplay)
            : "Movie not found";

        res.status(200).send(resultSendback);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.post("/setIdolAvatar", async (req, res) => {
    const { url, idolName } = req.body;
    const saveImageSuccess = idolCrawlingServices.setAvatar(url, idolName);
    res.status(200).send({ success: saveImageSuccess });
});

module.exports = router;
