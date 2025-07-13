const fs = require("fs");
const path = require("path");
const express = require('express');
const router = express.Router();

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const movieCrawlingServices = require("../services/movie.service.crawl")
const idolMovieDbServices = require("../services/idolMovie.services.database");
const idolCrawlingServices = require("../services/idol.service.crawl");


// SEARCH
router.post('/search', async (req, res) => {
    const { code } = req.body;
    console.log(code)
    // Todo:
    // 1. search in db
    const movieFound = await movieDbServices.searchMovieByCode(code);
    console.log('[movieFound]', movieFound);
    // 2. if has => return
    if (movieFound.err) {
        throw new Error(err.message);
    }
    if (movieFound.data.length > 0) {
        // return movieFound.data;
        res.status(200).send(JSON.stringify(movieFound.data))
    }
    // 3. crawl from internet
    // const cachedPath = `../cached/${name}.json`
    const cachedPath = path.join(process.cwd(), "cached", code + ".json")
    const exist = fs.existsSync(cachedPath);

    let movieData = null;
    if (exist) {
        const d = fs.readFileSync(cachedPath, "utf-8");
        movieData = JSON.parse(d);
        console.log("has data")
    } else {
        movieData = await movieCrawlingServices.crawlMovieByCode(code);
    }
    // console.log(idolData);

    // 4. treat data
    // 4.1 idol
    const movie = {
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
        metadata: JSON.stringify({
            content_id: movieData.content_id,
            jav_series: movieData.jav_series,
            director: movieData.director,
            genres: movieData.genres.map(genre => genre.name).join("|")
        })
    }

    // 4.3 idol - movie
    const idolMovies = movieData.idols.map(idol => ({ movie_code: movieData.dvd_id.toLowerCase(), idol_name: idol.raw }));

    // 4.4 movies
    const idols = movieData.idols.map(idol => ({
        name: idol.raw
    }));

    // 5. save to db
    // 5.1 save idol
    const createIdolResult = await idolDbServices.createIdols(idols);
    console.log('[createIdolResult]', createIdolResult)
    // 5.2 save movie(s)
    const createMoviesResult = await movieDbServices.createMovies([movie]);
    console.log('[createMoviesResult]', createMoviesResult)
    // 5.3 save idol - movie (s)
    const createIdolMovies = await idolMovieDbServices.createIdolMovies(idolMovies);
    console.log('[createIdolMovies]', createIdolMovies)

    res.status(200).send("ok");
});

router.post('/setIdolAvatar', async (req, res) => {
    const { url, idolName } = req.body;
    const saveImageSuccess = idolCrawlingServices.setAvatar(url, idolName);
    res.status(200).send({ success: saveImageSuccess });
})

module.exports = router;
