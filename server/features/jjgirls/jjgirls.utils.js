
const axios = require('axios');
const fs = require("fs");
const path = require("path");
const { parse } = require('node-html-parser');
const { sleep, generateRandomNumber, inverseName } = require("../../helpers");
const { CACHED_FOLDER } = require('../../constants');

const BASE_IMAGE_TEMPLATE = 'https://jjgirls.com/japanese/#NAME#/#FOLDER#/#NAME#-#INDEX#.jpg';

async function checkNameExist(name) {
    const lowerCaseName = name.toLowerCase();
    const apiQueryNames = Array.from(new Set([lowerCaseName, inverseName(lowerCaseName)]));
    for (const queryName of apiQueryNames) {
        const firstImgUrl = BASE_IMAGE_TEMPLATE
            .replaceAll('#NAME#', queryName)
            .replaceAll('#FOLDER#', 1)
            .replaceAll('#INDEX#', 1);
        const isUrlValid = await isValidImageURL(firstImgUrl);
        if (isUrlValid) {
            return queryName;
        }
    }
    return null;
}

async function crawlIdolFromJJGirl(name) {
    console.log("\n[JJGIRL]---------------");

    let htmlContentRoot = null, folderIndex = -1, imgIndex = -1;

    const queryName = name[0] === "_"
        ? name.slice(1)
        : await checkNameExist(name);
    if (!queryName) {
        console.log("❌ JJGirl info not found", queryName);
        return null;
    }
    console.log("🎉 JJGirl info found", queryName);

    const htmlFilePath = path.join(CACHED_FOLDER, queryName + "_jjgirl" + ".html");
    if (fs.existsSync(htmlFilePath)) {
        console.log("📌 File already exists:", htmlFilePath);
        htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
    } else {
        console.log("🔥 Gonna crawl from jjgirl url idol:", queryName);
        const fetchRes = await axios.get(`https://jjgirls.com/japanese/${queryName}/1/`);
        if (fetchRes.status !== 200) {
            throw new Error(`Failed to fetch data for model ${queryName}. Status: ${fetchRes.status}`);
        }

        htmlContentRoot = fetchRes.data;
        fs.writeFileSync(htmlFilePath, htmlContentRoot);
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

    // Get last image index
    let newImageUrl = BASE_IMAGE_TEMPLATE
        .replaceAll('#NAME#', queryName)
        .replaceAll('#FOLDER#', folderIndex.toString())
        .replaceAll('#INDEX#', "12");
    if (await isValidImageURL(newImageUrl)) {
        imgIndex = 12;
    } else {
        for (let i = 1; i <= 11; i++) {
            let newImageUrl = BASE_IMAGE_TEMPLATE
                .replaceAll('#NAME#', queryName)
                .replaceAll('#FOLDER#', folderIndex.toString())
                .replaceAll('#INDEX#', i.toString());
            isImage = await isValidImageURL(newImageUrl);
            await sleep(1000);

            if (isImage) {
                imgIndex = i;
                break;
            }
        }
    }

    console.log(`✅ Page crawled succcessfully!`);

    return { queryName: queryName, folderIndex: parseInt(folderIndex), imageIndex: imgIndex }
}

async function isValidImageURL(url) {
    try {
        const response = await axios.head(url, {
            timeout: 5000, // ms
            validateStatus: status => status < 500, // accept 4xx to analyze failures
        });

        const is404Redirected = response.request.path.includes("404.Not.Found.svg");
        const contentType = response.headers['content-type'];
        const isImage = contentType && contentType.startsWith('image/');
        const statusOK = response.status >= 200 && response.status < 300;

        return isImage && statusOK && !is404Redirected;
    } catch (err) {
        console.error('Error checking image:', err.message);
        return false;
    }
}

module.exports = {
    checkNameExist,
    crawlIdolFromJJGirl,
    isValidImageURL
};

// crawlIdolFromJJGirl("iori-kawaii").then(res => { console.log('[res]', res); }).catch(err => { console.log('[err]', err); })