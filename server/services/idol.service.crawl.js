
const { IDOL_AVATAR_FOLDER } = require("../constants");
const { crawlIdol } = require("../features/webCrawler/collectIdolData");
const { downloadImageByUrl } = require("../helpers");

async function setAvatar(imgUrl, idolName) {
    return downloadImageByUrl(imgUrl, IDOL_AVATAR_FOLDER, idolName);
}

async function crawlIdolByName(name) {
    // crawlpage: jjgirls.com, japanesebeauties.one, www.javdatabase.com
    const crawledData = await crawlIdol(name);
    return crawledData;
}

module.exports = { crawlIdolByName, setAvatar }