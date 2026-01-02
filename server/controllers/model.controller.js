const fs = require("fs");
const path = require("path");
const crypto = require('crypto');

const modelCrawlingServices = require("../services/model.service.crawl");
const modelDbServices = require("../services/model.service.database");
const modelAlbumDbServices = require("../services/modelAlbum.service.database");
const albumDbServices = require("../services/album.service.database");

const { parseIdolName, renderIdolHTMLTemplate, shuffleArray, generateRandomNumber } = require("../helpers");

async function searchModel(req, res) {
	try {
		console.log('[req.body]', req.body);
		const { name, updateRecord, reuseSavedFile, displayType } = req.body;

		const mainName = parseIdolName(name).replace("_", "");// REMOVE UNDER_SCORE

		// 1. search in db
		const modelsFound = await modelDbServices.searchModelByName(name);
		// 2. if has => return
		if (modelsFound.err) {
			throw new Error(err.message);
		}

		if (modelsFound.data.length > 0 && !updateRecord) {
			const searchAlbumReq = await modelAlbumDbServices.searchAlbumByModelName(name);

			const albumsId = searchAlbumReq.map(e => e.id);
			const albumsIdShuffled = shuffleArray(albumsId.filter(e => e.includes("-"))).slice(0, 8).filter(Boolean);
			const albumsIdShullfedReq = await albumDbServices.searchAlbumByIds(albumsIdShuffled.join(","));

			const albumsReturn = displayType !== "json"
				? albumsId
				: albumsIdShullfedReq.data.map(e => ({ id: e.id, thumb: e.thumbs_short }));

			const jsonDataReturn = {
				...modelsFound.data[0],
				albums: albumsReturn
			}

			// 4.5 get avatar
			const avatarDir = path.join(process.cwd(), "database", "model-avatars");
			if (fs.existsSync(path.join(avatarDir, `${mainName}-avatar.jpg`))) jsonDataReturn.avatar = `/images/model-avatars/${mainName}-avatar.jpg`;
			if (fs.existsSync(path.join(avatarDir, `${mainName}-avatar-gif.gif`))) jsonDataReturn.avatar = `/images/model-avatars/${mainName}-avatar-gif.gif`;
			if (!jsonDataReturn.avatar) jsonDataReturn.avatar = `/images/model-avatars/anonymous.jpg`;

			// 4.6 get pictures
			const picturesDir = path.join(process.cwd(), "database", "model-pictures");
			for (let i = 1; i <= 10; i++) {
				const picPath = path.join(picturesDir, `${mainName}-${i}.jpg`);
				if (fs.existsSync(picPath)) {
					const picUrl = `/images/model-pictures/${mainName}-${i}.jpg`;
					if (!jsonDataReturn.pictures) jsonDataReturn.pictures = [];
					jsonDataReturn.pictures.push(picUrl);
				}
			}

			// 4.7 get cover
			const coverDir = path.join(process.cwd(), "database", "model-pictures");
			if (fs.existsSync(path.join(coverDir, `${mainName}-0.jpg`))) jsonDataReturn.cover = `/images/model-pictures/${mainName}-0.jpg`;
			if (fs.existsSync(path.join(coverDir, `${mainName}-0.webp`))) jsonDataReturn.cover = `/images/model-pictures/${mainName}-0.webp`;
			if (!jsonDataReturn.cover) jsonDataReturn.cover = `/images/model-pictures/anonymous-${generateRandomNumber(0, 10)}.jpg`;

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

		let modelData = null;
		if (exist && reuseSavedFile) {
			const d = fs.readFileSync(cachedPath, "utf-8");
			modelData = JSON.parse(d);
		} else {
			modelData = await modelCrawlingServices.crawlModelByName(name, updateRecord && !reuseSavedFile);
		}

		const model = {
			name: mainName,
			alias: Array.from(new Set([mainName, modelData.name])).join(","),
			albums_count: modelData.albums.length,
			created_time: Date.now(),
			updated_time: Date.now()
		}
		// console.log('[model]', model);

		//bdb7949c382587ee
		const albums = modelData.albums.map(e => ({
			id: e.id,
			title: e.title,
			thumbs_short: e.thumbUrl,
			thumbs: e.thumbUrl,
			created_time: Date.now(),
			updated_time: Date.now()
		}))
		// console.log('[albums]', albums);

		const modelAlbums = albums.map(a => ({
			album_id: a.id,
			model_name: name.toLowerCase()
		}))
		// console.log('[modelAlbums]', modelAlbums);

		// const thumbsName = albums.map(a => a.id);

		// 5. save to db
		// 5.1 save model
		console.log('[modelsFound]', modelsFound)
		if (modelsFound.data.length > 0) {
			if (mainName) await modelDbServices.updateModelByName(name, model);
		} else {
			await modelDbServices.createModels([model]);
		}

		// 5.2 save album(s)
		if (albums.length === 0) console.log('No album to save.');
		else {
			await albumDbServices.createAlbums(albums);
		}

		// 5.3 save model - album (s)
		if (modelAlbums.length === 0) console.log('No model album to save.');
		else {
			await modelAlbumDbServices.createModelAlbum(modelAlbums);
		}
		console.log('[mainName]', mainName, name)

		let resultSendback = displayType === "json"
			? JSON.stringify(modelData)
			: renderIdolHTMLTemplate(modelData, movies);
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
			search,
			my_favorite,
			sortBy,
			sortOrder,
		} = req.query;

		const result = await modelDbServices.searchModelsPaginated({
			page, pageSize,
			search,
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

// searchModel({ body: { name: "byoru" } })

module.exports = { searchModel, getPagination }