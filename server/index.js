const fs = require('fs');
const path = require('path');
const {
	IDOL_AVATAR_FOLDER,
	MOVIE_THUMBS_FOLDER,
	CACHED_FOLDER,
	SERVER_FOLDER_PATH
} = require('./constants.js');
const { runProfileConnecting } = require('./features/webCrawler/captureWorker.js');

if (!fs.existsSync(SERVER_FOLDER_PATH)) {
	console.log(`External DB path does not exist: ${SERVER_FOLDER_PATH}, please create theses folders:
		- ${IDOL_AVATAR_FOLDER}
		- ${MOVIE_THUMBS_FOLDER}
		- ${CACHED_FOLDER}`);
	return;
}

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3123;
const bodyParser = require('body-parser');
app.use(cors({
	origin: [/^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/, /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from a 'public' directory
app.use('/images', express.static(path.join(process.cwd(), 'database'), {
	setHeaders: (res) => {
		res.setHeader('Cache-Control', 'public, max-age=60, must-revalidate');
	}
}));
// Serve video files from your "database" folder
app.use('/videos', express.static(path.join(process.cwd(), 'database'), {
	setHeaders: (res) => {
		res.setHeader('Cache-Control', 'public, max-age=3600');
	},
}));
// console.log(path.join(process.cwd(), 'database'))

const idolProfileRoutes = require('./routes/idol.route.js');
app.use('/api/idol', idolProfileRoutes);
const movieRoutes = require('./routes/movie.route.js');
app.use('/api/movie', movieRoutes);
const identifyRoutes = require('./routes/common.route.js');
app.use('/api/identify', identifyRoutes);
const modelProfileRoutes = require('./routes/model.route.js');
app.use('/api/model', modelProfileRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

// app.post('/test', (req, res) => {
//     console.log("in test.....");
//     res.status(200).send(JSON.stringify({ data: "qwe" }))
// })

app.listen(PORT, '0.0.0.0', () => {
	console.log(`API listening on http://0.0.0.0:${PORT}`);
});

// runProfileConnecting();

// Graceful shutdown: Ctrl+C or SIGTERM
const GRACE_MS = 5000;

const shutdown = (signal) => {
	console.log(`\n${signal} received. Closing HTTP server...`);
	// Stop accepting new connections
	app.close((err) => {
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