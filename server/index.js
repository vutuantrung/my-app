const express = require('express');
const cors = require('cors');
const http = require("http");
const axios = require('axios');
const app = express();
const PORT = 3001;


const puppeteer = require('puppeteer');

app.use(cors());
app.use(express.json());

const modelProfileRoutes = require('./routes/modelProfile');
app.use('/api/model_profiles', modelProfileRoutes);

app.get('/api/scrape', async (req, res) => {
	const { modelName } = req.query;
	try {
		// const content = await httpGet(`https://www.javdatabase.com/idols/${encodeURIComponent(modelName)}`);
		// console.log(content)
		// const options = {
		// 	host: 'https://www.javdatabase.com/',
		// 	port: 443,
		// 	path: '/idols/' + encodeURIComponent(modelName),
		// };

		// console.log(options)

		const content = await getPageHTML(`https://www.javdatabase.com/idols/${encodeURIComponent(modelName)}`);
		console.log('[content]', content)
	} catch (err) {
		console.log(err)
		res.status(500).send('Error fetching URL');
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

const getPageHTML = async (pageUrl) => {
	const browser = await puppeteer.launch();

	const page = await browser.newPage();

	await page.goto('https://xslist.org/en/model/46565.html');

	const pageHTML = await page.evaluate('new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML');

	await browser.close();

	return pageHTML;
}