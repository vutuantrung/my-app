
const fs = require("fs");
const path = require("path");

const axios = require("axios");
const { HttpsProxyAgent } = require("https-proxy-agent");

const { parse } = require('node-html-parser');
const { sleep, generateRandomNumber, inverseName, fetchWithRetry } = require("../../helpers");
const { CACHED_FOLDER } = require('../../constants');
const ProxyRotator = require("../../services/proxy.service");

const BASE_IMAGE_TEMPLATE = 'https://jjgirls.com/japanese/#NAME#/#FOLDER#/#NAME#-#INDEX#.jpg';
const RETRY_TIMES = 3;

async function checkNameExist(name, proxyService = null) {
	const lowerCaseName = name.toLowerCase();
	const apiQueryNames = Array.from(new Set([lowerCaseName, inverseName(lowerCaseName)]));
	for (const queryName of apiQueryNames) {
		const firstImgUrl = BASE_IMAGE_TEMPLATE
			.replaceAll('#NAME#', queryName)
			.replaceAll('#FOLDER#', 1)
			.replaceAll('#INDEX#', 1);
		const isUrlValid = await isValidImageURL(firstImgUrl, proxyService);
		// console.log('[firstImgUrl]', firstImgUrl, isUrlValid);
		if (isUrlValid) {
			return queryName;
		}
	}
	return null;
}

async function crawlIdolFromJJGirl(name, recrawl = false) {
	console.log("\n[JJGIRL]---------------", name);

	let htmlContentRoot = null, folderIndex = -1, imgIndex = -1;

	const proxyService = new ProxyRotator("random");

	const queryName = name[0] === "_"
		? name.slice(1)
		: await checkNameExist(name, proxyService);
	if (!queryName) {
		console.log("❌ JJGirl info not found", queryName);
		return null;
	}
	console.log("🎉 JJGirl info found", queryName);

	const htmlFilePath = path.join(CACHED_FOLDER, queryName + "_jjgirl" + ".html");
	if (fs.existsSync(htmlFilePath) && !recrawl) {
		console.log("📌 File already exists:", htmlFilePath);
		htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
	} else {
		console.log("🔥 Gonna crawl from jjgirl url idol:", queryName);
		const url = `https://jjgirls.com/japanese/${queryName}/1/`;
		htmlContentRoot = await fetchWithRetry(url, {}, proxyService, RETRY_TIMES);
		// console.log('[htmlContentRoot]', htmlContentRoot);
		// const fetchRes = await axios.get(`https://jjgirls.com/japanese/${queryName}/1/`);
		// if (fetchRes.status !== 200) {
		//     throw new Error(`Failed to fetch data for model ${queryName}. Status: ${fetchRes.status}`);
		// }

		// htmlContentRoot = fetchRes.data;
		fs.writeFileSync(htmlFilePath, htmlContentRoot);
	}

	if (!htmlContentRoot) {
		return null;
	}

	// Get the root
	const root = parse(htmlContentRoot);

	const matchLinksElement = root.querySelector("div[class='matchlinks']");
	for (const page of matchLinksElement.children) {
		// console.log(page.innerText);
		if (page.innerText === "Last") {
			const hrefElementSegs = page.getAttribute("href").split("/").filter(Boolean);
			const lastIndex = hrefElementSegs[hrefElementSegs.length - 1];
			folderIndex = lastIndex;
		}
	}

	if (folderIndex === -1) {
		console.log("❌ Cannot find folder index");
		return null;
	}

	// Get last image index
	// let newImageUrl = BASE_IMAGE_TEMPLATE
	// 	.replaceAll('#NAME#', queryName)
	// 	.replaceAll('#FOLDER#', folderIndex.toString())
	// 	.replaceAll('#INDEX#', "12");
	// if (await isValidImageURL(newImageUrl, proxyService)) {
	// 	imgIndex = 12;
	// } else {
	// 	for (let i = 1; i <= 11; i++) {
	// 		let newImageUrl = BASE_IMAGE_TEMPLATE
	// 			.replaceAll('#NAME#', queryName)
	// 			.replaceAll('#FOLDER#', folderIndex.toString())
	// 			.replaceAll('#INDEX#', i.toString());
	// 		isImage = await isValidImageURL(newImageUrl, proxyService);
	// 		await sleep(1000);

	// 		if (isImage) {
	// 			imgIndex = i;
	// 			break;
	// 		}
	// 	}
	// }

	console.log(`✅ Page crawled succcessfully!`);

	return { queryName: queryName, folderIndex: parseInt(folderIndex), imageIndex: 12 }
}

