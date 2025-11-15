// Collect data from https://www.javdatabase.com/

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const { sleep, downloadWithRetry, fetchWithRetry, inverseName, downloadImageByUrl } = require("../../helpers")
const { parse } = require('node-html-parser');
const { extractText, extractRawNamesIdol } = require('./webCrawler.utils');
const { CACHED_FOLDER, IDOL_AVATAR_FOLDER, ALBUM_THUMBS_FOLDER } = require('../../constants');
const ProxyRotator = require('../../services/proxy.service');
// const { redirectPageUrl } = require('./captureWorker');

async function checkNameJAVDbExist(name, proxyService) {
	const RETRY_TIMES = 3;
	const lowerCaseName = name.toLowerCase();
	const apiQueryNames = Array.from(new Set([
		lowerCaseName,
		inverseName(lowerCaseName),]
	));

	for (const queryName of apiQueryNames) {
		const url = `https://www.javdatabase.com/idols/${queryName}`;
		const htmlContentRoot = await fetchWithRetry(url, {}, proxyService, RETRY_TIMES);
		if (htmlContentRoot) {
			const root = parse(htmlContentRoot);
			const page404 = root.querySelector("div[class='page-404']");
			if (!page404) {
				return queryName;
			}
		}
	}
	return null;
}

// Page: JAVDatabase
// 1. avatar
// 2. person data
// 3. rating
// 4. favorite
// 5. movies count
// 6. tags
// 7. download avatar
// 8. query name
async function crawlIdolJAVDatabase(name, recrawl = false) {
	console.log("\n[JAVDATABASE]---------------");

	const RETRY_TIMES = 3;
	const data = {};
	let htmlContentRoot = null;
	const proxyService = new ProxyRotator("round-robin");
	console.log('[JAVDATABASE]', name);
	const queryName = name[0] === "_"
		? name.slice(1)
		: await checkNameJAVDbExist(name, proxyService);
	if (!queryName) {
		console.log("❌ JAVDatabase info not found");
		return null;
	}
	console.log("🎉 JAVDatabase info found", queryName);

	const treatedAttr = [];
	await sleep(1000);
	// Get from the second page
	const htmlFilePath = path.join(CACHED_FOLDER, queryName.toLowerCase() + ".html");
	const url = `https://www.javdatabase.com/idols/${queryName}`;
	if (fs.existsSync(htmlFilePath) && !recrawl) {
		console.log("📌 File already exists:", htmlFilePath);
		htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
	} else {
		console.log("🔥 Crawl url:", url);
		htmlContentRoot = await fetchWithRetry(url, {}, proxyService, RETRY_TIMES);
	}

	if (!htmlContentRoot) {
		console.log("Cannot retrieve html content after retry", RETRY_TIMES, "times");
		return null;
	}
	fs.writeFileSync(htmlFilePath, htmlContentRoot);

	// Get the root
	const root = parse(htmlContentRoot);
	if (!root) console.log("root is null");
	if (!data.tags) data.tags = []
	if (!data.queryName) data.queryName = queryName;

	//// COLLECT PROFILE
	// 1. Personal avatar
	data.avatar = "default";
	const avatarImgSrc = root?.querySelector("div[class*='idol-portrait'] img");
	if (avatarImgSrc) {
		data.avatar = avatarImgSrc.getAttribute("src");
	}

	// 2. Personal data
	const modelInfoNode = root?.querySelector("h1[class='idol-name']")?.parentNode;
	if (modelInfoNode) {
		const newHtmlContent = modelInfoNode.innerHTML.replaceAll("\t-", "").replaceAll("\t", "")
		const allTexts = extractText(parse(newHtmlContent));

		treatedAttr.push(allTexts[0]);
		for (let i = 1; i < allTexts.length; i++) {
			if (!allTexts[i].includes("[*]")) continue;

			let newAttr = allTexts[i];
			for (let j = i + 1; j < allTexts.length; j++) {
				if (allTexts[j].includes("[*]") || allTexts[j] === "Suggest Tags" || j === allTexts.length - 1) {
					treatedAttr.push(newAttr);
					break;
				}
				newAttr += allTexts[j];
			}
		}

		for (let i = 0; i < treatedAttr.length; i++) {
			if (i === 0) {
				treatedAttr[i] = "Name:" + treatedAttr[i].replace("- JAV Profile", "").trim();
			}
			if (treatedAttr[i].includes("[*]Tags:")) {
				treatedAttr[i] = treatedAttr[i].replaceAll("-", ",").trim();
			}
			if (treatedAttr[i].includes("[*]JP:")) {
				treatedAttr[i] = treatedAttr[i].replaceAll("-", "").trim();
			}
			const [a, v] = treatedAttr[i].replace("[*]", "").split(":");
			data[a.replace(" ", "_").toLowerCase()] = v;
		}
	}

	// 3. Rating data
	const ratingNode = root?.querySelector("div[class='post-ratings']");
	if (ratingNode) {
		const allTexts = extractText(ratingNode);
		// console.log(allTexts)
		const note = allTexts[0] === "(No Ratings Yet)"
			? "(No Ratings Yet)"
			: allTexts.join(" ").replace(")", "").split("average:")[1].replace(" out of ", "/").trim();
		treatedAttr.push("Note: " + note);
		data.note = note;
	}

	// 4. Favorite count
	const favoriteCountNode = root?.querySelector("span[class='simplefavorite-button-count']");
	if (favoriteCountNode) {
		const allTexts = extractText(favoriteCountNode);
		treatedAttr.push("Favorite: " + allTexts[0]);
		data.favorite = allTexts[0]
	}

	// 5. Movies count
	const biographyNode = root?.querySelector("div[id='biography']");
	if (biographyNode) {
		const allTexts = extractText(biographyNode);
		const fullText = allTexts.map(e => e.trim().replaceAll("\r", "").replaceAll("\t", "").replaceAll("\n", "")).join(" ");
		const bioData = fullText.split(".").map(e => e.trim()).filter(e => e)
		const reg = /(.*) has starred in ([0-9]*) movies/;
		const test = bioData[bioData.length - 1].match(reg);
		treatedAttr.push("Movies count: " + test[2]);
		data.movies_count = test[2]
	}

	// 6. Tags
	const tagsContainerElement = root?.querySelector("h1[class='idol-name']")?.parentNode;
	if (tagsContainerElement) {
		const rawNameTags = extractRawNamesIdol(tagsContainerElement);
		data.tags = rawNameTags;
	}

	console.log('Movies count:', data.movies_count);
	// saveTmpCollectedData(true, data);

	// download idol avatar
	const downloadSuccess = await downloadWithRetry(data.avatar, IDOL_AVATAR_FOLDER, queryName + "-avatar.jpg", proxyService, RETRY_TIMES)
	if (!downloadSuccess) {
		console.log("Idol's avatar downloaded failed.");
	}

	console.log("✅ Page crawled succcessfully!");

	return data;
}

