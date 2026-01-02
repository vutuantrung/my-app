const fs = require("fs");
const path = require("path");

const idolDbServices = require("../services/idol.service.database");
const movieDbServices = require("../services/movie.service.database");
const idolMovieDbServices = require("../services/idolMovie.service.database");
const idolCrawlingServices = require("../services/idol.service.crawl");

const { parseIdolName, renderIdolHTMLTemplate, shuffleArray, generateRandomNumber } = require("../helpers");
const { broadcast } = require("../serverWS");
const { CACHED_FOLDER } = require("../constants");

async function searchIdol(req, res) {
	try {
		console.log('[req.body]', req.body);
		const { name, updateRecord, reuseSavedFile, displayType, alias, representativeName } = req.body;
		let [name_jdb, name_jher, name_jjg] = name.split(",");
		console.log("name", { name_jdb, name_jher, name_jjg });

		const mainName = representativeName
			? representativeName.trim()
			: parseIdolName(name_jdb).replace("_", "");// REMOVE UNDER_SCORE
		console.log("\n👩  ", mainName);

		const cachedPath = path.join(CACHED_FOLDER, mainName + "_profile.json");

		// 1. search in db
		let idolFound = null;
		const sameNameIdolsFound = await idolDbServices.searchIdolsByNames(mainName);
		if (sameNameIdolsFound.err) {
			throw new Error(sameNameIdolsFound.err.message);
		}
		if (sameNameIdolsFound.data.length > 1) {
			throw new Error("Multiple idols found with the same name: " + mainName);
		}
		if (sameNameIdolsFound.data.length > 0) {
			idolFound = {
				...idolFound,
				...sameNameIdolsFound.data[0],
			}
		}

		// console.log('[idolsFound]', idolsFound);
		const sameAliasIdolsFound = await idolDbServices.searchIdolsByAliasName(mainName);
		if (sameAliasIdolsFound.data.length > 1) {
			throw new Error("Multiple idols found with the same alias name: " + mainName);
		}
		if (sameAliasIdolsFound.data.length > 0) {
			idolFound = {
				...idolFound,
				...sameAliasIdolsFound.data[0],
			}
		}

		// console.log('[idolFound]', idolFound);
		if (idolFound && updateRecord) {
			const searchMoviesReq = await idolMovieDbServices.searchMoviesByIdolName(mainName);

			const moviesCode = searchMoviesReq.data.map(e => e.movie_code);
			const shuffledMoviesCode = shuffleArray(moviesCode.filter(e => e.includes("-"))).slice(0, 8).filter(Boolean);
			const moviesDataReq = await movieDbServices.searchMoviesByCodes(shuffledMoviesCode.join(","));

			const moviesReturn = displayType !== "json" ? moviesCode : moviesDataReq.data.map(e => ({ code: e.code, thumb: e.thumbs_short }));

			// const moviesCode = displayType === "json"
			// 	? searchMoviesReq.map(e => ({ code: e.movie_code, thumb: e.thumbs_short }))
			// 	: searchMoviesReq.map(e => e.movie_code);
			const jsonDataReturn = {
				...idolFound,
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
				const picPath = path.join(picturesDir, `${mainName}-${i}.webp`);
				if (fs.existsSync(picPath)) {
					const picUrl = `/images/idol-pictures/${mainName}-${i}.webp`;
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
				: renderIdolHTMLTemplate(idolFound, moviesDataReq.data);

			res.status(200).send(resultSendback);
			return;
		}

		// 3. crawl from internet
		// const cachedPath = `../cached/${name}.json`
		const exist = fs.existsSync(cachedPath);

		let idolData = null;
		// if (exist && reuseSavedFile) {
		// 	const d = fs.readFileSync(cachedPath, "utf-8");
		// 	idolData = JSON.parse(d);
		// } else {
		// 	const tmp_name_jdb = name_jdb[0] === "_" ? name_jdb : parseIdolName(name_jdb);
		// 	const tmp_name_jher = name_jher
		// 		? (name_jher[0] === "_" ? name_jher : parseIdolName(name_jher))
		// 		: tmp_name_jdb;
		// 	const tmp_name_jjg = name_jjg
		// 		? (name_jjg[0] === "_" ? name_jjg : parseIdolName(name_jjg))
		// 		: tmp_name_jdb;

		// 	if (idolFound) {
		// 		const savedRecord = idolFound;
		// 		const metadata = JSON.parse(savedRecord.metadata);
		// 		// name_jdb = "_" + (metadata?.javdbQueryName ?? tmp_name_jdb);
		// 		name_jdb = metadata?.javdbQueryName ? "_" + metadata.javdbQueryName : tmp_name_jdb;
		// 		name_jher = metadata?.javherQueryName ? "_" + metadata.javherQueryName : tmp_name_jher;
		// 		name_jjg = metadata?.jjGirlQueryName ? "_" + metadata.jjGirlQueryName : tmp_name_jjg;
		// 	} else {
		// 		name_jdb = tmp_name_jdb;
		// 		name_jher = tmp_name_jher;
		// 		name_jjg = tmp_name_jjg;
		// 	}
		// 	console.log("name", { name_jdb, name_jher, name_jjg });

		// 	idolData = await idolCrawlingServices.crawlIdolByName({ name_jdb, name_jher, name_jjg }, updateRecord);
		// }

		idolData = await idolCrawlingServices.crawlIdolByName({ name_jdb, name_jher, name_jjg }, updateRecord);

		// console.log('[idolDataidolData]', idolData)

		if (!idolFound && !idolData) {
			res.status(200).send({ errMsg: "Idol not found !" });
			return;
		}
		// 4. treat data
		// 4.1 idol
		const idol = JSON.parse(JSON.stringify(idolData));
		delete idol.movies;

		// 4.2 get avatar
		const avatarDir = path.join(process.cwd(), "database", "idol-avatars");
		if (fs.existsSync(path.join(avatarDir, `${mainName}-avatar.jpg`))) idol.avatar = `/images/idol-avatars/${mainName}-avatar.jpg`;
		if (fs.existsSync(path.join(avatarDir, `${mainName}-avatar-gif.gif`))) idol.avatar = `/images/idol-avatars/${mainName}-avatar-gif.gif`;
		if (!idol.avatar) idol.avatar = `/images/idol-avatars/anonymous.jpg`;

		// 4.3 get pictures
		const picturesDir = path.join(process.cwd(), "database", "idol-pictures");
		for (let i = 1; i <= 10; i++) {
			const picPath = path.join(picturesDir, `${mainName}-${i}.jpg`);
			if (fs.existsSync(picPath)) {
				const picUrl = `/images/idol-pictures/${mainName}-${i}.jpg`;
				if (!idol.pictures) idol.pictures = [];
				idol.pictures.push(picUrl);
			}
		}

		// 4.4 get cover
		const coverDir = path.join(process.cwd(), "database", "idol-pictures");
		if (fs.existsSync(path.join(coverDir, `${mainName}-0.jpg`))) idol.cover = `/images/idol-pictures/${mainName}-0.jpg`;
		if (fs.existsSync(path.join(coverDir, `${mainName}-0.webp`))) idol.cover = `/images/idol-pictures/${mainName}-0.webp`;
		if (!idol.cover) idol.cover = `/images/idol-pictures/anonymous-${generateRandomNumber(0, 10)}.jpg`;

		// 4.5 check alias + representative name
		if (representativeName && representativeName.trim().length > 0) {
			idol.name = representativeName;

			const aliasNames = alias && alias.trim().length > 0
				? alias.split(",").map(e => e.trim())
				: [];
			aliasNames.push(mainName);
			if (alias && alias.trim().length > 0) {
				aliasNames.push(...alias.split(",").map(e => e.trim()));
			}
			idol.alias = Array.from(new Set([aliasNames, ...idol.alias])).join(",");
		}

		// 5. save to db
		// 5.1 save idol
		// console.log('[idol]', idol);
		if (idolFound) {
			if (mainName) await idolDbServices.updateIdolByName(mainName, idol);
			broadcast("actress.updated", "Idol updated: " + mainName, {
				idol: { name: mainName }
			})
		} else {
			await idolDbServices.createIdols([idol]);
			broadcast("actress.created", "Idol added: " + mainName, {
				idol: { name: mainName }
			})
		}

		// 5.3 save idol - movie (s)
		// console.log(idolData?.movies)
		const idolMovies = idolData?.movies
			? idolData.movies.map(movie => ({
				movie_contentId: movie.metadata.content_id,
				movie_code: movie.code,
				idol_name: mainName
			})) : [];
		if (idolMovies.length === 0) console.log('No idol movies to save.');
		else {
			await idolMovieDbServices.createIdolMovies(idolMovies);
		}

		// 5.2 save movie(s)
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
		if (movies.length === 0) console.log('No movies to save.');
		else {
			// console.log('[moviesmovies]', movies.map(e => ({ code: e.code, contentId: e.contentId })));
			const mvs = shuffleArray(movies.map(e => ({ code: e.code, contentId: e.contentId }))).splice(0, 12);
			broadcast("movies", "Movies created/updated: " + movies.length + " movie(s)", {
				movieSamples: mvs,
				totalMoviesCount: movies.length
			})
			await movieDbServices.createMovies(movies);
		}

		// 6. save to cached
		fs.writeFileSync(cachedPath, JSON.stringify({ ...idol, ...idolData }));

		const resultSendback = displayType === "json"
			? JSON.stringify(idol)
			: renderIdolHTMLTemplate(idol, movies);
		res.status(200).send(resultSendback);
	} catch (error) {
		console.log(error);
		res.status(500).send({ errMsg: error.message });
	}
}

async function getPagination(req, res) {
	try {
		const {
			page, pageSize,
			search,
			favorite,
			my_favorite,
			sortBy,
			sortOrder,
		} = req.query;

		const result = await idolDbServices.searchIdolsPaginated({
			page, pageSize,
			search,
			favorite,
			my_favorite: (my_favorite === undefined ? undefined : Number(my_favorite)),
			sortBy,
			sortOrder,
		});

		return res.json(result);
	} catch (err) {
		console.error("[listIdolsPaginated]", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

async function searchIdolsByNameLike(req, res) {
	const { name } = req.query;
	const result = await idolDbServices.searchIdolsByNameLike(name);
	return res.json(result);
}

async function searchIdolByExactName(req, res) {
	const { name } = req.query;
	console.log('[searchIdolByExactName]', name)
	const idolFound = await idolDbServices.searchIdolByName(name);
	const idol = idolFound;
	if (idol) {
		// 4.5 get avatar
		const avatarDir = path.join(process.cwd(), "database", "idol-avatars");
		if (fs.existsSync(path.join(avatarDir, `${idol.name}-avatar.jpg`)))
			idol.avatar = `/images/idol-avatars/${idol.name}-avatar.jpg`;
		if (fs.existsSync(path.join(avatarDir, `${idol.name}-avatar-gif.gif`)))
			idol.avatar = `/images/idol-avatars/${idol.name}-avatar-gif.gif`;
		if (!idol.avatar) idol.avatar = `/images/idol-avatars/anonymous.jpg`;

		// 4.6 get pictures
		const picturesDir = path.join(process.cwd(), "database", "idol-pictures");
		for (let i = 1; i <= 10; i++) {
			const picPath = path.join(picturesDir, `${idol.name}-${i}.webp`);
			if (fs.existsSync(picPath)) {
				const picUrl = `/images/idol-pictures/${idol.name}-${i}.webp`;
				if (!idol.pictures) idol.pictures = [];
				idol.pictures.push(picUrl);
			}
		}

		// 4.7 get cover
		const coverDir = path.join(process.cwd(), "database", "idol-pictures");
		if (fs.existsSync(path.join(coverDir, `${idol.name}-0.webp`)))
			idol.cover = `/images/idol-pictures/${idol.name}-0.webp`;
		if (!idol.cover) idol.cover = `/images/idol-pictures/anonymous-${generateRandomNumber(0, 10)}.webp`;

		// sample movies
		const searchMoviesReq = await idolMovieDbServices.searchMoviesByIdolName(idol.name);

		const moviesCode = searchMoviesReq.data.map(e => e.movie_code);
		const shuffledMoviesCode = shuffleArray(moviesCode.filter(e => e.includes("-"))).slice(0, 8).filter(Boolean);
		const moviesDataReq = await movieDbServices.searchMoviesByCodes(shuffledMoviesCode.join(","));

		const moviesReturn = moviesDataReq.data.map(e => ({ code: e.code, thumb: e.thumbs_short }));
		idol.movies = moviesReturn;
	}
	return res.json(idol);
}

async function searchIdolByMyFavorite(req, res) {
	const LIMIT_DEFAULT = 7;
	const { limit } = req.query;
	const result = await idolDbServices.searchIdolByMyFavorite();

	const maxValue = limit ? parseInt(limit, 10) : null;
	const idolReturn = maxValue && !isNaN(maxValue)
		? shuffleArray(result.data).slice(0, maxValue)
		: shuffleArray(result.data).slice(0, LIMIT_DEFAULT);
	return res.json(idolReturn);
}

async function setMyFavorite(req, res) {
	const { id, myFavValue } = req.body;
	console.log(id, myFavValue)
	let valueUpdate = undefined;
	if (typeof myFavValue === "boolean") valueUpdate = myFavValue === true ? 1 : 0;
	if (typeof myFavValue === "string") valueUpdate = myFavValue === "1" ? 1 : 0;
	if (typeof myFavValue === "number") valueUpdate = myFavValue === 1 ? 1 : 0;
	const updateResult = valueUpdate === undefined
		? false
		: (await idolDbServices.updateIdolById(id, { my_favorite: valueUpdate })) ? true : false;
	res.json({ result: updateResult, valueUpdated: valueUpdate });
}

module.exports = {
	searchIdol,
	getPagination,
	searchIdolByMyFavorite,
	searchIdolsByNameLike,
	searchIdolByExactName,
	setMyFavorite
}