async function isValidImageURL(url, proxyService = null) {
	try {
		let currentAxiosService = axios;
		if (proxyService) {
			const client = proxyService.axiosForNextProxy({
				headers: {
					"Accept": "image/*, */*;q=0.5",
					"User-Agent": "axios-image-check/1.0",
					// Add only if needed:
					// "Referer": "https://your-site.example/",
					// "Cookie": "session=abc123; ..."
				}
			});

			currentAxiosService = client;
		}
		const response = await currentAxiosService.head(url, {
			timeout: 5000, // ms
			validateStatus: status => status < 500, // accept 4xx to analyze failures
		}).catch(() => null);

		const is404Redirected = response?.request.path.includes("404.Not.Found.svg");
		const contentType = response?.headers['content-type'];
		const isImage = contentType && contentType.startsWith('image/');
		const statusOK = response?.status >= 200 && response?.status < 300;

		return isImage && statusOK && !is404Redirected;
	} catch (err) {
		console.error('Error checking image:', err.message);
		return false;
	}
}

// async function isValidImageURLWithProxy(url, proxyService) {
//     const head = await client.head(url).catch(() => null);
//     if (head && head.status < 400) {
//         const ct = String(head.headers["content-type"] || "").toLowerCase();
//         if (ct.startsWith("image/")) return { ok: true, contentType: ct };
//     }
//     const res = await client.get(url, { responseType: "stream" });
//     const ct = String(res.headers["content-type"] || "").toLowerCase();

//     return { ok: ct.startsWith("image/"), contentType: ct || "unknown" };
// }

// async function isImageUrl(url, { proxyUrl, timeoutMs = 8000 } = {}) {
//     const cfg = {
//         timeout: timeoutMs,
//         maxRedirects: 5,
//         validateStatus: () => true,
//         headers: {
//             "User-Agent": "axios-image-check/1.0",
//             "Accept": "image/*, */*;q=0.5",
//         },
//     };

//     if (proxyUrl) {
//         const agent = new HttpsProxyAgent(proxyUrl);
//         cfg.httpAgent = agent;
//         cfg.httpsAgent = agent;
//         cfg.proxy = false; // IMPORTANT: use the agent, not axios' legacy proxy option
//     }

//     // 1) Try HEAD
//     try {
//         const head = await axios.head(url, cfg);
//         const ct = String(head.headers["content-type"] || "").toLowerCase();
//         if (head.status >= 200 && head.status < 400 && ct.startsWith("image/")) {
//             return { ok: true, contentType: ct };
//         }
//         // fall through if HEAD blocked (405/403/400) or ambiguous
//         if (![400, 403, 405].includes(head.status)) {
//             if (ct) return { ok: false, contentType: ct, reason: `Content-Type=${ct}` };
//             return { ok: false, reason: `HEAD status ${head.status}` };
//         }
//     } catch (_) {
//         // ignore, try GET
//     }

//     // 2) Fallback GET (stream + sniff)
//     try {
//         const controller = new AbortController();
//         const res = await axios.get(url, { ...cfg, responseType: "stream", signal: controller.signal });
//         const ct = String(res.headers["content-type"] || "").toLowerCase();

//         if (ct.startsWith("image/")) {
//             controller.abort();
//             return { ok: true, contentType: ct };
//         }

//         const stream = res.data;
//         const ok = await new Promise((resolve) => {
//             let decided = false;
//             stream.once("data", (chunk) => {
//                 const isPng = chunk.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
//                 const isJpg = chunk.length > 2 && chunk[0] === 0xff && chunk[1] === 0xd8;
//                 const isGif = chunk.slice(0, 6).toString("ascii").startsWith("GIF8");
//                 const isWebp = chunk.slice(8, 12).toString("ascii") === "WEBP"; // RIFF....WEBP
//                 const isBmp = chunk.slice(0, 2).toString("ascii") === "BM";
//                 const isHeic = chunk.slice(4, 12).toString("ascii").includes("ftypheic");
//                 decided = true;
//                 controller.abort();
//                 resolve(isPng || isJpg || isGif || isWebp || isBmp || isHeic);
//             });
//             stream.once("end", () => !decided && resolve(false));
//             stream.once("error", () => resolve(false));
//         });

//         return ok
//             ? { ok: true, contentType: ct || "unknown/binary" }
//             : { ok: false, contentType: ct || "unknown", reason: "Not an image signature" };
//     } catch (e) {
//         return { ok: false, reason: e?.message || "GET failed" };
//     }
// }

// Example usage:
// const run = async () => {
//     const r1 = await isImageUrl("https://jjgirls.com/japanese/rin-karasawa/1/rin-karasawa-1.jpg", {
//         proxyUrl: "http://user:pass@127.0.0.1:8080",
//     });
//     const r2 = await isImageUrl("https://jjgirls.com/japanese/rin-karasawa/2/rin-karasawa-1.jpg");
//     console.log({ r1, r2 });
// };
// run();

module.exports = {
	checkNameExist,
	crawlIdolFromJJGirl,
	isValidImageURL
};

// crawlIdolFromJJGirl("iori-kawaii").then(res => { console.log('[res]', res); }).catch(err => { console.log('[err]', err); })