async function checkNameJAVHerExist(name, proxyService) {
	const RETRY_TIMES = 3;
	const lowerCaseName = name.toLowerCase();
	const apiQueryNames = Array.from(new Set([
		lowerCaseName,
		lowerCaseName + "-1",
		inverseName(lowerCaseName),
		inverseName(lowerCaseName) + "-1"]
	));

	for (const queryName of apiQueryNames) {
		const url = `https://javher.com/api/casts/${queryName}?page=0&mode=all`;
		const headers = {
			'Accept': 'application/json',
			'Authorization': 'HAHA_ADAM_HAVE_TO_RESORT_TO_THIS#@!@#',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
			'Cookie': 'user-country=USN'
		}
		const jsonData = await fetchWithRetry(url, headers, proxyService, RETRY_TIMES);
		// console.log('[jsonData]', jsonData);
		const { success, count } = jsonData;
		if (success) {
			console.log("🎉 JAVHer info found", queryName);
			console.log("👀 Number of movie will be collected:", jsonData.count);
			return { queryName: queryName, count: jsonData.count };
		}
	}
	return null;
}
// Page: JAVHer
// 1. movies data
// 2. movies_count
// 3. query name
async function crawlIdolFromJAVHer(name, recrawl = false) {
	console.log("\n[JAVHer]---------------");

	let timeWait = 2000;

	const RETRY_TIMES = 3;
	const data = {};
	const proxyService = new ProxyRotator("random");

	// 1. Detect query name
	const checkResult = name[0] === "_"
		? { queryName: name.slice(1), count: 0 }
		: await checkNameJAVHerExist(name, proxyService);
	if (!checkResult) {
		console.log("❌ JAVHer info not found", name);
		return null;
	}

	const { queryName, count } = checkResult;
	if (count < 200) timeWait = 100;

	// 2. Collect movies
	let pageCount = 0,
		jsonDataString = null,
		jsonData = null,
		localFileExists = false;

	if (!data.movies_count) data.movies_count = 0;
	if (!data.queryName) data.queryName = "";
	if (!data.movies) data.movies = [];

	while (true) {
		try {
			const jsonFilePath = path.join(CACHED_FOLDER, queryName + "_movie_" + pageCount + ".json");
			const url = `https://javher.com/api/casts/${queryName}?page=${pageCount}&mode=all`;
			localFileExists = fs.existsSync(jsonFilePath);
			if (fs.existsSync(jsonFilePath) && !recrawl) {
				console.log("📌 File already exists:", jsonFilePath);
				jsonDataString = fs.readFileSync(jsonFilePath, "utf-8");
				jsonData = JSON.parse(jsonDataString);
			} else {
				console.log("🔥 Fetching api url:", url);
				const headers = {
					'Accept': 'application/json',
					'Authorization': 'HAHA_ADAM_HAVE_TO_RESORT_TO_THIS#@!@#',
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
					'Cookie': 'user-country=USN'
				}
				jsonData = await fetchWithRetry(url, headers, proxyService, RETRY_TIMES);
			}

			if (!jsonData) {
				console.log("Fetch data failed after retry", RETRY_TIMES, "times");
				break;
			}
			if (jsonData) fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData));

			const { success: fetchedSuccess, videos: fetchedVideos, count: moviesCount } = jsonData;
			// console.log('[jsonData]', jsonData);

			if (!fetchedSuccess) {
				console.log("Fetch failed:", jsonData);
				break;
			}

			if (Array.isArray(fetchedVideos) && fetchedVideos.length === 0) {
				console.log("Videos final page reached! Number of videos collected:", jsonData.count);
				break;
			}

			// set query name
			data.queryName = queryName;
			// set movies count
			data.movies_count += parseInt(moviesCount);
			// set movies
			const videos = fetchedVideos.map(m => {
				const releaseDate2 = new Date(m.releaseDate);
				const movieLink = `https://javher.com/api/video/watch-${m.contentId}-${releaseDate2.getTime()}`
				return {
					code: m.dvdId?.toLowerCase(),
					movieLink: movieLink,
					thumbsShort: m.image.replace("pl.", "ps."),
					thumbs: m.image,
					desc: "",
					releaseDate: m.releaseDate.split("T")[0],
					title: m.title,
					genres: null,
					studio: null,
					trailer: null,
					runtime: m.duration + " min",
					favorite: null,
					actress: null,
					note: null,
					metadata: {
						content_id: m.contentId.toLowerCase(),
						jpTitle: m.jpTitle,
						zhTitle: m.zhTitle
					}
				}
			});
			data.movies.push(...videos);

		} catch (error) {
			console.log(jsonData.videos);
			console.error(error);
		} finally {
			pageCount++;
			if (!localFileExists) {
				await sleep(timeWait);// Prevent rushing request call
			}
		}
	}

	// Cache json data
	// const fileJsonPath = path.join(CACHED_FOLDER, name + ".json");
	// fs.writeFileSync(fileJsonPath, JSON.stringify(data));

	console.log("✅ Page crawled succcessfully!");

	return data;
}

