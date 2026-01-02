// Collect data from https://www.javdatabase.com/
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');
const { extractText, extractDataFromHref } = require('./webCrawler.utils');
const { parseDocument } = require('htmlparser2');
const { selectOne } = require('css-select');
const render = require("dom-serializer").default;
const { CACHED_FOLDER, MOVIE_THUMBS_FOLDER } = require('../../constants');
const { downloadImageByUrl, fetchWithRetry, classifyThumbsType, classifyPosterType, downloadMovieByUrl } = require('../../helpers');
const ProxyRotator = require('../../services/proxy.service');

const REDOWNLOAD = false;
const RETRY_TIMES = 3;

async function crawlMovie(movieInfo, recrawl = false) {
	const { code, url } = movieInfo;
	let data = null, htmlContentRoot = null;

	const proxyService = new ProxyRotator("random");

	crawledJAVDatabse: {
		if (code.startsWith("_")) break crawledJAVDatabse;

		const htmlFilePath = path.join(CACHED_FOLDER, code.toLowerCase() + ".html");
		if (!REDOWNLOAD && fs.existsSync(htmlFilePath)) {
			console.log("📌 File already exists:", htmlFilePath);
			htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
		} else {
			console.log("🔥 Gonna crawl from url:", url);
			htmlContentRoot = await fetchWithRetry(url, {}, proxyService, RETRY_TIMES);
		}

		if (htmlContentRoot) {
			if (!data) data = {};

			fs.writeFileSync(htmlFilePath, htmlContentRoot);

			const root = parse(htmlContentRoot);

			let contentId = "";
			const metaImageCoverElement = root.querySelector("meta[property='og:image']");
			if (metaImageCoverElement) {
				const content = metaImageCoverElement.getAttribute("content");
				const contentSegs = content.split("/");
				contentId = contentSegs[contentSegs.length - 2]
			}

			if (!contentId) {
				throw new Error("Content id cannot be detected. Please verify!")
			}

			//// GET MOVIE DATA
			let dataNode = root.querySelector("#main > .entry-content");
			if (!dataNode) {
				console.log("dataNode element cannot parse -> using trick")
				const dom = parseDocument(htmlContentRoot);
				const entryContentEle = selectOne('#main', dom);
				const row = selectOne('.entry-content', entryContentEle);
				dataNode = parse(render(row));
			}
			const allTexts = extractText(dataNode);

			const treatedAttr = [];
			for (let i = 0; i < allTexts.length; i++) {
				if (allTexts[i].includes("[*]")) {
					let newAttr = allTexts[i];
					for (let j = i + 1; j < allTexts.length; j++) {
						if (allTexts[j].includes("[*]") || allTexts[j] === "View All Favorites" || j === allTexts.length - 1) {
							if (newAttr[newAttr.length - 1] === ",") {
								newAttr = newAttr.slice(0, -1);
							}
							treatedAttr.push(newAttr);
							break;
						}
						newAttr += allTexts[j] + ",";
					}
				}
			}

			for (let i = 0; i < treatedAttr.length; i++) {
				if (treatedAttr[i].includes("[*]Title:")) {
					treatedAttr[i] = treatedAttr[i].replaceAll("Title,", "").replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
				}
				if (treatedAttr[i].includes("[*]Favorite:")) {
					treatedAttr[i] = treatedAttr[i].replace("Favorite,", "").replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
				}
				if (treatedAttr[i].includes("[*]Idol(s)/Actress(es)")) {
					treatedAttr[i] = "[*]Actress(es):" + treatedAttr[i].split(":")[1];
				}
				// // treatedAttr[i] = treatedAttr[i].replace("[*]", "")
				const [a, v] = treatedAttr[i].replace("[*]", "").split(":");
				data[a.replace(" ", "_").toLowerCase()] = v;
			}

			// delete
			delete data['genre(s)'];
			delete data['actress(es)'];

			// 2. Rating data
			const ratingNode = root?.querySelector("div[class='post-ratings']");
			if (ratingNode) {
				const allTexts = extractText(ratingNode);
				const noRatingText = allTexts[0].replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
				// console.log(allTexts)
				const note = noRatingText === "(No Ratings Yet)"
					? noRatingText
					: allTexts.join(" ").replace(")", "").split("average:")[1].replace(" out of ", "/").trim();
				treatedAttr.push("Note: " + note);
				data.note = note;
			}

			// // 3. Movie thumbs
			// if (!data.thumbs) {
			//     console.log('[url]', url);
			//     if (url.startsWith("https://pics.r18.com/") || url.startsWith("https://pics.dmm.co.jp/")) {
			//         data.thumbs = {
			//             cover: `https://pics.dmm.co.jp/digital/video/${data.content_id}/${data.content_id}ps.jpg`,
			//             full: `https://pics.dmm.co.jp/digital/video/${data.content_id}/${data.content_id}pl.jpg`
			//         };
			//     }
			//     // https://image.mgstage.com/images/prestige/abf/189/pf_e_abf-189.jpg
			//     if (url.startsWith("https://image.mgstage.com/")) {
			//         data.thumbs = {
			//             // cover: url.replace("/pb_", "/pf_"),
			//             cover: url.replace("/pb_e_", "/pf_o1_"),
			//             full: url
			//         };
			//     }
			// }
			// // 3.1 Video thumbs for uncensored video
			// const videoThumbContainer = root?.querySelector("video");
			// if (videoThumbContainer) {
			//     const src = videoThumbContainer.getAttribute("poster");
			//     if (!data.thumbs.cover) data.thumbs.cover = src;
			//     if (!data.thumbs.full) data.thumbs.full = src;
			// }

			// get data from all page hrefs
			data = { ...data, ...extractDataFromHref(dataNode) };
		} else {
			console.log("Cannot retrieve html content. Attempt to fetch API.");
		}
	}

	// console.log('[data_movie]', data);
	let paramCode = "";
	if (data?.content_id && data?.release_date) {
		paramCode = `${data.content_id}-${(new Date(data.release_date)).getTime()}`
	}
	if (code.startsWith("_")) {
		paramCode = code.slice(1);
	}

	if (!paramCode) {
		console.log("Cannot detect movie code. Return.");
		return null;
	}

	//// FETCH DATA FROM JAVHER
	const apiUrl = `https://javher.com/api/video/watch-${paramCode}`;
	let jsonDataString = null,
		jsonData = null,
		// jsonFilePath = path.join(CACHED_FOLDER, code.toLowerCase() + "_javher.json");
		jsonFilePath = path.join(CACHED_FOLDER, paramCode + "_javher.json");
	// let tmpCode2FilePath = path.join(CACHED_FOLDER, code2.toLowerCase() + "_javher.json");

	console.log(jsonFilePath, recrawl)
	if (fs.existsSync(jsonFilePath) && !recrawl) {
		console.log("📌 File already exists:", jsonFilePath);
		jsonDataString = fs.readFileSync(jsonFilePath, "utf-8");
		jsonData = JSON.parse(jsonDataString);
	} else {
		console.log("🔥 Fetching api url:", apiUrl);
		const headers = {
			'Accept': 'application/json',
			'Authorization': 'HAHA_ADAM_HAVE_TO_RESORT_TO_THIS#@!@#',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
			'Cookie': 'user-country=USN'
		}
		jsonData = await fetchWithRetry(apiUrl, headers, proxyService, RETRY_TIMES);
	}

	if (!jsonData) {
		console.log("Fetch data failed after retry", RETRY_TIMES, "times");
	}

	const { success: fetchedSuccess, video: fetchedVideo } = jsonData;
	if (fetchedSuccess) {
		if (!data) data = {};

		jsonFilePath = path.join(CACHED_FOLDER, paramCode + "_javher.json")
		// jsonFilePath = path.join(CACHED_FOLDER, fetchedVideo.dvdId.toLowerCase() + "_javher.json")
		fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData));

		data.title = fetchedVideo.title;
		data.jav_series = "";
		data.dvd_id = fetchedVideo.dvdId.toLowerCase();
		data.content_id = fetchedVideo.contentId.toLowerCase();
		data.release_date = fetchedVideo.releaseDate.split("T")[0];
		data.runtime = fetchedVideo.duration + " min.";
		data.studio = {
			raw: fetchedVideo.studio?.slug,
			name: fetchedVideo.studio?.name,
		}
		data.director = fetchedVideo.director;
		data.favorite = "0";
		data.note = "";
		data.thumbs = classifyPosterType(fetchedVideo.image);

		if (!data.images) data.images = [];
		data.images.push(...fetchedVideo.gallery.map(url => {
			const { full } = classifyThumbsType(url);
			return full;
		}));
		data.genres = fetchedVideo.categories.map(cat => ({
			raw: cat.slug,
			name: cat.name
		}));
		data.idols = fetchedVideo.casts.map(idol => ({
			raw: idol.slug,
			name: idol.name
		}));
		data.images = Array.from(new Set(data.images));// remove dups
	}

	//// DOWNLOAD MEDIAS
	// 1. download cover
	if (Array.isArray(data.thumbs.cover) && data.thumbs.cover.length > 0) {
		//https://image.mgstage.com/images/prestige/abf/189/pf_o1_abf-189.jpg
		for (const url of data.thumbs.cover) {
			const succ = await downloadImageByUrl(url, MOVIE_THUMBS_FOLDER, data.content_id + "-thumbs-cover.jpg");
			if (succ) break;
		}
	}
	// 2. download poster
	if (data.thumbs.full) {
		//https://image.mgstage.com/images/prestige/abf/189/pb_e_abf-189.jpg
		await downloadImageByUrl(data.thumbs.full, MOVIE_THUMBS_FOLDER, data.content_id + "-thumbs-full.jpg");
	}
	// 3. download full thumbs
	for (const [idx, imageUrl] of data.images.entries()) {
		const ext = imageUrl.split(".").pop();
		const fileName = `${data.content_id}jp-${idx}.${ext}`;
		await downloadImageByUrl(imageUrl, MOVIE_THUMBS_FOLDER, fileName);
	}
	// 4. download cover thumbs
	const coverThumbs = fetchedVideo.gallery.map(url => {
		const { cover } = classifyThumbsType(url);
		return cover;
	})
	for (const [idx, imgsCover] of coverThumbs.entries()) {
		for (const imgCover of imgsCover) {
			const ext = imgCover.split(".").pop();
			const fileName = `${data.content_id}-${idx}.${ext}`;
			const succ = await downloadImageByUrl(imgCover, MOVIE_THUMBS_FOLDER, fileName);
			if (succ) continue;
		}
	}
	// 5. download preview video
	let preVideoDownloadSuccess = false;
	const uncensoredVideoUrl = 'https://fourhoi.com/#DVD_ID#-uncensored-leak/preview.mp4';
	const normalVideoUrl = 'https://fourhoi.com/#DVD_ID#/preview.mp4';
	const engDubVideoUrl = 'https://fourhoi.com/#DVD_ID#-english-subtitle/preview.mp4';

	const hostTemplates = [uncensoredVideoUrl, normalVideoUrl, engDubVideoUrl]
	let videoFileName = "";
	for (const host of hostTemplates) {
		const url = host.replace("#DVD_ID#", data.dvd_id.toLowerCase());
		try {
			videoFileName = data.content_id + "-preview.mp4";
			await downloadMovieByUrl(url, MOVIE_THUMBS_FOLDER, videoFileName, 20_000);
			preVideoDownloadSuccess = true;
			break;
		} catch (err) {
			console.log("❌ Download preview error:", err?.message || String(err), ". Try next host:", url);
		}
	}
	if (preVideoDownloadSuccess) {
		console.log("✅🎬 Downloaded", videoFileName);
	} else {
		console.log("❌ Download failed or video not found:", videoFileName);
	}

	// console.log('[fullData]', data);
	const fileName = paramCode + ".json";
	const fileJsonPath = path.join(CACHED_FOLDER, fileName);
	fs.writeFileSync(fileJsonPath, JSON.stringify(data));
	return data;
}

