const fs = require("fs");
const { crawlModelFromMisskon } = require("../features/webCrawler/collectPersonData");


async function crawlModelByName(name, recrawl) {
	// crawlpage: misskon.com(html)
	let data = await crawlModelFromMisskon(name, recrawl);
	return data;
}

module.exports = { crawlModelByName }