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
const { downloadImageByUrl } = require('../../helpers');

async function crawlMovie(movieInfo) {
    const { code, url } = movieInfo;
    let data = {}, htmlContentRoot = null;

    // if (movieInfo.movieCode) {
    //     htmlFilePath = path.join(CACHED_FOLDER, code + ".html")
    //     url = `https://www.javdatabase.com/movies/${movieCode}/`;
    //     code = movieInfo.movieCode;
    // } else if (movieInfo.movieUrl) {
    //     const hashedName = crypto.createHash('md5').update(movieInfo.movieUrl).digest('hex');
    //     htmlFilePath = path.join(CACHED_FOLDER, hashedName + ".html");
    //     url = movieInfo.movieUrl;
    //     code = hashedName;
    // } else {
    //     throw new Error("[crawlMovie] Unsupported crawling mode")
    // }

    const htmlFilePath = path.join(CACHED_FOLDER, code + ".html")

    if (fs.existsSync(htmlFilePath)) {
        console.log("✔️ File already exists:", htmlFilePath);
        htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
    } else {
        console.log("🔥 Gonna crawl from url:", url);
        await axios.get(url, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "upgrade-insecure-requests": "1",
                "Referer": "https://www.javdatabase.com/"
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch data for movie code ${code}. Status: ${response.status}`);
                }
                htmlContentRoot = response.data;
                fs.writeFileSync(htmlFilePath, htmlContentRoot);
            })
            .catch((err) => console.error(err));
    }

    const root = parse(htmlContentRoot);

    //// GET MOVIE DATA
    {
        let dataNode = root.querySelector("#main > .entry-content");
        if (!dataNode) {
            console.log("dataNode element cannot parse -> using trick")
            const dom = parseDocument(htmlContentRoot);
            const entryContentEle = selectOne('#main', dom);
            const row = selectOne('.entry-content', entryContentEle);
            dataNode = parse(render(row));
        }
        // console.log('[dataNode]', dataNode);
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

        // 3. Movie images
        if (!data.images) data.images = [];
        const imageNodes = root?.querySelector("div[id='lightboxModal']").parentNode.querySelector("div[class='container']")?.firstElementChild.children;
        if (Array.isArray(imageNodes)) {
            for (const iNode of imageNodes) {
                const imgHref = iNode.firstElementChild.getAttribute("data-image-href");
                data.images.push(imgHref);
            }
        }

        // 4. Movie thumbs
        if (!data.thumbs) {
            data.thumbs = { cover: "", full: "" };
        }
        const coverThumbContainer = root?.querySelector("div[id='thumbnailContainer'] > a > img");
        if (coverThumbContainer) {
            const src = coverThumbContainer.getAttribute("src");
            data.thumbs.cover = src;
        }
        const fullThumbContainer = root?.querySelector("div[id='poster-container'] > a > img");
        if (fullThumbContainer) {
            const src = fullThumbContainer.getAttribute("src");
            data.thumbs.full = src;
        }
        const videoThumbContainer = root?.querySelector("video");
        if (videoThumbContainer) {
            const src = videoThumbContainer.getAttribute("poster");
            if (!data.thumbs.cover) data.thumbs.cover = src;
            if (!data.thumbs.full) data.thumbs.full = src;
        }

        //// GET URLS
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

        //// GET FROM HREF
        const hrefData = extractDataFromHref(dataNode);
        data = { ...data, ...hrefData };
    }

    // console.log(data);

    // Download movie thumbs
    if (data.thumbs.cover) {
        await downloadImageByUrl(data.thumbs.cover, MOVIE_THUMBS_FOLDER, code + "-thumbs-cover.jpg");
    }
    if (data.thumbs.full) {
        await downloadImageByUrl(data.thumbs.full, MOVIE_THUMBS_FOLDER, code + "-thumbs-full.jpg");
    }
    for (const [idx, imageUrl] of Object.entries(data.images)) {
        await downloadImageByUrl(imageUrl, MOVIE_THUMBS_FOLDER, code + "-image-" + idx + ".jpg");
    }

    const fileJsonPath = path.join(CACHED_FOLDER, code + ".json");
    fs.writeFileSync(fileJsonPath, JSON.stringify(data));
    return data;
}

module.exports = { crawlMovie }

// crawlMovie("cawd-681");