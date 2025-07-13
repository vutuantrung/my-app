const { crawlMovie } = require("../features/webCrawler/collectMovieData");

async function crawlMovieByCode(code) {
    // crawlpage: www.javdatabase.com
    const crawledData = await crawlMovie(code);
    return crawledData
}

module.exports = { crawlMovieByCode };
