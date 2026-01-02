const fs = require('fs');
const path = require('path');
const {
	IDOL_AVATAR_FOLDER,
	MOVIE_THUMBS_FOLDER,
	CACHED_FOLDER,
	SERVER_FOLDER_PATH,
	DATABASE_FOLDER
} = require('./constants.js');

if (!fs.existsSync(SERVER_FOLDER_PATH)) {
	console.log(`External DB path does not exist: ${SERVER_FOLDER_PATH}, please create theses folders:
		- ${IDOL_AVATAR_FOLDER}
		- ${MOVIE_THUMBS_FOLDER}
		- ${CACHED_FOLDER}`);
	return;
}

let isSearchingIdentity = false;

const express = require('express');
const cors = require('cors');
const mainApp = express();
const HTTP_SERVER_PORT = 3123;

const bodyParser = require('body-parser');
mainApp.use(cors({
	origin: [/^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/, /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));
// app.use(express.json());

mainApp.use(bodyParser.json());
mainApp.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from a 'public' directory
mainApp.use('/images', express.static(path.join(process.cwd(), 'database'), {
	setHeaders: (res) => {
		res.setHeader('Cache-Control', 'public, max-age=60, must-revalidate');
	}
}));
// Serve video files from your "database" folder
mainApp.use('/videos', express.static(path.join(process.cwd(), 'database'), {
	setHeaders: (res) => {
		res.setHeader('Cache-Control', 'public, max-age=3600');
	},
}));
// console.log(path.join(process.cwd(), 'database'))

const idolProfileRoutes = require('./routes/idol.route.js');
mainApp.use('/api/idol', idolProfileRoutes);
const movieRoutes = require('./routes/movie.route.js');
mainApp.use('/api/movie', movieRoutes);
const identifyRoutes = require('./routes/common.route.js');
mainApp.use('/api/identify', identifyRoutes);
const modelProfileRoutes = require('./routes/model.route.js');
const { broadcast } = require('./serverWS.js');
const { sleep } = require('./helpers.js');
mainApp.use('/api/model', modelProfileRoutes);

mainApp.get('/health', (req, res) => res.json({ ok: true }));

mainApp.post('/api/saveIdentify', (req, res) => {
	const { identify } = req.body;
	if (!identify) {
		return res.status(400).json({ error: "identify is required" });
	}
	const filePath = path.join(DATABASE_FOLDER, 'searchingIdentify.txt');
	fs.appendFile(filePath, identify + '\n', (err) => {
		if (err) {
			console.error('Error saving identify:', err);
			return res.status(500).json({ error: 'Failed to save identify' });
		}
	});
	return res.json({ success: true });
});

// app.post('/test', (req, res) => {
//     console.log("in test.....");
//     res.status(200).send(JSON.stringify({ data: "qwe" }))
// })

mainApp.listen(HTTP_SERVER_PORT, '0.0.0.0', () => {
	console.log(`API listening on http://0.0.0.0:${HTTP_SERVER_PORT}`);
});

// setInterval(async () => {
// 	// broadcast("system.updated", "Checking searching identify", { createdAt: new Date().toISOString() });
// 	const searchingIdentifies = fs.readFileSync(path.join(DATABASE_FOLDER, 'searchingIdentify.txt'), 'utf-8');
// 	const identifies = searchingIdentifies.split('\n').map(line => line.trim()).filter(Boolean);
// 	broadcast("system.updated", `Found ${identifies.length} searching identifies`, { identifies, createdAt: new Date().toISOString() });
// 	if (isSearchingIdentity) {
// 		console.log("The searching task is still in touch");
// 		return;
// 	}

// 	if (identifies.length === 0) {
// 		console.log("No identify need to be searched")
// 		return;
// 	}

// 	isSearchingIdentity = true;
// 	for (let i = 1; i <= 10; i++) {
// 		const identify = identifies.shift()?.trim();
// 		await sleep(10000);
// 		if (identify) {
// 			console.log("searching for", identify);
// 			fs.appendFileSync(path.join(DATABASE_FOLDER, 'searchedIdentify.txt'), identify + "\n");
// 		}
// 	}
// 	const remainingIdentifies = identifies.join('\n');
// 	fs.writeFileSync(path.join(DATABASE_FOLDER, 'searchingIdentify.txt'), remainingIdentifies, 'utf-8');
// 	isSearchingIdentity = false;
// }, 1 * 60 * 1000);

// runProfileConnecting();

// Graceful shutdown: Ctrl+C or SIGTERM
const GRACE_MS = 5000;

const shutdown = (signal) => {
	console.log(`\n${signal} received. Closing HTTP server...`);
	// Stop accepting new connections
	mainApp.close((err) => {
		if (err) console.error("app.close error:", err);
		process.exit(0);
	});

	// Give in-flight requests some time, then nuke leftovers
	setTimeout(() => {
		for (const s of sockets) {
			try { s.destroy(); } catch { }
		}
	}, GRACE_MS).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));   // Ctrl+C
process.on("SIGTERM", () => shutdown("SIGTERM"));  // e.g. from a process manager

// Optional: play nice with nodemon restarts
process.once("SIGUSR2", () => {
	shutdown("SIGUSR2");
	// Nodemon expects us to re-emit after cleanup:
	setTimeout(() => process.kill(process.pid, "SIGUSR2"), 100);
});

module.exports = { mainApp };