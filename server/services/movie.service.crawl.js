const { crawlMovie } = require("../features/webCrawler/collectMovieData");

async function crawlMovieService(code, url) {
	// crawlpage: www.javdatabase.com
	const crawledData = await crawlMovie({ code, url });
	return crawledData;
}

module.exports = { crawlMovieService };