// download_preview.js
// Node 18+ (uses built-in fetch). Run: node download_preview.js 12345 ./downloads

// const streamPipeline = promisify(pipeline);
// const DEFAULT_TIMEOUT_MS = 30_000;

// async function executeForTest(data) {
// 	const uncensoredVideoUrl = 'https://fourhoi.com/#DVD_ID#-uncensored-leak/preview.mp4';
// 	const normalVideoUrl = 'https://fourhoi.com/#DVD_ID#/preview.mp4';
// 	const engDubVideoUrl = 'https://fourhoi.com/#DVD_ID#-english-subtitle/preview.mp4';

// 	const hosts = [uncensoredVideoUrl, normalVideoUrl, engDubVideoUrl]
// 	for (const host of hosts) {
// 		const url = host.replace("#DVD_ID#", data.dvd_id.toLowerCase());
// 		try {
// 			const fileName = data.dvd_id + "-preview.mp4";
// 			const { bytes } = await downloadMovieByUrl(url, MOVIE_THUMBS_FOLDER, fileName, 20_000);
// 			return { success: true, url, bytes };
// 		} catch (err) {
// 			console.log("Download preview error:", err?.message || String(err));
// 			// errors.push({ host, error: err?.message || String(err) });
// 			// Try next host
// 		}
// 	}
// }

// executeForTest({ dvd_id: "IPX-342" });

module.exports = { crawlMovie }

//C:\Users\TRUNG\Documents\CSProjects\Nodejs\my-app\server\database
//C:\Users\TRUNG\Documents\CSProjects\Nodejs\my-app\database\movie-thumbs