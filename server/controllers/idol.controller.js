const fs = require("fs");
const path = require("path");

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const idolMovieDbServices = require("../services/idolMovie.service.database");
const idolCrawlingServices = require("../services/idol.service.crawl");

const { parseIdolName, renderIdolHTMLTemplate, shuffleArray, generateRandomNumber } = require("../helpers");
const { crawlIdolFromJJGirl } = require("../features/jjgirls/jjgirls.utils");

async function searchIdol(req, res) {
    try {
        console.log('[req.body]', req.body);
        const { name, updateRecord, reuseSavedFile, displayType } = req.body;
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
            const moviesCodeShuffled = shuffleArray(moviesCode.filter(e => e.includes("-"))).slice(0, 8).filter(Boolean);
            const moviesDataShullfedReq = await movieDbServices.searchMoviesByCodes(moviesCodeShuffled.join(","));

            const moviesReturn = displayType !== "json"
                ? moviesCode
                : moviesDataShullfedReq.data.map(e => ({ code: e.code, thumb: e.thumbs_short }));

            // const moviesCode = displayType === "json"
            // 	? searchMoviesReq.map(e => ({ code: e.movie_code, thumb: e.thumbs_short }))
            // 	: searchMoviesReq.map(e => e.movie_code);
            const jsonDataReturn = {
                ...idolsFound.data[0],
                movies: moviesReturn
            }

            // 4.5 get avatar
            const avatarDir = path.join(process.cwd(), "database", "idol-avatars");
            if (fs.existsSync(path.join(avatarDir, `${mainName}-avatar.jpg`))) jsonDataReturn.avatar = `/images/idol-avatars/${mainName}-avatar.jpg`;
            if (fs.existsSync(path.join(avatarDir, `${mainName}-avatar-gif.gif`))) jsonDataReturn.avatar = `/images/idol-avatars/${mainName}-avatar-gif.gif`;
            if (!jsonDataReturn.avatar) jsonDataReturn.avatar = `/images/idol-avatars/anonymous.jpg`;

            // 4.6 get pictures
            const picturesDir = path.join(process.cwd(), "database", "idol-pictures");
            for (let i = 1; i <= 10; i++) {
                const picPath = path.join(picturesDir, `${mainName}-${i}.jpg`);
                if (fs.existsSync(picPath)) {
                    const picUrl = `/images/idol-pictures/${mainName}-${i}.jpg`;
                    if (!jsonDataReturn.pictures) jsonDataReturn.pictures = [];
                    jsonDataReturn.pictures.push(picUrl);
                }
            }

            // 4.7 get cover
            const coverDir = path.join(process.cwd(), "database", "idol-pictures");
            if (fs.existsSync(path.join(coverDir, `${mainName}-0.jpg`))) jsonDataReturn.cover = `/images/idol-pictures/${mainName}-0.jpg`;
            if (fs.existsSync(path.join(coverDir, `${mainName}-0.webp`))) jsonDataReturn.cover = `/images/idol-pictures/${mainName}-0.webp`;
            if (!jsonDataReturn.cover) jsonDataReturn.cover = `/images/idol-pictures/anonymous-${generateRandomNumber(0, 10)}.jpg`;

            // console.log(jsonDataReturn);
            let resultSendback = displayType === "json"
                ? JSON.stringify(jsonDataReturn)
                : renderIdolHTMLTemplate(idolsFound.data[0], moviesDataShullfedReq.data);

            res.status(200).send(resultSendback);
            return;
        }

        // 3. crawl from internet
        // const cachedPath = `../cached/${name}.json`
        const cachedPath = path.join(process.cwd(), "cached", mainName + ".json");
        const exist = fs.existsSync(cachedPath);

        let idolData = null;
        if (exist && reuseSavedFile) {
            const d = fs.readFileSync(cachedPath, "utf-8");
            idolData = JSON.parse(d);
        } else {
            const tmp_name_jher = name_jher
                ? (name_jher[0] === "_" ? name_jher : parseIdolName(name_jher))
                : (name_jdb[0] === "_" ? name_jdb : parseIdolName(name_jdb));
            const tmp_name_jjg = name_jjg
                ? (name_jjg[0] === "_" ? name_jjg : parseIdolName(name_jjg))
                : (name_jdb[0] === "_" ? name_jdb : parseIdolName(name_jdb));

            if (idolsFound.data.length > 0) {
                const savedRecord = idolsFound.data[0];
                const metadata = JSON.parse(savedRecord.metadata);
                name_jdb = "_" + savedRecord.name;
                name_jher = metadata?.javherQueryName ? "_" + metadata.javherQueryName : tmp_name_jher;
                name_jjg = metadata?.jjGirlQueryName ? "_" + metadata.jjGirlQueryName : tmp_name_jjg;
            } else {
                name_jdb = name_jdb[0] === "_" ? name_jdb : parseIdolName(name_jdb);
                name_jher = tmp_name_jher;
                name_jjg = tmp_name_jjg;
            }
            // console.log("name", { name_jdb, name_jher, name_jjg });

            idolData = await idolCrawlingServices.crawlIdolByName({ name_jdb, name_jher, name_jjg });
        }

        // console.log('[idolData]', idolData);
        // 4. treat data
        // 4.1 idol
        const idol = JSON.parse(JSON.stringify(idolData));
        delete idol.movies;

        // 4.3 idol - movie
        // console.log(idolData?.movies.map(e => e.metadata.content_id));
        const idolMovies = idolData?.movies
            ? idolData.movies.map(movie => ({
                movie_contentId: movie.metadata.content_id,
                movie_code: movie.code,
                idol_name: mainName
            })) : [];

        // 4.4 movies
        const movies = idolData?.movies
            ? idolData.movies.map(movie => ({
                code: movie.code,
                contentId: movie.metadata.content_id,
                title: movie.desc,
                release_date: movie.releaseDate,
                thumbs: movie.thumbs,
                thumbs_short: movie.thumbsShort,
                movieLink: movie.movieLink,
                created_time: Date.now(),
                updated_time: Date.now()
            })) : [];

        // 4.5 get avatar
        const avatarDir = path.join(process.cwd(), "database", "idol-avatars");
        if (fs.existsSync(path.join(avatarDir, `${mainName}-avatar.jpg`))) idol.avatar = `/images/idol-avatars/${mainName}-avatar.jpg`;
        if (fs.existsSync(path.join(avatarDir, `${mainName}-avatar-gif.gif`))) idol.avatar = `/images/idol-avatars/${mainName}-avatar-gif.gif`;
        if (!idol.avatar) idol.avatar = `/images/idol-avatars/anonymous.jpg`;

        // 4.6 get pictures
        const picturesDir = path.join(process.cwd(), "database", "idol-pictures");
        for (let i = 1; i <= 10; i++) {
            const picPath = path.join(picturesDir, `${mainName}-${i}.jpg`);
            if (fs.existsSync(picPath)) {
                const picUrl = `/images/idol-pictures/${mainName}-${i}.jpg`;
                if (!idol.pictures) idol.pictures = [];
                idol.pictures.push(picUrl);
            }
        }

        // 4.7 get cover
        const coverDir = path.join(process.cwd(), "database", "idol-pictures");
        if (fs.existsSync(path.join(coverDir, `${mainName}-0.jpg`))) idol.cover = `/images/idol-pictures/${mainName}-0.jpg`;
        if (fs.existsSync(path.join(coverDir, `${mainName}-0.webp`))) idol.cover = `/images/idol-pictures/${mainName}-0.webp`;
        if (!idol.cover) idol.cover = `/images/idol-pictures/anonymous-${generateRandomNumber(0, 10)}.jpg`;

        // 5. save to db
        // 5.1 save idol
        if (idolsFound.data.length > 0) {
            if (mainName) await idolDbServices.updateIdolByName(mainName, idol);
        } else {
            await idolDbServices.createIdols([idol]);
        }

        // 5.2 save movie(s)
        if (movies.length === 0) console.log('No movie to save.');
        else {
            await movieDbServices.createMovies(movies);
        }

        // 5.3 save idol - movie (s)
        // console.log('[idol]', idol);
        if (idolMovies.length === 0) console.log('No idol movie to save.');
        else {
            await idolMovieDbServices.createIdolMovies(idolMovies);
        }

        let resultSendback = displayType === "json"
            ? JSON.stringify(idol)
            : renderIdolHTMLTemplate(idol, movies);
        res.status(200).send(resultSendback);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

async function getPagination(req, res) {
    try {
        const {
            page, pageSize,
            search,        // optional: fuzzy search on name/jp
            favorite,      // optional: exact match on favorite field
            my_favorite,   // optional: 0|1
            sort,          // optional: id|name|created_time|updated_time|movies_count
            order          // optional: asc|desc
        } = req.query;

        const result = await idolDbServices.getIdolsPaginated({
            page, pageSize,
            search,
            favorite,
            my_favorite: (my_favorite === undefined ? undefined : Number(my_favorite)),
            sort,
            order,
        });

        console.log('[result]', result)
        console.log("Client fetched pagination page", page)

        return res.json(result);
    } catch (err) {
        console.error("[listIdolsPaginated]", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function searchIdolByNameLike(name) {
    const result = await idolDbServices.searchIdolsByNameLike(name);
    return res.json(result);
}

module.exports = { searchIdol, getPagination }