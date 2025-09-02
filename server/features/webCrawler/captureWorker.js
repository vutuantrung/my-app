const fs = require("fs");
const path = require("path");
const { spawn } = require('child_process');
const { BAT_FOLDER } = require("../../constants");
const { sleep } = require("../../helpers");

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

let currentFilePath = ""
const allBrowsers = [];

const URL_PREFIX = "https://www.javdatabase.com";   // filter scope
const URLREG = /https\:\/\/www.javdatabase.com\/(idols|movies|idol-uncensored-movies)\/.*/;

async function fetchWithTimeout(url, ms = 5000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    try { return await fetch(url, { signal: ctrl.signal }); }
    finally { clearTimeout(t); }
}

async function connectToChrome(port) {
    const res = await fetchWithTimeout(`http://localhost:${port}/json/version`, 2000);
    const { webSocketDebuggerUrl } = await res.json();
    return puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });
}

// Attach once per page; capture requests/responses continuously
function attachNetworkSniffers(page) {
    if (page.__networkSniffersAttached) return;
    page.__networkSniffersAttached = true;

    // page.on("request", (req) => {
    //     const url = req.url();
    //     if (!url.startsWith(URL_PREFIX)) return;
    //     console.log(`[req] ${req.method()} ${url}`);
    //     // const headers = req.headers(); // if needed
    //     // const postData = req.postData(); // if needed
    // });

    // page.on("requestfailed", (req) => {
    //     const url = req.url();
    //     if (!url.startsWith(URL_PREFIX)) return;
    //     console.warn(`[fail] ${req.method()} ${url} — ${req.failure()?.errorText}`);
    // });

    page.on("response", async (res) => {
        const req = res.request();

        const url = req.url();
        if (!URLREG.test(url)) return;
        const rt = req.resourceType();
        if (rt !== "document") return;

        const status = res.status();
        console.log(`[res] ${status} ${rt} ${req.method()} ${url}`);

        // Only read heavy bodies when you truly need them.
        if (rt === "document") {
            try {
                const htmlContent = await res.text();
                if (currentFilePath) {
                    fs.writeFileSync(currentFilePath, htmlContent);
                }
                // console.log(`[body] length=${html.length} (truncated)\n${html.slice(0, 5000)}${html.length > 5000 ? " …[truncated]" : ""}`);
            } catch (e) {
                console.warn(`Failed to read response body: ${e.message}`);
            }
        }
    });
}

// Continuous, self-healing capture across ALL pages of one Chrome profile.
async function startNetworkCaptureWorker(
    profileName,
    port,
    {
        signal,
        batPath,              // e.g. "C:/.../chromeProfiles/Profile1.bat"
        urlBat,               // e.g. process.env.URL_BAT
        launchTimeoutMs = 8000,
        idleMs = 30_000,
        backoffBaseMs = 500,
    } = {}
) {
    let attempt = 0;
    let batLaunched = false;
    const shouldStop = () => signal && signal.aborted;

    while (!shouldStop()) {
        let browser;

        try {
            // Try to connect
            browser = await connectToChrome(port);
            attempt = 0; // reset backoff on success

            // Attach sniffers to existing pages
            try {
                const pages = await browser.pages();
                for (const p of pages) attachNetworkSniffers(p);
            } catch { }

            // Auto-attach to future pages
            browser.on("targetcreated", async (target) => {
                if (target.type() !== "page") return;
                try { attachNetworkSniffers(await target.page()); } catch { }
            });
            browser.on("targetchanged", async (target) => {
                if (target.type() !== "page") return;
                try { attachNetworkSniffers(await target.page()); } catch { }
            });
            console.log(profileName, "is connected successfully!");
            allBrowsers.push({ profileName: profileName, browser });
            // Keep alive; listeners do the continuous work
            while (!shouldStop() && browser.isConnected()) {
                await sleep(idleMs);
            }
        } catch (err) {
            // FIRST connection failure path → launch BAT with URL_BAT once
            if (!batLaunched && batPath && fs.existsSync(batPath)) {
                batLaunched = true;
                try {
                    const args = ["/c", batPath];
                    if (urlBat) args.push(urlBat);

                    console.warn(`[${port}] First connect failed ("${err.message}"). Launching BAT: ${batPath} ${urlBat ? urlBat : ""}`);
                    // Start detached so it survives if this process restarts
                    const child = spawn("cmd.exe", args, { windowsHide: true, detached: true });
                    child.unref();

                    // Give Chrome time to start, then retry immediately
                    await sleep(launchTimeoutMs);
                    continue;
                } catch (launchErr) {
                    console.error(`[${port}] Failed to launch BAT: ${launchErr.message}`);
                    // fall through to backoff
                }
            }

            // Standard reconnect backoff
            attempt += 1;
            const backoff = Math.min(backoffBaseMs * 2 ** Math.min(attempt, 6), 15000);
            console.warn(`[${port}] Worker error: ${err.message} — retrying in ${backoff}ms`);
            await sleep(backoff);

        } finally {
            // Do not close shared Chrome; just disconnect our session
            try { if (browser) await browser.disconnect(); } catch { }
        }
    }

    console.log(`[${port}] Worker stopped`);
}

// Example main
async function runProfileConnecting() {
    const profiles = [{ name: "Profile1", port: 9221 }];
    const ac = new AbortController();
    process.on("SIGINT", () => ac.abort());
    process.on("SIGTERM", () => ac.abort());

    await Promise.all(profiles.map(p => startNetworkCaptureWorker(
        p.name,
        p.port, {
        batPath: path.join(BAT_FOLDER, `${p.name}.bat`),
        signal: ac.signal
    })));
}

async function redirectPageUrl(profileName, url, cachedFilePath) {
    try {
        const workingBrowser = allBrowsers.find(b => b.profileName.toLowerCase() === profileName.toLowerCase());
        // console.log('[allBrowsers]', allBrowsers);
        const browser = workingBrowser.browser;
        // console.log('[browser]', browser);
        const pages = await browser.pages();
        let page = pages[0];
        if (!page) {
            page = browser.newPage();
        }
        currentFilePath = cachedFilePath;
        let maxAttemps = 5, currentAttempt = 1;
        await page.goto(url);
        // Optionally bring to front if you want it visible:
        // await page.bringToFront();
        while (currentAttempt <= maxAttemps) {
            if (fs.existsSync(cachedFilePath)) {
                return true;
            }
            currentAttempt++;
            await sleep(2000);
        }

        return false;
    } catch (e) {
        console.warn(`goto(${url}) failed: ${e.message}`);
        // fall back to CDP navigation if needed:
        try {
            const client = await page.target().createCDPSession();
            await client.send("Page.enable");
            await client.send("Page.navigate", { url });
        } catch {
            return false;
        }

        return true;
    }
}

module.exports = {
    startNetworkCaptureWorker,
    runProfileConnecting,
    redirectPageUrl
};
