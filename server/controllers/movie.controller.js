const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const path = require("path");

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const movieCrawlingServices = require("../services/movie.service.crawl");
const idolMovieDbServices = require("../services/idolMovie.service.database");
const idolCrawlingServices = require("../services/idol.service.crawl");

const { treatMovieCode, renderMovieHTMLTemplate } = require("../helpers");
const { CACHED_FOLDER } = require("../constants");

// found = 0 + update record = true => crawl then save
// found = 0 + update record = false => crawl then save

// found > 0 + update record = false + no specify content id => return all
// found > 0 + update record = true  + no specify content id => search content id + crawl
// found > 0 + update record = true  + specify content id => exist(c)/nonexist : crawl then return that movie with content id
// found > 0 + update record = false + specify content id => exist(c)/nonexist : crawl then return that movie with content id

async function searchMovie(req, res) {
    try {
        const { code, url, updateRecord, reuseSavedFile, displayType } = req.body;
        if (!code && !url) {
            throw new Error("Invalid inputs");
        }

        let curCode = "", curContentId = "", curUrl = "";
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
        curContentId = curCode.startsWith("_") ? curCode.slice(1).split("-")[0] : "";

        console.log("🎞️  ", curCode, curContentId, "\n");

        // Search in db
        let moviesFound = await movieDbServices.searchMovieByCode(curCode);
        // let idolListFound = await idolMovieDbServices.searchIdolsByMovieCode(curCode);
        console.log('[moviesFound]', moviesFound.data.length);

        let movieData = null;
        if (moviesFound.data.length === 0) {
            movieData = await movieCrawlingServices.crawlMovieService(curCode, curUrl);// crawl internet
        } else {
            if (!curContentId && !updateRecord) {
                // return all
                const moviesData = [];
                for (const movieFound of moviesFound.data) {
                    const code = movieFound.code;
                    const contentId = movieFound.contentId;
                    const idolListFound = await idolMovieDbServices.searchIdolsByMovieCodeContent(code, contentId);
                    moviesData.push({ ...movieFound, idolList: idolListFound.map(e => e.idol_name) })
                }

                // console.log('[moviesData]', moviesData);
                let resultSendback =
                    displayType === "json"
                        ? JSON.stringify(moviesData)
                        : renderMovieHTMLTemplate(moviesData);
                res.status(200).send(resultSendback);
                return;
            }

            // crawl
            const fileName = curCode + "_" + curContentId + ".json";
            const cachedPath = path.join(process.cwd(), "cached", fileName);
            const exist = fs.existsSync(cachedPath);

            if (exist && reuseSavedFile) {
                const d = fs.readFileSync(cachedPath, "utf-8");
                movieData = JSON.parse(d);
            } else {
                movieData = await movieCrawlingServices.crawlMovieService(curCode, curUrl);
            }
        }
        // console.log('[movieData]', movieData)

        // 4. treat data
        const movie = movieData
            ? {
                code: movieData.dvd_id,
                contentId: movieData.content_id,
                title: movieData.title,
                studio: movieData.studio?.raw,
                release_date: movieData.release_date,
                runtime: movieData.runtime?.replace(".", ""),
                note: movieData.note,
                favorite: movieData.favorite,
                thumbs_short: Array.isArray(movieData.thumbs?.cover) ? movieData.thumbs?.cover[0] : movieData.thumbs?.cover,
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
            } : null;

        // idol-movies record
        const idolMovies = Array.isArray(movieData?.idols)
            ? movieData.idols.map((idol) => ({
                movie_contentId: movieData?.content_id,
                movie_code: movieData?.dvd_id.toLowerCase(),
                idol_name: idol.raw,
            })) : null;

        // idol(s) records
        const idols = Array.isArray(movieData?.idols)
            ? movieData.idols.map((idol) => ({
                name: idol.raw,
                created_time: Date.now(),
                updated_time: Date.now(),
            })) : null;

        // 4.2 recheck if curcode contains "_" character
        let idolListFound;
        if (curCode.startsWith("_")) {
            moviesFound = await movieDbServices.searchMovieByContentId(movie.contentId);
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
                // console.log('[moviesFound.data]', moviesFound.data);
                await movieDbServices.updateMovieByContentId(movie.contentId, movie);
            } else {
                await movieDbServices.createMovies([movie]);
            }
        }

        // 5.3 save idol - movie (s)
        if (idolMovies) {
            // console.log(idolMovies)
            await idolMovieDbServices.createIdolMovies(idolMovies);
        }
        const movieDisplay = movieData
            ? movie
            : moviesFound.data.length > 0
                ? moviesFound.data[0]
                : null;
        const idolsDisplay = movieData
            ? idols.map((e) => e.name)
            : idolListFound?.length > 0
                ? idolListFound.map((e) => e.idol_name)
                : null;
        const resultSendback = movieDisplay
            ? displayType === "json"
                ? JSON.stringify(moviesFound.data[0])
                : renderMovieHTMLTemplate([{ ...movieDisplay, idolList: idolsDisplay }])
            : "Movie not found";

        res.status(200).send(resultSendback);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

async function searchMultiple(req, res) {
    try {
        const { codes } = req.query;
        const result = await movieDbServices.searchMoviesByCodes(codes.toLocaleLowerCase() || "");
        res.json(result);
    } catch (e) {
        console.error("[getMoviesByCodesQuery]", e);
        res.status(400).json({ error: e.message || "Bad request" });
    }
}

module.exports = { searchMovie, searchMultiple }

// async function searchMovie2(req, res) {
// 	try {
// 		const { code, url, updateRecord, reuseSavedFile, displayType } = req.body;
// 		if (!code && !url) {
// 			throw new Error("Invalid inputs");
// 		}

// 		let curCode = "",
// 			curContentId = "",
// 			curUrl = "";
// 		if (code) {
// 			curCode = treatMovieCode(code);
// 			curUrl = "https://www.javdatabase.com/movies/" + code;
// 		} else if (url) {
// 			const regUrlCode = /https:\/\/www\.javdatabase\.com\/movies\/(?<code>.*[^\/])\/*/;
// 			if (regUrlCode.test(url)) {
// 				const matchGroups = url.match(regUrlCode);
// 				curCode = matchGroups.groups.code;
// 			} else {
// 				curCode = crypto.createHash("md5").update(url).digest("hex");
// 			}
// 			curUrl = url;
// 		}
// 		curContentId = curCode.startsWith("_") ? curCode.slice(1).split("-")[0] : "";

// 		console.log("🎞️  ", curCode, curContentId, "\n");

// 		// Search in db
// 		let moviesFound = await movieDbServices.searchMovieByCode(curCode);
// 		// let idolListFound = await idolMovieDbServices.searchIdolsByMovieCode(curCode);
// 		console.log('[moviesFound]', moviesFound.data.length);

// 		// Case 1: Exist more than 1 movie(s) + not update record => return/display all records
// 		if (moviesFound.data.length > 0 && !updateRecord) {
// 			const moviesData = [];
// 			for (const movieFound of moviesFound.data) {
// 				const code = movieFound.code;
// 				const contentId = movieFound.contentId;
// 				const idolListFound = await idolMovieDbServices.searchIdolsByMovieCodeContent(code, contentId);
// 				moviesData.push({ ...movieFound, idolList: idolListFound.map(e => e.idol_name) })
// 			}

// 			// console.log('[moviesData]', moviesData);
// 			let resultSendback =
// 				displayType === "json"
// 					? JSON.stringify(moviesData)
// 					: renderMovieHTMLTemplate(moviesData);
// 			res.status(200).send(resultSendback);
// 			return;
// 		}

// 		// Case 2: Exist more than 1 movies + need update record / no specify content id
// 		if (moviesFound.data.length > 1 && (!curCode.startsWith("_") || updateRecord)) {
// 			throw new Error(`Found ${moviesFound.data.length} movies. Please specify content id.`);
// 		}

// 		// Case 3: Have no record saved => crawl from internet
// 		// Todo: get the content id
// 		// const cachedPath = `../cached/${name}.json`
// 		const cachedPath = path.join(process.cwd(), "cached", curCode + ".json");
// 		const exist = fs.existsSync(cachedPath);

// 		let movieData = null;
// 		if (exist && reuseSavedFile) {
// 			const d = fs.readFileSync(cachedPath, "utf-8");
// 			movieData = JSON.parse(d);
// 		} else {
// 			movieData = await movieCrawlingServices.crawlMovieService(curCode, curUrl);
// 		}
// 		console.log('[movieData]', movieData);

// 		// 4. treat data
// 		const movie = movieData
// 			? {
// 				code: movieData.dvd_id,
// 				contentId: movieData.content_id,
// 				title: movieData.title,
// 				studio: movieData.studio?.raw,
// 				release_date: movieData.release_date,
// 				runtime: movieData.runtime?.replace(".", ""),
// 				note: movieData.note,
// 				favorite: movieData.favorite,
// 				thumbs_short: Array.isArray(movieData.thumbs?.cover) ? movieData.thumbs?.cover[0] : movieData.thumbs?.cover,
// 				thumbs: movieData.thumbs?.full,
// 				images: movieData.images.join("|"),
// 				created_time: Date.now(),
// 				updated_time: Date.now(),
// 				metadata: JSON.stringify({
// 					content_id: movieData.content_id,
// 					jav_series: movieData.jav_series,
// 					director: movieData.director,
// 					genres: movieData.genres.map((genre) => genre.name).join("|"),
// 				}),
// 			} : null;

// 		const idolMovies = Array.isArray(movieData?.idols)
// 			? movieData.idols.map((idol) => ({
// 				movie_code: movieData.dvd_id.toLowerCase(),
// 				idol_name: idol.raw,
// 			})) : null;

// 		// 4.4 idol(s)
// 		const idols = Array.isArray(movieData?.idols)
// 			? movieData.idols.map((idol) => ({
// 				name: idol.raw,
// 				created_time: Date.now(),
// 				updated_time: Date.now(),
// 			})) : null;

// 		// 4.2 recheck if curcode contains "_" character
// 		let idolListFound;
// 		if (curCode.startsWith("_")) {
// 			moviesFound = await movieDbServices.searchMovieByContentId(movie.contentId);
// 			idolListFound = await idolMovieDbServices.searchIdolsByMovieCode(curCode);
// 		}

// 		// 5. SAVE TO DB
// 		// 5.1 save idol(s)
// 		if (idols) {
// 			await idolDbServices.createIdols(idols);
// 		}

// 		// 5.2 save movie
// 		if (movie) {
// 			if (moviesFound.data.length > 0) {
// 				console.log('[moviesFound.data]', moviesFound.data);
// 				await movieDbServices.updateMovieByContentId(movie.contentId, movie);
// 			} else {
// 				await movieDbServices.createMovies([movie]);
// 			}
// 		}

// 		// 5.3 save idol - movie (s)
// 		if (idolMovies) {
// 			await idolMovieDbServices.createIdolMovies(idolMovies);
// 		}

// 		const movieDisplay = movieData
// 			? movie
// 			: moviesFound.data.length > 0
// 				? moviesFound.data[0]
// 				: null;
// 		const idolsDisplay = movieData
// 			? idols.map((e) => e.name)
// 			: idolListFound?.length > 0
// 				? idolListFound.map((e) => e.idol_name)
// 				: null;
// 		// console.log(movieDisplay, idolsDisplay);
// 		const resultSendback = movieDisplay
// 			? displayType === "json"
// 				? JSON.stringify(moviesFound.data[0])
// 				: renderMovieHTMLTemplate([{ ...movieDisplay, idolList: idolsDisplay }])
// 			: "Movie not found";

// 		res.status(200).send(resultSendback);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send(error.message);
// 	}
// }