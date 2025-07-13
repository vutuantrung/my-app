const fs = require("fs");
const path = require("path");
const express = require('express');
const router = express.Router();

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const idolMovieDbServices = require("../services/idolMovie.services.database");
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
        // return idolsFound.data;
        res.status(200).send(JSON.stringify(idolsFound.data));
    }
    // 3. crawl from internet
    // const cachedPath = `../cached/${name}.json`
    const cachedPath = path.join(process.cwd(), "cached", name + ".json")
    const exist = fs.existsSync(cachedPath);

    let idolData = null;
    if (exist) {
        const d = fs.readFileSync(cachedPath, "utf-8");
        idolData = JSON.parse(d);
        console.log("has data")
    } else {
        idolData = await idolCrawlingServices.crawlIdolByName(name);
    }
    // console.log(idolData);
    // 4. treat data
    // 4.1 idol
    const idol = {
        name: name,
        dob: idolData.dob,
        measurements: idolData.measurements,
        height: idolData.height,
        country: idolData.birthplace,
        cup: idolData.cup,
        movies_count: idolData.movies_count,
        note: idolData.note,
        favorite: idolData.favorite,
        my_favorite: 0,
        jp: idolData.jp,
        metadata: JSON.stringify({
            avatar: idolData.avatar,
            age: idolData.age,
            debut: idolData.debut,
            sign: idolData.sign,
            blood: idolData.blood,
            shoe_size: idolData.shoe_size,
            hair_length: idolData['hair_length(s)'],
            hair_color: idolData['hair_color(s)'],
            tags: idolData.tags.map(tag => tag.name + ":" + tag.value).join("|"),
        })
    }

    // 4.3 idol - movie
    const idolMovies = idolData.movies.map(movie => ({ movie_code: movie.code, idol_name: name }));

    // 4.4 movies
    const movies = idolData.movies.map(movie => ({
        code: movie.code,
        title: movie.desc,
        release_date: movie.releaseDate,
        thumbs_short: movie.thumbsShort,
        movieLink: movie.movieLink
    }));

    // 5. save to db
    // 5.1 save idol
    const createIdolResult = await idolDbServices.createIdols([idol]);
    console.log('[createIdolResult]', createIdolResult)
    // 5.2 save movie(s)
    const createMoviesResult = await movieDbServices.createMovies(movies);
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
