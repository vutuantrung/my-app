const proxyIps = `
23.95.150.145:6114:skjpdwdk:wbf5e31thcpw
198.23.239.134:6540:skjpdwdk:wbf5e31thcpw
45.38.107.97:6014:skjpdwdk:wbf5e31thcpw
107.172.163.27:6543:skjpdwdk:wbf5e31thcpw
64.137.96.74:6641:skjpdwdk:wbf5e31thcpw
45.43.186.39:6257:skjpdwdk:wbf5e31thcpw
154.203.43.247:5536:skjpdwdk:wbf5e31thcpw
216.10.27.159:6837:skjpdwdk:wbf5e31thcpw
136.0.207.84:6661:skjpdwdk:wbf5e31thcpw
142.147.128.93:6593:skjpdwdk:wbf5e31thcpw
`;
// proxy-rotator.js
// Install dependencies: npm i axios http-proxy-agent https-proxy-agent

const axios = require("axios");
const { HttpProxyAgent } = require("http-proxy-agent");
const { HttpsProxyAgent } = require("https-proxy-agent");
const { sleep } = require("../helpers");

/**
 * Converts "ip:port:username:password" to a proxy config object.
 */
function parseProxyString(s) {
    const parts = String(s).trim().split(":");
    if (parts.length !== 4) {
        throw new Error(`Invalid proxy format: "${s}". Expected ip:port:username:password`);
    }

    const [host, port, username, password] = parts;
    const auth = encodeURIComponent(username) + ":" + encodeURIComponent(password);

    return {
        host,
        port: Number(port),
        username,
        password,
        url: `http://${auth}@${host}:${port}` // Works for both HTTP and HTTPS
    };
}

// https://javher.com/api/video/watch-ofje00525-1752807600000

class ProxyRotator {
    /**
     * @param {string[]} proxyList - array of "ip:port:username:password"
     * @param {"round-robin"|"random"} strategy
     */
    constructor(strategy = "round-robin") {
        this.proxies = proxyIps.split("\n").filter(Boolean).map(parseProxyString);
        this.strategy = strategy;
        this._i = 0;
    }

    /** Get the next proxy */
    getProxy() {
        if (this.strategy === "random") {
            const idx = Math.floor(Math.random() * this.proxies.length);
            return this.proxies[idx];
        }
        // round-robin
        const proxy = this.proxies[this._i];
        this._i = (this._i + 1) % this.proxies.length;
        return proxy;
    }

    /**
     * Create an axios instance configured to use the next proxy.
     */
    axiosForNextProxy(opts = {}) {
        const proxy = this.getProxy();

        // Use the right agent depending on protocol
        const httpAgent = new HttpProxyAgent(proxy.url);
        const httpsAgent = new HttpsProxyAgent(proxy.url);

        const axiosConfig = {
            proxy: false, // disable axios default proxy config
            httpAgent,
            httpsAgent,
            timeout: opts.timeout ?? 15000,
            headers: opts.headers
        }

        if (opts.responseType) {
            axiosConfig.responseType = opts.responseType;
        }

        const instance = axios.create(axiosConfig);

        instance._proxy = proxy; // expose the chosen proxy
        return instance;
    }
}

module.exports = ProxyRotator;

// ---------- Example usage ----------
// (async () => {
//     const rawProxies = proxyIps.split("\n").filter(Boolean);

//     const rotator = new ProxyRotator(rawProxies, "random");

//     // for (let n = 0; n < 3; n++) {
//     const client = rotator.axiosForNextProxy({
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'HAHA_ADAM_HAVE_TO_RESORT_TO_THIS#@!@#',
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
//             'Cookie': 'user-country=USN'
//         }
//     });
//     try {
//         const res = await client.get("https://javher.com/api/video/watch-ofje00525-1752807600000");
//         console.log("Used proxy:", client._proxy.url, "->", res.status, res.data);
//         await sleep(10000);
//     } catch (err) {
//         console.error("Request failed via", client._proxy.url, "-", err.message);
//     }
//     // }
// })();