// Page: Misskon
async function crawlModelFromMisskon(name, recrawl = false) {
	const RETRY_TIMES = 3;

	const lowerCaseName = name.toLowerCase();
	const data = {};
	const CATEGORY_TAGS = [
		'mtcos', 'bololi', 'candy',
		'feilin', 'ftoow', 'girlt',
		'huayan', 'huayang', 'imiss',
		'ishow', 'jvid', 'kelagirls',
		'kimoe', 'legbaby', 'limerence原创',
		'mf', 'mfstar', 'miitao',
		'mintye', 'missleg', 'mistar',
		'mtmeng', 'mygirl', 'partycat',
		'qingdouke', 'ruisg', 'slady',
		'taste', 'tgod', 'toutiao',
		'tuigirl', 'tukmo', 'ugirls',
		'ugirls-ai-you-wu-app', 'ugirls-app', 'uxing',
		'wings', 'xiaoyu', 'xingyan',
		'xiuren', 'xr-uncensored', 'youmei',
		'youmi', 'youmiapp', 'youwu',
		'她们印象', '精选街拍作品', 'ag',
		'bimilstory', 'bluecake', 'creamsoda',
		'djawa', 'espacia-korea', 'fantasy-factory',
		'fantasy-story', 'glamarchive', 'haivia',
		'high-fantasy', 'kimlemon', 'kirei',
		'kisia', 'korean-realgraphic', 'le',
		'lilynah', 'lookas', 'loozy',
		'makemodel', 'moon-night-snap', 'paranhosu',
		'photochips', 'pure-media', 'pussylet',
		'saint-photolife', 'sera', 'sweetbox',
		'uhhung-magazine', 'umizine', 'wxy-ent',
		'yo-u', 'ai-generated', 'cosplay',
		'jp', 'jvid', 'otherxxx',
		'patreon', 'private-photoshoot'
	];

	let timeWait = 2000;

	const proxyService = new ProxyRotator("round-robin");
	console.log('[MISSKON]', name);

	let htmlContentRoot = null,
		localFileExists = false,
		fileExisted = false,
		pageCount = 1;
	while (true) {
		try {
			const htmlFilePath = path.join(CACHED_FOLDER, lowerCaseName + "_coser_misskon_" + pageCount + ".html");
			const url = `https://misskon.com/tag/${lowerCaseName}/page/${pageCount}`;
			localFileExists = fs.existsSync(htmlFilePath);
			if (fs.existsSync(htmlFilePath) && !recrawl) {
				console.log("📌 File already exists:", htmlFilePath);
				fileExisted = true;
				htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
			} else {
				console.log("🔥 Crawl url:", url);
				fileExisted = false;
				htmlContentRoot = await fetchWithRetry(url, {}, proxyService, RETRY_TIMES);
			}

			if (!htmlContentRoot) {
				console.log("Cannot retrieve html content after retry", RETRY_TIMES, "times");
				return null;
			}

			if (fileExisted) console.log("✂️ Override file path:", htmlFilePath);
			fs.writeFileSync(htmlFilePath, htmlContentRoot);

			// Get the root
			const root = parse(htmlContentRoot);
			if (!root.albums) root.albums = [];

			const title = root.querySelector("title");
			const pageNotFound = title.innerText === "404 | Lost in the Shadows";
			if (pageNotFound) {
				console.log("Reach end of pages. End!");
				break;
			}

			const titleElement = root.querySelector("h1[class='page-title']")?.querySelector("span");
			data.name = titleElement.innerText;

			if (!data.albums) data.albums = [];
			const articles = root.querySelectorAll("article[class='item-list']");
			for (const article of articles) {
				const articleData = {
				};

				// Title + Post url
				const postTitle = article.querySelector("h2.post-box-title > a");
				articleData.postUrl = postTitle.getAttribute("href");
				articleData.title = postTitle.innerText;

				// Thumbs
				const thumbUrl = article.querySelector("div[class='post-thumbnail'] > a > img");
				// Thumb url
				articleData.thumbUrl = thumbUrl.getAttribute("data-src");
				// Id (base on thumbs url)
				articleData.id = createIdFromString(articleData.thumbUrl).slice(0, 16);
				// Thumb name
				articleData.thumbName = articleData.id + "-thumbs-full.jpg";

				try {
					console.log(articleData.thumbUrl)
					console.log(articleData.thumbUrl)
					console.log(articleData.thumbUrl)
					await downloadImageByUrl(articleData.thumbUrl, ALBUM_THUMBS_FOLDER, articleData.thumbName);
				} catch (error) {
					console.log(error)
				}

				// Tags
				const tagElements = article.querySelectorAll("span[class='post-cats'] > a[rel='tag']");
				const tagsVal = tagElements.map(e => {
					return e?.getAttribute("href")?.replace("https://misskon.com/tag/", "").replace("/", "")
				})
				articleData.tags = tagsVal;
				// console.log('[tagsVal]', tagsVal.filter(e => !CATEGORY_TAGS.includes(e)));
				// console.log(articleData);

				data.albums.push(articleData);
			}
		} catch (error) {
			console.error(error);
		} finally {
			pageCount++;
			if (!fileExisted) {
				await sleep(timeWait);// Prevent rushing request call
			}
		}
	}

	console.log("✅ Page crawled succcessfully!");

	// Cache json data
	// const fileJsonPath = path.join(CACHED_FOLDER, name + ".json");
	// fs.writeFileSync(fileJsonPath, JSON.stringify(data));

	return data;
}

function createIdFromString(inputString) {
	// Choose a hashing algorithm (e.g., 'sha256', 'md5', 'sha1')
	// SHA256 is generally recommended for security and collision resistance.
	const hash = crypto.createHash('sha256');

	// Update the hash with the input string
	hash.update(inputString);

	// Get the hexadecimal representation of the hash
	return hash.digest('hex');
}

module.exports = {
	crawlIdolJAVDatabase,
	crawlIdolFromJAVHer,
	crawlModelFromMisskon
}

// crawlIdolJAVDatabase("yuina-taki").then(res => { console.log('[res]', res); }).catch(err => { console.log('[err]', err); })
// crawlIdolFromJAVHer("taki-yuina").then(res => { console.log('[res]', res.queryName); }).catch(err => { console.log('[err]', err); })
// crawlModelFromMisskon("byoru").then(res => { console.log('[res]', res); }).catch(err => { console.log('[err]', err); })