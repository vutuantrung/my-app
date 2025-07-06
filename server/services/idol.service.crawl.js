
const crawlerWebpage = require("../features/webCrawler/collectIdolData");

async function crawlIdolByName(name) {
    // from page javdatabase
    const crawledData = await crawlerWebpage.crawlModel(name);
    console.log(crawledData);
}

module.exports = { crawlIdolByName }