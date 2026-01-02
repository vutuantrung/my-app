const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const path = require("path");

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const movieCrawlingServices = require("../services/movie.service.crawl");
const idolMovieDbServices = require("../services/idolMovie.service.database");

const { treatMovieCode, renderMovieHTMLTemplate, shuffleArray } = require("../helpers");
const { broadcast } = require("../serverWS");

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
		let moviesFound = await movieDbServices.searchMoviesByCodes(curCode);// why return array => because we can have an film with same code but not same contentid
		// let idolListFound = await idolMovieDbServices.searchIdolsByMovieCode(curCode);

		let movieData = null;
		// search the ONE movie that have not existed yet
		if (moviesFound.data.length === 0) {
			movieData = await movieCrawlingServices.crawlMovieService(curCode, curUrl);// crawl internet
		} else {
			// if no need to re-crawl => return
			if (!curContentId && !updateRecord) {
				// return all
				const moviesData = [];
				for (const movieFound of moviesFound.data) {
					const code = movieFound.code;
					const contentId = movieFound.contentId;
					const idolListFound = await idolMovieDbServices.searchIdolsByMovieCodeContentId(code, contentId);
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
		if (moviesFound.data.length === 0 && !movieData) {
			res.status(200).send({ errMsg: "Movie not found !" });
			return;
		}

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
				metadata: {
					javherQueryName: idol.raw,
				}
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
			const searchMovieByContentId = await movieDbServices.searchMovieByContentId(movie.contentId);
			moviesFound = { data: searchMovieByContentId ? [searchMovieByContentId] : [] }
			idolListFound = await idolMovieDbServices.searchIdolsByMovieCode(movie.code);
		}

		// 5. SAVE TO DB
		// 5.1 save idol(s)
		if (idols) {
			await idolDbServices.createIdols(idols);
		}

		// 5.2 save movie
		if (movie) {
			if (moviesFound.data.length > 0) {
				await movieDbServices.updateMovieByContentId(movie.contentId, movie);
				broadcast("movie.updated", "Movie updated: " + movie.code.toUpperCase(), {
					movie: { code: movie.code, title: movie.title, contentId: movie.contentId }
				})
			} else {
				console.log('[moviesCreated.data]', movie);
				await movieDbServices.createMovies([movie]);
				broadcast("movie.created", "Movie added: " + movie.code.toUpperCase(), {
					movie: { code: movie.code, title: movie.title, contentId: movie.contentId }
				})
			}
		}

		// 5.3 save idol - movie (s)
		if (idolMovies) {
			// console.log(idolMovies)
			await idolMovieDbServices.createIdolMovies(idolMovies);
		}
		const movieDisplay = movieData ? movie : moviesFound;
		const idolsDisplay = movieData
			? idols.map((e) => e.name)
			: idolListFound?.data?.length > 0
				? idolListFound.data.map((e) => e.idol_name)
				: null;

		const resultSendback = displayType === "json"
			? JSON.stringify(movie)
			: renderMovieHTMLTemplate([{ ...movieDisplay, idolList: idolsDisplay }]);

		res.status(200).send(resultSendback);
	} catch (error) {
		console.log(error);
		res.status(500).send({ errMsg: error.message });
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

async function searchMoviesByMyFavorite(req, res) {
	const LIMIT_DEFAULT = 10;
	const { limit } = req.query;
	const result = await movieDbServices.searchMovieByMyFavorite();

	const maxValue = limit ? parseInt(limit, 10) : null;
	const idolReturn = maxValue && !isNaN(maxValue)
		? shuffleArray(result.data).slice(0, maxValue)
		: shuffleArray(result.data).slice(0, LIMIT_DEFAULT);
	return res.json(idolReturn);
}

async function searchMovieByContentId(req, res) {
	const { contentId } = req.query;
	const movieFound = await movieDbServices.searchMovieByContentId(contentId);
	// console.log('[movieFound]', movieFound);

	// idols
	const idolListFound = await idolMovieDbServices.searchIdolsByMovieCodeContentId(movieFound?.code, movieFound?.contentId);
	movieFound.idols = idolListFound.data.map(e => e.idol_name);

	return res.json(movieFound);
}

async function searchMovieByCodeContentId(req, res) {
	const { code, contentId } = req.query;

	let movieFound = null;
	if (code) {
		// code not full, includes ","
		movieFound = await movieDbServices.searchMoviesByCodes(code);
	} else if (contentId) {
		movieFound = await movieDbServices.searchMoviesByContentIds(contentId);
	}
	console.log('[movieFound]', movieFound);

	// idols
	if (movieFound) {
		const idolListFound = await idolMovieDbServices.searchIdolsByMovieCodeContentId(movieFound?.code, movieFound?.contentId);
		movieFound.idols = idolListFound.data.map(e => e.idol_name);
	}

	return res.json(movieFound);
}

async function getPagination(req, res) {
	try {
		const {
			page = 1, pageSize = 20,
			code, codes,
			title,
			studio,
			favorite,
			my_favorite,
			note,
			sortBy,
			sortOrder,
		} = req.query;

		const result = await movieDbServices.searchMoviesPaginated({
			page, pageSize,
			code, codes,
			title,
			studio,
			favorite,
			my_favorite: (my_favorite === undefined ? undefined : Number(my_favorite)),
			note,
			sortBy,
			sortOrder,
		});

		return res.json(result);
	} catch (err) {
		console.error("[listIdolsPaginated]", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports = {
	searchMovie,
	getPagination,
	searchMultiple,
	searchMoviesByMyFavorite,
	searchMovieByContentId,
	searchMovieByCodeContentId,
}