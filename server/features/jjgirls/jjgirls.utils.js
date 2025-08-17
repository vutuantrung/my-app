
const axios = require('axios');
const fs = require("fs");
const path = require("path");
const { parse } = require('node-html-parser');
const { sleep } = require("../../helpers");
const { CACHED_FOLDER } = require('../../constants');

const BASE_IMAGE_TEMPLATE = 'https://jjgirls.com/japanese/#NAME#/#FOLDER#/#NAME#-#INDEX#.jpg';

async function checkNameExist(name) {
    const firstImgUrl = BASE_IMAGE_TEMPLATE
        .replaceAll('#NAME#', name)
        .replaceAll('#FOLDER#', 1)
        .replaceAll('#INDEX#', 1);
    const isUrlValid = await isValidImageURL(firstImgUrl);
    return isUrlValid;
}

async function getJJGirlsImageIndex(name) {
    let currentName = name;
    let hasJJGirlData = await checkNameExist(currentName);
    if (!hasJJGirlData) {
        const reversedName = [...currentName.split("-")].reverse().join("-");
        hasJJGirlData = await checkNameExist(reversedName);
        if (!hasJJGirlData) {
            console.log("💔 JJGirl info not found", currentName);
            return null;
        }

        currentName = reversedName;
    }

    console.log("\n\n")
    console.log("👌 JJGirl info found", currentName);

    let htmlContentRoot = null, folderIndex = -1, imgIndex = -1;

    const htmlFilePath = path.join(CACHED_FOLDER, currentName + "_jjgirl" + ".html");
    if (fs.existsSync(htmlFilePath)) {
        console.log("✔️ File already exists:", htmlFilePath);
        htmlContentRoot = fs.readFileSync(htmlFilePath, "utf-8");
    } else {
        console.log("🔥 Gonna crawl from jjgirl url idol:", currentName);
        const fetchRes = await axios.get(`https://jjgirls.com/japanese/${currentName}/1/`);
        if (fetchRes.status !== 200) {
            throw new Error(`Failed to fetch data for model ${currentName}. Status: ${fetchRes.status}`);
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
        .replaceAll('#NAME#', currentName)
        .replaceAll('#FOLDER#', folderIndex.toString())
        .replaceAll('#INDEX#', "12");
    if (await isValidImageURL(newImageUrl)) {
        imgIndex = 12;
    } else {
        for (let i = 1; i <= 11; i++) {
            let newImageUrl = BASE_IMAGE_TEMPLATE
                .replaceAll('#NAME#', currentName)
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

    return { name: currentName, folderIndex: parseInt(folderIndex), imageIndex: imgIndex }
}

function getTotalImages(data) {
    const [name, folderIndex, imagesIndex] = data.split("|");
    const total = ((parseInt(folderIndex) - 1) * 12) + parseInt(imagesIndex);
    return total;
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

function generateRandomUrls(data) {
    const [name, fIdx, iIdx] = data.split("|");
    const urls = [];
    for (let i = 1; i <= 2; i++) {
        const randFolderIdx = generateRandomNumber(1, parseInt(fIdx));
        for (let j = 1; j <= 8; j++) {
            urls.push(BASE_IMAGE_TEMPLATE.replaceAll("#NAME#", name).replace("#FOLDER#", randFolderIdx).replace("#INDEX#", j));
        }
    }
    return urls;
}

function generateRandomNumber(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = { generateRandomUrls, getTotalImages, checkNameExist, getJJGirlsImageIndex, isValidImageURL };