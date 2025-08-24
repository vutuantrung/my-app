const { crawlMovie } = require("../features/webCrawler/collectMovieData");

async function crawlMovieService(code, url) {
    // crawlpage: www.javdatabase.com
    const crawledData = await crawlMovie({ code, url });
    return crawledData;
}

// async function crawlMovieByUrl(url) {
//     // crawlpage: www.javdatabase.com
//     const crawledData = await crawlMovie({ movieUrl: url });
//     return crawledData;
// }

module.exports = { crawlMovieService };
