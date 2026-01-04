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
const app = express();
const MAIN_HTTP_SERVER_PORT = 3123;
const HTTP_SERVER_PORT = 3125;

const SEARCHING_ENDPOINT = `http://localhost:${MAIN_HTTP_SERVER_PORT}/api/identify/search`;

const bodyParser = require('body-parser');
app.use(cors({
    origin: [/^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/, /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { broadcast } = require('./serverWS.js');

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/api/searchIdentify', async (req, res) => {
    try {
        const { identity } = req.query;
        const fetchResult = await fetch(SEARCHING_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                identify: identity,
                updateRecord: false,
                reuseSavedFile: false,
                displayType: "json"
            })
        });
        const resultData = await fetchResult.json();
        console.log("search result:", resultData);
        return res.json(resultData);
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log('cleanup');
    }
});

app.post('/api/saveIdentify', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "identify is required" });
    }
    const filePath = path.join(DATABASE_FOLDER, 'searchingIdentify.txt');
    fs.appendFile(filePath, text + '\n', (err) => {
        if (err) {
            console.error('Error saving identify:', err);
            return res.status(500).json({ error: 'Failed to save identify' });
        }
    });
    return res.json({ success: true });
});

app.listen(HTTP_SERVER_PORT, '0.0.0.0', () => {
    console.log(`HELPER API listening on http://0.0.0.0:${HTTP_SERVER_PORT}`);
});
// searchIdentifies();
setInterval(() => {
    backupDatabase();
    searchIdentifies();
}, 5 * 60 * 1000);

function backupDatabase() {
    const src = './database/my-db';
    if (!fs.existsSync(src)) {
        console.log('Source database file does not exist, skipping backup.');
        return;
    }
    const dest = './database/my-db-backup';

    fs.copyFile(src, dest, (err) => {
        if (err) {
            console.error('Error copying file:', err);
            return;
        }
        console.log('Database backup completed successfully.');
    });
}

async function searchIdentifies() {
    // broadcast("system.updated", "Checking searching identify", { createdAt: new Date().toISOString() });
    const searchingIdentifies = fs.readFileSync(path.join(DATABASE_FOLDER, 'searchingIdentify.txt'), 'utf-8');
    const identifies = searchingIdentifies.split('\n').map(line => line.trim()).filter(Boolean);
    const deletedIdentifies = [];
    broadcast("system.updated", `Found ${identifies.length} searching identifies`, { id: Date.now().toString(), identifies, createdAt: new Date().toISOString() });
    if (isSearchingIdentity) {
        console.log("The searching task is still in touch");
        return;
    }

    if (identifies.length === 0) {
        console.log("No identify need to be searched")
        return;
    }

    isSearchingIdentity = true;
    for (let i = 1; i <= 10; i++) {
        const identify = identifies.shift()?.trim();
        if (identify) {
            deletedIdentifies.push(identify);
            console.log("searching for", identify);
            const fetchResult = await fetch(SEARCHING_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identify: identify,
                    updateRecord: true,
                    reuseSavedFile: false,
                    displayType: "json"
                })
            });
            const resultData = await fetchResult.json();
            console.log("search result:", resultData);
            if (resultData && resultData.errMsg) {
                fs.appendFileSync(path.join(DATABASE_FOLDER, 'searchedIdentify.txt'), identify + "|Failed\n");
            }
        }
    }

    const currentIdentifiesString = fs.readFileSync(path.join(DATABASE_FOLDER, 'searchingIdentify.txt'), 'utf-8');
    const currentIdentifies = Array.from(new Set(currentIdentifiesString.split('\n').map(line => line.trim()).filter(Boolean)));
    const filteredDeletedIdentifies = currentIdentifies.filter(identify => !deletedIdentifies.includes(identify));
    const newIdentifiesToSave = filteredDeletedIdentifies.join('\n') + "\n";

    fs.writeFileSync(path.join(DATABASE_FOLDER, 'searchingIdentify.txt'), newIdentifiesToSave, 'utf-8');
    isSearchingIdentity = false;
}

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

module.exports = { app };