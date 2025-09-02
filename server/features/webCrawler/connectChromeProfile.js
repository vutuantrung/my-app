const fs = require("fs");
const moment = require("moment");
const { spawn } = require('child_process');
const path = require("path");
const PROJECT_BASE_DIR = process.cwd();
const { sleep } = require(path.join(PROJECT_BASE_DIR, "helpers.js"));

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function capture(profilePort) {
    let browser, page;
    try {
        const res = await fetch(`http://localhost:${profilePort}/json/version`);
        const { webSocketDebuggerUrl } = await res.json();
        if (!webSocketDebuggerUrl) throw new Error('No webSocketDebuggerUrl');

        browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });
        page = await browser.newPage();

        page.on('response', async (response) => {
            const req = response.request();
            if (req.resourceType() === 'document' && req.url().startsWith('https://www.javdatabase.com/')) {
                try {
                    const html = await response.text();
                    console.log(html.length > 5000 ? html.slice(0, 5000) + '... [truncated]' : html);
                } catch (e) {
                    console.warn('Failed to read response text:', e.message);
                }
            }
        });

        // Optionally navigate or attach to existing targets here
        // await page.goto('https://www.javdatabase.com/', { waitUntil: 'domcontentloaded' });

        // Give listeners time to fire (or replace with explicit workflow)
        await sleep(3000);
    } finally {
        if (page && !page.isClosed()) await page.close().catch(() => { });
        if (browser) await browser.disconnect(); // disconnect (don’t close the shared Chrome)
    }
}

async function verifyConnection() {
    const disconnectedProfiles = [];
    const profiles = [
        { name: "Profile1", port: 9221 }
    ]
    console.log(`[${moment(Date.now()).format('DD/MM/YYYY-hh:mm:ss')}] Verify`)
    for (const profile of profiles) {
        try {
            const res = await fetch(`http://localhost:${profile.port}/json/version`, { timeout: 5000 });
            const data = await res.json();
            // console.log('[verifyConnection]', data)
            if (!data.webSocketDebuggerUrl) {
                console.warn(`⚠️ Profile ${profile.name} is open but not connected`);
            } else {
                console.log(`✅ Profile ${profile.name} is connectable on port ${profile.port}.`);
            }
        } catch (err) {
            disconnectedProfiles.push(profile.name);
            console.warn(`❌ Cannot connect to profile ${profile.name} on port ${profile.port} => trying to reconnect...`);
        }
    }

    const BAT_FOLDER = "C:/Users/trung/Documents/CSProjects/Personal-Project/NodeJS/my-app/server/savefiles/chromeProfiles";
    const batProfileChromes = fs.readdirSync(BAT_FOLDER);
    for (const b of batProfileChromes) {
        for (const p of disconnectedProfiles) {
            if (b.includes(p.replace(" ", "_"))) {
                spawn('cmd.exe', ['/c', path.join(BAT_FOLDER, b)]);
                await sleep(2000);
            }
        }
    }

    // start capturing
    for (const p of profiles) {
        capture(p.port);
    }
}

module.exports = {
    verifyConnection
}