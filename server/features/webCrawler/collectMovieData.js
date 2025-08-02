// Collect data from https://www.javdatabase.com/
const path = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');
const { extractText, extractRawNamesMovie } = require('./webCrawler.utils');
const { default: axios } = require('axios');
const { CACHED_FOLDER, MOVIE_THUMBS_FOLDER } = require('../../constants');
const { downloadImageByUrl } = require('../../helpers');

async function crawlMovie(movieCode) {
	let data = {},
		htmlContentRoot = null;

	const htmlFilePath = path.join(CACHED_FOLDER, movieCode + ".html")
	const url = `https://www.javdatabase.com/movies/${movieCode}/`;
	// await fetch(url, {
	// 	"method": "GET",
	// 	"headers": {
	// 		"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
	// 		"Referrer-Policy": "strict-origin-when-cross-origin"
	// 	},
	// 	"body": null
	// })
	// 	.then(response => {
	// 		console.log('[response]', response);
	// 		return response.text()
	// 	})
	// 	.then((htmlContent) => {
	// 		htmlContentRoot = htmlContent;
	// 		fs.writeFileSync(filePath, htmlContent);
	// 	})
	// 	.catch((err) => console.error(err));
	if (fs.existsSync(htmlFilePath)) {
		console.log("File already exists:", htmlFilePath);
		htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
	} else {
		await axios.get(url, {
			"headers": {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"Referrer-Policy": "strict-origin-when-cross-origin"
			}
		})
			.then(response => {
				if (response.status !== 200) {
					throw new Error(`Failed to fetch data for movie code ${movieCode}. Status: ${response.status}`);
				}
				htmlContentRoot = response.data;
				fs.writeFileSync(htmlFilePath, htmlContentRoot);
			})
			.catch((err) => console.error(err));
	}

	const root = parse(htmlContentRoot);

	//// GET MOVIE DATA
	{
		const dataNode = root.querySelector("div[class='movietable'] > div[class='row']");
		const allTexts = extractText(dataNode);
		const treatedAttr = [];
		mainAttrLoop: for (let i = 0; i < allTexts.length; i++) {
			if (allTexts[i].includes("[*]")) {
				let newAttr = allTexts[i];
				supAttrLoop: for (let j = i + 1; j < allTexts.length; j++) {
					if (allTexts[j].includes("[*]") || allTexts[j] === "View All Favorites" || j === allTexts.length - 1) {
						if (newAttr[newAttr.length - 1] === ",") {
							newAttr = newAttr.slice(0, -1);
						}
						treatedAttr.push(newAttr);
						break supAttrLoop;
					}
					newAttr += allTexts[j] + ",";
				}
			}
		}

		for (let i = 0; i < treatedAttr.length; i++) {
			if (treatedAttr[i].includes("[*]Favorite:")) {
				treatedAttr[i] = treatedAttr[i].replaceAll("Favorite,", "").trim();
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
			// console.log(allTexts)
			const note = allTexts[0] === "(No Ratings Yet)"
				? "(No Ratings Yet)"
				: allTexts.join(" ").replace(")", "").split("average:")[1].replace(" out of ", "/").trim();
			treatedAttr.push("Note: " + note);
			data.note = note;
		}

		// 3. Movie images
		if (!data.images) data.images = [];
		const imageNodes = root?.querySelector("div[id='lightboxModal']").parentNode.querySelector("div[class='container']").firstElementChild.children;
		for (const iNode of imageNodes) {
			const imgHref = iNode.firstElementChild.getAttribute("data-image-href");
			data.images.push(imgHref);
		}

		// 4. Movie thumbs
		if (!data.thumbs) {
			data.thumbs = { cover: "", full: "" };
		}
		const thumbContainer = root?.querySelector("div[id='thumbnailContainer'] > a > img");
		if (thumbContainer) {
			const src = thumbContainer.getAttribute("src");
			data.thumbs.cover = src;
			data.thumbs.full = src.replace("/thumb/", "/full/").replace("ps.webp", "pl.webp");
		}
	}

	//// GET URLS
	{
		if (!data.collectMore) {
			data.collectMore = [];
		}
		const allURLElements = root.querySelectorAll("a");
		const allHrefs = allURLElements?.map(e => e.getAttribute("href"))?.filter(url => {
			if (url === "https://www.javdatabase.com/idols/") return false;
			if (!url.startsWith("https://www.javdatabase.com/idols/")) return false;
			const regCurrentIdol = /https:\/\/www\.javdatabase\.com\/idols\/.*\/\?ipage=[0-9]*/g;
			if (regCurrentIdol.test(url)) return false;
			const regComment = /https:\/\/www\.javdatabase\.com\/idols\/.*\/#comment-[0-9]*/g;
			if (regComment.test(url)) return false;

			return true;
		});

		if (Array.isArray(allHrefs)) {
			const hrefSets = Array.from(new Set(allHrefs));
			data.collectMore = hrefSets;
		}
	}

	//// GET EXTRAS
	{
		const dataNode = root.querySelector("div[class='movietable'] > div[class='row']");
		const rawNames = extractRawNamesMovie(dataNode);
		data = { ...data, ...rawNames };
	}

	// console.log(data);

	// Download movie thumbs
	if (data.thumbs.cover) {
		await downloadImageByUrl(data.thumbs.cover, MOVIE_THUMBS_FOLDER, movieCode + "-thumbs-cover.jpg");
	}
	if (data.thumbs.full) {
		await downloadImageByUrl(data.thumbs.full, MOVIE_THUMBS_FOLDER, movieCode + "-thumbs-full.jpg");
	}
	for (const [idx, imageUrl] of data.images.entries()) {
		await downloadImageByUrl(imageUrl, MOVIE_THUMBS_FOLDER, movieCode + "-image-" + idx + ".jpg");
	}

	const fileJsonPath = path.join(CACHED_FOLDER, movieCode + ".json");
	fs.writeFileSync(fileJsonPath, JSON.stringify(data));
	return data;
}

module.exports = { crawlMovie }

// crawlMovie("cawd-681");