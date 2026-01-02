const fs = require("fs");
const { IDOL_AVATAR_FOLDER } = require("../constants");
const { crawlIdolFromJJGirl } = require("../features/jjgirls/jjgirls.utils");
const { crawlIdolJAVDatabase, crawlIdolFromJAVHer } = require("../features/webCrawler/collectIdolData");
const { downloadImageByUrl } = require("../helpers");

async function setAvatar(imgUrl, idolName) {
	return downloadImageByUrl(imgUrl, IDOL_AVATAR_FOLDER, idolName);
}

async function crawlIdolByName({ name_jdb, name_jher, name_jjg }, recrawl = true) {
	// crawlpage: jjgirls.com(html), www.javdatabase.com(html), javher.com(api)
	let data = {};
	{
		const crawledFromJAVDb = await crawlIdolJAVDatabase(name_jdb, recrawl);
		const javdbQueryName = crawledFromJAVDb?.queryName ?? name_jdb.trim.replace("_", "");
		data = {
			alias: crawledFromJAVDb?.alt?.trim()?.toLowerCase()?.split(",").map(e => e.trim().replace(" ", "-")),
			name: javdbQueryName,
			dob: crawledFromJAVDb?.dob,
			measurements: crawledFromJAVDb?.measurements,
			height: crawledFromJAVDb?.height,
			country: crawledFromJAVDb?.birthplace,
			cup: crawledFromJAVDb?.cup,
			movies_count: crawledFromJAVDb?.movies_count,
			note: crawledFromJAVDb?.note,
			favorite: crawledFromJAVDb?.favorite,
			my_favorite: 0,
			jp: crawledFromJAVDb?.jp,
			created_time: Date.now(),
			updated_time: Date.now(),
			metadata: crawledFromJAVDb ? {
				javdbQueryName: javdbQueryName,
				avatar: crawledFromJAVDb.avatar,
				age: crawledFromJAVDb.age,
				debut: crawledFromJAVDb.debut,
				sign: crawledFromJAVDb.sign,
				blood: crawledFromJAVDb.blood,
				shoe_size: crawledFromJAVDb.shoe_size,
				hair_length: crawledFromJAVDb['hair_length(s)'],
				hair_color: crawledFromJAVDb['hair_color(s)'],
				tags: crawledFromJAVDb.tags
					? crawledFromJAVDb.tags.map(tag => tag.name + ":" + tag.value).join("|")
					: "",
			} : {}
		}
		console.log('[javdbQueryName]', data)
		fs.writeFileSync("test/samples/javdb.json", JSON.stringify(crawledFromJAVDb));
	}

	{
		name_jher = [...data.alias, name_jher].join("|");
		const crawledFromJAVHer = await crawlIdolFromJAVHer(name_jher, recrawl);
		if (crawledFromJAVHer) {
			data = {
				...data,
				movies_count: crawledFromJAVHer?.movies?.length ?? 0,
				movies: crawledFromJAVHer?.movies ?? [],
				metadata: crawledFromJAVHer
					? {
						...data.metadata,
						javherQueryName: crawledFromJAVHer.queryName
					}
					: { ...data.metadata }
			}
			const showupData = JSON.parse(JSON.stringify(crawledFromJAVHer));
			delete showupData.movies;
			// console.log('[JAVHER]', '[fetchedData]', data);

			fs.writeFileSync("test/samples/javher.json", JSON.stringify(crawledFromJAVHer));
		}
	}

	{
		const crawledFromJJGirl = await crawlIdolFromJJGirl(name_jjg, recrawl);
		if (crawledFromJJGirl) {
			data.metadata = {
				...data.metadata,
				jjGirlQueryName: crawledFromJJGirl?.queryName,
				jjGirlImg: {
					imageIndex: crawledFromJJGirl?.imageIndex ?? 0,
					folderIndex: crawledFromJJGirl?.folderIndex ?? 0
				}
			}
			fs.writeFileSync("test/samples/jjgirl.json", JSON.stringify(crawledFromJJGirl));
		}
	}

	if (!data.metadata.javdbQueryName && !data.metadata.javherQueryName && !data.metadata.jjGirlQueryName) {
		return null;
	}

	{
		const aliasSet = new Set([data.metadata?.javdbQueryName, data.metadata?.javherQueryName, data.metadata?.jjGirlQueryName].filter(Boolean));
		const alias = Array.from(aliasSet).join(",");
		data.alias = alias;
	}

	const showupData = JSON.parse(JSON.stringify(data));
	delete showupData.movies;
	// console.log('[data]', showupData);

	// fs.writeFileSync(`test/samples/data_${name_jdb}.json`, JSON.stringify(data));

	data.metadata = JSON.stringify(data.metadata);
	// console.log('[data]', data.metadata);
	return data;
}

module.exports = { crawlIdolByName, setAvatar }