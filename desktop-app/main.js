import { app, BrowserWindow, session } from "electron";
app.commandLine.appendSwitch('enable-logging');
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRELOAD_PATH = path.join(__dirname, "preload.cjs");

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' ws: wss:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join("; ");

function setSecureHeaders() {
  const ses = session.defaultSession;
  ses.webRequest.onHeadersReceived((details, callback) => {
    const url = details.url || "";
    if (url.startsWith("devtools://") || url.startsWith("chrome-extension://") || url.startsWith("chrome://")) {
      callback({ responseHeaders: details.responseHeaders });
      return;
    }
    const headers = { ...details.responseHeaders };
    for (const key of Object.keys(headers)) {
      if (key.toLowerCase() === "content-security-policy") delete headers[key];
    }
    headers["Content-Security-Policy"] = [CSP];
    callback({ responseHeaders: headers });
  });
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    backgroundColor: "#0b0d10",
    show: false,
    webPreferences: {
      preload: PRELOAD_PATH,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.once("ready-to-show", () => win.show());
  await win.loadFile(path.join(__dirname, "renderer", "index.html"));
  win.webContents.openDevTools({ mode: 'detach' });
}

app.whenReady().then(() => { setSecureHeaders(); createWindow(); });
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
