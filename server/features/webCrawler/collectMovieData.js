// Collect data from https://www.javdatabase.com/
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { parse } = require('node-html-parser');
const { extractText, extractDataFromHref } = require('./webCrawler.utils');
const { default: axios } = require('axios');
const { parseDocument } = require('htmlparser2');
const { selectOne } = require('css-select');
const render = require("dom-serializer").default;
const { CACHED_FOLDER, MOVIE_THUMBS_FOLDER } = require('../../constants');
const { downloadImageByUrl, fetchWithRetry, classifyThumbsType, classifyPosterType } = require('../../helpers');
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

            // 3. Movie thumbs
            if (!data.thumbs) {
                data.thumbs = {
                    cover: `https://pics.dmm.co.jp/digital/video/${data.content_id}/${data.content_id}ps.jpg`,
                    full: `https://pics.dmm.co.jp/digital/video/${data.content_id}/${data.content_id}pl.jpg`
                };
            }
            // 3.1 Video thumbs for uncensored video
            const videoThumbContainer = root?.querySelector("video");
            if (videoThumbContainer) {
                const src = videoThumbContainer.getAttribute("poster");
                if (!data.thumbs.cover) data.thumbs.cover = src;
                if (!data.thumbs.full) data.thumbs.full = src;
            }

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
        jsonFilePath = path.join(CACHED_FOLDER, code.toLowerCase() + "_javher.json");

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
        console.log('[jsonData]', jsonData);
    }

    console.log('[jsonData]', jsonData);
    if (!jsonData) {
        console.log("Fetch data failed after retry", RETRY_TIMES, "times");
    }
    console.log('[jsonData]', jsonData);

    const { success: fetchedSuccess, video: fetchedVideo } = jsonData;
    if (fetchedSuccess) {
        if (!data) data = {};

        jsonFilePath = path.join(CACHED_FOLDER, fetchedVideo.dvdId.toLowerCase() + "_javher.json")
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData));

        data.title = fetchedVideo.title;
        data.jav_series = "";
        data.dvd_id = fetchedVideo.dvdId.toLowerCase();
        data.content_id = fetchedVideo.contentId.toLowerCase();
        data.release_date = fetchedVideo.releaseDate.split("T")[0];
        data.runtime = fetchedVideo.duration + " min.";
        data.studio = {
            raw: fetchedVideo.studio.slug,
            name: fetchedVideo.studio.name,
        }
        data.director = fetchedVideo.director;
        data.favorite = "0";
        data.note = "";
        data.thumbs = classifyPosterType(fetchedVideo.image)

        if (!data.images) data.images = [];
        data.images.push(...fetchedVideo.gallery.map(url => {
            const { full } = classifyThumbsType(url);
            return full.replace("https://pics.r18.com/", "https://pics.dmm.co.jp/")
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

    // console.log(data);

    //// DOWNLOAD MEDIAS
    // 1. download cover
    if (data.thumbs.cover) {
        await downloadImageByUrl(data.thumbs.cover, MOVIE_THUMBS_FOLDER, data.content_id + "-thumbs-cover.jpg");
    }
    // 2. download poster
    if (data.thumbs.full) {
        await downloadImageByUrl(data.thumbs.full, MOVIE_THUMBS_FOLDER, data.content_id + "-thumbs-full.jpg");
    }
    // 3. download full thumbs
    for (const imageUrl of data.images) {
        const nameSegs = imageUrl.split("/");
        const fileName = nameSegs[nameSegs.length - 1];
        await downloadImageByUrl(imageUrl, MOVIE_THUMBS_FOLDER, fileName);
    }
    // 4. download cover thumbs
    const coverThumbs = fetchedVideo.gallery.map(url => {
        const { cover } = classifyThumbsType(url);
        return cover.replace("https://pics.r18.com/", "https://pics.dmm.co.jp/");
    })
    for (const imageUrl of coverThumbs) {
        const nameSegs = imageUrl.split("/");
        const fileName = nameSegs[nameSegs.length - 1];
        await downloadImageByUrl(imageUrl, MOVIE_THUMBS_FOLDER, fileName);
    }
    console.log('[fullData]', data);
    const fileJsonPath = path.join(CACHED_FOLDER, data.dvd_id + ".json");
    fs.writeFileSync(fileJsonPath, JSON.stringify(data));
    return data;
}


module.exports = { crawlMovie }

// crawlMovie({ code: "cawd-681", url: 'https://www.javdatabase.com/movies/cawd-681/' });

// async function crawlMovie_DEPRECATED2(movieInfo) {
//     const { code, url } = movieInfo;
//     let data = {}, htmlContentRoot = null;

//     const proxyService = new ProxyRotator("random");

//     const htmlFilePath = path.join(CACHED_FOLDER, code.toLowerCase() + ".html");

//     if (fs.existsSync(htmlFilePath)) {
//         console.log("✔️ File already exists:", htmlFilePath);
//         htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
//     } else {
//         console.log("🔥 Gonna crawl from url:", url);
//         const client = proxyService.axiosForNextProxy();
//         const res = await client.get(url);

//         if (res.status !== 200) {
//             throw new Error(`Failed to fetch data for movie ${code.toLowerCase()}. Status: ${response.status}`);
//         }
//         htmlContentRoot = res.data;
//         fs.writeFileSync(htmlFilePath, htmlContentRoot);
//     }

//     const root = parse(htmlContentRoot);

//     let contentId = "";
//     const metaImageCoverElement = root.querySelector("meta[property='og:image']");
//     if (metaImageCoverElement) {
//         const content = metaImageCoverElement.getAttribute("content");
//         const contentSegs = content.split("/");
//         contentId = contentSegs[contentSegs.length - 2]
//     }

//     if (!contentId) {
//         throw new Error("Content id cannot be detected. Please verify!")
//     }

//     //// GET MOVIE DATA
//     let dataNode = root.querySelector("#main > .entry-content");
//     if (!dataNode) {
//         console.log("dataNode element cannot parse -> using trick")
//         const dom = parseDocument(htmlContentRoot);
//         const entryContentEle = selectOne('#main', dom);
//         const row = selectOne('.entry-content', entryContentEle);
//         dataNode = parse(render(row));
//     }
//     const allTexts = extractText(dataNode);

//     const treatedAttr = [];
//     for (let i = 0; i < allTexts.length; i++) {
//         if (allTexts[i].includes("[*]")) {
//             let newAttr = allTexts[i];
//             for (let j = i + 1; j < allTexts.length; j++) {
//                 if (allTexts[j].includes("[*]") || allTexts[j] === "View All Favorites" || j === allTexts.length - 1) {
//                     if (newAttr[newAttr.length - 1] === ",") {
//                         newAttr = newAttr.slice(0, -1);
//                     }
//                     treatedAttr.push(newAttr);
//                     break;
//                 }
//                 newAttr += allTexts[j] + ",";
//             }
//         }
//     }
//     for (let i = 0; i < treatedAttr.length; i++) {
//         if (treatedAttr[i].includes("[*]Title:")) {
//             treatedAttr[i] = treatedAttr[i].replaceAll("Title,", "").replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
//         }
//         if (treatedAttr[i].includes("[*]Favorite:")) {
//             treatedAttr[i] = treatedAttr[i].replace("Favorite,", "").replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
//         }
//         if (treatedAttr[i].includes("[*]Idol(s)/Actress(es)")) {
//             treatedAttr[i] = "[*]Actress(es):" + treatedAttr[i].split(":")[1];
//         }
//         // // treatedAttr[i] = treatedAttr[i].replace("[*]", "")
//         const [a, v] = treatedAttr[i].replace("[*]", "").split(":");
//         data[a.replace(" ", "_").toLowerCase()] = v;
//     }

//     // delete
//     delete data['genre(s)'];
//     delete data['actress(es)'];

//     // 2. Rating data
//     const ratingNode = root?.querySelector("div[class='post-ratings']");
//     if (ratingNode) {
//         const allTexts = extractText(ratingNode);
//         const noRatingText = allTexts[0].replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
//         // console.log(allTexts)
//         const note = noRatingText === "(No Ratings Yet)"
//             ? noRatingText
//             : allTexts.join(" ").replace(")", "").split("average:")[1].replace(" out of ", "/").trim();
//         treatedAttr.push("Note: " + note);
//         data.note = note;
//     }

//     // 3. Movie images
//     if (!data.images) {
//         data.images = [];
//     }
//     const imageNodeContainer = root?.querySelector("div[id='lightboxModal']").parentNode.querySelector("div[class='container']");
//     const hasNoSampleImage = imageNodeContainer.innerText.trim() === "No sample images found.";
//     if (!hasNoSampleImage) {
//         const imageNodes = root?.querySelector("div[id='lightboxModal']").parentNode.querySelector("div[class='container']")?.firstElementChild.children;
//         if (Array.isArray(imageNodes)) {
//             for (const iNode of imageNodes) {
//                 const imgHref = iNode.firstElementChild.getAttribute("data-image-href");
//                 data.images.push(imgHref);
//             }
//         }
//     }

//     // 4. Movie thumbs
//     if (!data.thumbs) {
//         data.thumbs = {
//             cover: `https://pics.dmm.co.jp/digital/video/${data.content_id}/${data.content_id}ps.jpg`,
//             full: `https://pics.dmm.co.jp/digital/video/${data.content_id}/${data.content_id}pl.jpg`
//         };
//     }
//     const videoThumbContainer = root?.querySelector("video");
//     if (videoThumbContainer) {
//         const src = videoThumbContainer.getAttribute("poster");
//         if (!data.thumbs.cover) data.thumbs.cover = src;
//         if (!data.thumbs.full) data.thumbs.full = src;
//     }

//     //// GET URLS
//     if (!data.collectMore) {
//         data.collectMore = [];
//     }
//     const allURLElements = root.querySelectorAll("a");
//     const allHrefs = allURLElements?.map(e => e.getAttribute("href"))?.filter(url => {
//         if (url === "https://www.javdatabase.com/idols/") return false;
//         if (!url.startsWith("https://www.javdatabase.com/idols/")) return false;
//         const regCurrentIdol = /https:\/\/www\.javdatabase\.com\/idols\/.*\/\?ipage=[0-9]*/g;
//         if (regCurrentIdol.test(url)) return false;
//         const regComment = /https:\/\/www\.javdatabase\.com\/idols\/.*\/#comment-[0-9]*/g;
//         if (regComment.test(url)) return false;

//         return true;
//     });

//     if (Array.isArray(allHrefs)) {
//         const hrefSets = Array.from(new Set(allHrefs));
//         data.collectMore = hrefSets;
//     }

//     // get data from all page hrefs
//     const hrefData = extractDataFromHref(dataNode);

//     data = { ...data, ...hrefData };

//     //// FETCH DATA FROM JAVHER
//     let apiUrl = `https://javher.com/api/video/watch-${data.content_id}-${(new Date(data.release_date)).getTime()}`,
//         jsonFilePath = path.join(CACHED_FOLDER, code + "_javher.json"),
//         jsonDataString = null,
//         jsonData = null,
//         redownload = true;

//     if (!redownload && fs.existsSync(jsonFilePath)) {
//         console.log("✔️ File already exists:", jsonFilePath);
//         jsonDataString = fs.readFileSync(jsonFilePath, "utf-8");
//         jsonData = JSON.parse(jsonDataString);
//     } else {
//         const client = proxyService.axiosForNextProxy({
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': 'HAHA_ADAM_HAVE_TO_RESORT_TO_THIS#@!@#',
//                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
//                 'Cookie': 'user-country=USN'
//             }
//         });
//         const res = await client.get(apiUrl); console.log("Proxy used:", client._proxy.url, apiUrl);
//         if (res.status !== 200) {
//             throw new Error(`Failed to fetch data for model ${name}. Status: ${response.status}`);
//         }
//         jsonData = res.data;
//         fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData));
//     }

//     const { success: fetchedSuccess, video: fetchedVideo } = jsonData;
//     if (fetchedSuccess) {
//         data.images.push(...fetchedVideo.gallery);
//         data.images.push(...fetchedVideo.gallery.map(e => {
//             const [seg1, seg2] = e.split("-");
//             return `${seg1}jp-${seg2}`;
//         }));
//         data.images = Array.from(new Set(data.images));// remove dups
//     }

//     data.dvd_id = data.dvd_id.toLowerCase();
//     console.log(data);

//     //// DOWNLOAD MEDIAS
//     if (data.thumbs.cover) {
//         await downloadImageByUrl(data.thumbs.cover, MOVIE_THUMBS_FOLDER, data.content_id + "-thumbs-cover.jpg");
//     }
//     if (data.thumbs.full) {
//         await downloadImageByUrl(data.thumbs.full, MOVIE_THUMBS_FOLDER, data.content_id + "-thumbs-full.jpg");
//     }
//     for (const imageUrl of data.images) {
//         const nameSegs = imageUrl.split("/");
//         const fileName = nameSegs[nameSegs.length - 1];
//         await downloadImageByUrl(imageUrl, MOVIE_THUMBS_FOLDER, fileName);
//     }
//     // console.log('[fullData]', data);
//     const fileJsonPath = path.join(CACHED_FOLDER, data.dvd_id + ".json");
//     fs.writeFileSync(fileJsonPath, JSON.stringify(data));
//     return data;
// }

// async function crawlMovie_DEPRECATED(movieInfo) {
//     const { code, url } = movieInfo;
//     let data = {}, htmlContentRoot = null;

//     const proxyService = new ProxyRotator("random");

//     // if (movieInfo.movieCode) {
//     //     htmlFilePath = path.join(CACHED_FOLDER, code + ".html")
//     //     url = `https://www.javdatabase.com/movies/${movieCode}/`;
//     //     code = movieInfo.movieCode;
//     // } else if (movieInfo.movieUrl) {
//     //     const hashedName = crypto.createHash('md5').update(movieInfo.movieUrl).digest('hex');
//     //     htmlFilePath = path.join(CACHED_FOLDER, hashedName + ".html");
//     //     url = movieInfo.movieUrl;
//     //     code = hashedName;
//     // } else {
//     //     throw new Error("[crawlMovie] Unsupported crawling mode")
//     // }

//     const htmlFilePath = path.join(CACHED_FOLDER, code + ".html")

//     if (fs.existsSync(htmlFilePath)) {
//         console.log("✔️ File already exists:", htmlFilePath);
//         htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
//     } else {
//         console.log("🔥 Gonna crawl from url:", url);
//         const client = proxyService.axiosForNextProxy();
//         const res = await client.get(url);
//         // await axios.get(url, {
//         //     "headers": {
//         //         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//         //         "Referrer-Policy": "strict-origin-when-cross-origin",
//         //         "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
//         //         "sec-ch-ua-mobile": "?0",
//         //         "sec-ch-ua-platform": "\"Windows\"",
//         //         "upgrade-insecure-requests": "1",
//         //         "Referer": "https://www.javdatabase.com/"
//         //     }
//         // })
//         //     .then(response => {
//         //         if (response.status !== 200) {
//         //             throw new Error(`Failed to fetch data for movie code ${code}. Status: ${response.status}`);
//         //         }
//         //         htmlContentRoot = response.data;
//         //         fs.writeFileSync(htmlFilePath, htmlContentRoot);
//         //     })
//         //     .catch((err) => console.error(err));

//         if (res.status !== 200) {
//             throw new Error(`Failed to fetch data for model ${name}. Status: ${response.status}`);
//         }
//         htmlContentRoot = res.data;
//         fs.writeFileSync(htmlFilePath, htmlContentRoot);
//     }

//     const root = parse(htmlContentRoot);

//     //// GET MOVIE DATA
//     {
//         let dataNode = root.querySelector("#main > .entry-content");
//         if (!dataNode) {
//             console.log("dataNode element cannot parse -> using trick")
//             const dom = parseDocument(htmlContentRoot);
//             const entryContentEle = selectOne('#main', dom);
//             const row = selectOne('.entry-content', entryContentEle);
//             dataNode = parse(render(row));
//         }
//         const allTexts = extractText(dataNode);

//         const treatedAttr = [];
//         for (let i = 0; i < allTexts.length; i++) {
//             if (allTexts[i].includes("[*]")) {
//                 let newAttr = allTexts[i];
//                 for (let j = i + 1; j < allTexts.length; j++) {
//                     if (allTexts[j].includes("[*]") || allTexts[j] === "View All Favorites" || j === allTexts.length - 1) {
//                         if (newAttr[newAttr.length - 1] === ",") {
//                             newAttr = newAttr.slice(0, -1);
//                         }
//                         treatedAttr.push(newAttr);
//                         break;
//                     }
//                     newAttr += allTexts[j] + ",";
//                 }
//             }
//         }

//         for (let i = 0; i < treatedAttr.length; i++) {
//             if (treatedAttr[i].includes("[*]Title:")) {
//                 treatedAttr[i] = treatedAttr[i].replaceAll("Title,", "").replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
//             }
//             if (treatedAttr[i].includes("[*]Favorite:")) {
//                 treatedAttr[i] = treatedAttr[i].replace("Favorite,", "").replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
//             }
//             if (treatedAttr[i].includes("[*]Idol(s)/Actress(es)")) {
//                 treatedAttr[i] = "[*]Actress(es):" + treatedAttr[i].split(":")[1];
//             }
//             // // treatedAttr[i] = treatedAttr[i].replace("[*]", "")
//             const [a, v] = treatedAttr[i].replace("[*]", "").split(":");
//             data[a.replace(" ", "_").toLowerCase()] = v;
//         }
//         console.log('[data]', data);

//         // delete
//         delete data['genre(s)'];
//         delete data['actress(es)'];

//         // 2. Rating data
//         const ratingNode = root?.querySelector("div[class='post-ratings']");
//         if (ratingNode) {
//             const allTexts = extractText(ratingNode);
//             const noRatingText = allTexts[0].replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
//             // console.log(allTexts)
//             const note = noRatingText === "(No Ratings Yet)"
//                 ? noRatingText
//                 : allTexts.join(" ").replace(")", "").split("average:")[1].replace(" out of ", "/").trim();
//             treatedAttr.push("Note: " + note);
//             data.note = note;
//         }

//         // 3. Movie images
//         if (!data.images) data.images = [];
//         const imageNodes = root?.querySelector("div[id='lightboxModal']").parentNode.querySelector("div[class='container']")?.firstElementChild.children;
//         if (Array.isArray(imageNodes)) {
//             for (const iNode of imageNodes) {
//                 const imgHref = iNode.firstElementChild.getAttribute("data-image-href");
//                 data.images.push(imgHref);
//             }
//         }

//         // 4. Movie thumbs
//         if (!data.thumbs) {
//             data.thumbs = {
//                 cover: "",
//                 full: ""
//             };
//         }
//         const coverThumbContainer = root?.querySelector("div[id='thumbnailContainer'] > a > img");
//         if (coverThumbContainer) {
//             const src = coverThumbContainer.getAttribute("src");
//             data.thumbs.cover = src;
//         }
//         const fullThumbContainer = root?.querySelector("div[id='poster-container'] > a > img");
//         if (fullThumbContainer) {
//             const src = fullThumbContainer.getAttribute("src");
//             data.thumbs.full = src;
//         }
//         const videoThumbContainer = root?.querySelector("video");
//         if (videoThumbContainer) {
//             const src = videoThumbContainer.getAttribute("poster");
//             if (!data.thumbs.cover) data.thumbs.cover = src;
//             if (!data.thumbs.full) data.thumbs.full = src;
//         }

//         //// GET URLS
//         if (!data.collectMore) {
//             data.collectMore = [];
//         }
//         const allURLElements = root.querySelectorAll("a");
//         const allHrefs = allURLElements?.map(e => e.getAttribute("href"))?.filter(url => {
//             if (url === "https://www.javdatabase.com/idols/") return false;
//             if (!url.startsWith("https://www.javdatabase.com/idols/")) return false;
//             const regCurrentIdol = /https:\/\/www\.javdatabase\.com\/idols\/.*\/\?ipage=[0-9]*/g;
//             if (regCurrentIdol.test(url)) return false;
//             const regComment = /https:\/\/www\.javdatabase\.com\/idols\/.*\/#comment-[0-9]*/g;
//             if (regComment.test(url)) return false;

//             return true;
//         });

//         if (Array.isArray(allHrefs)) {
//             const hrefSets = Array.from(new Set(allHrefs));
//             data.collectMore = hrefSets;
//         }

//         //// GET FROM HREF
//         const hrefData = extractDataFromHref(dataNode);

//         data = { ...data, ...hrefData };
//     }

//     // console.log(data);

//     // Download movie thumbs
//     // if (data.thumbs.cover) {
//     //     await downloadImageByUrl(data.thumbs.cover, MOVIE_THUMBS_FOLDER, code + "-thumbs-cover.jpg");
//     // }
//     // if (data.thumbs.full) {
//     //     await downloadImageByUrl(data.thumbs.full, MOVIE_THUMBS_FOLDER, code + "-thumbs-full.jpg");
//     // }
//     for (const [idx, imageUrl] of Object.entries(data.images)) {
//         await downloadImageByUrl(imageUrl, MOVIE_THUMBS_FOLDER, code + "-image-" + idx + ".jpg");
//     }

//     const fileJsonPath = path.join(CACHED_FOLDER, code + ".json");
//     fs.writeFileSync(fileJsonPath, JSON.stringify(data));
//     return data;
// }