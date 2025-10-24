const streamPipeline = promisify(pipeline);
const DEFAULT_TIMEOUT_MS = 30_000;

async function downloadMovieByUrl(url, destFolder, fileName, timeoutMs) {
	// Timeout via AbortController
	const controller = new AbortController();
	const t = setTimeout(() => controller.abort(new Error("Fetch timeout")), timeoutMs);

	let res;
	try {
		res = await fetch(url, {
			method: "GET",
			signal: controller.signal,
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
				"Accept": "video/mp4, */*;q=0.8",
				"Accept-Encoding": "identity;q=1, *;q=0", // no gzip
				"sec-ch-ua": '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"Windows"',
				"sec-fetch-dest": "video",
			}
		});
	} finally {
		clearTimeout(t);
	}

	if (!res.ok) {
		throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
	}

	const ctype = res.headers.get("content-type") || "";
	const clen = Number(res.headers.get("content-length") || 0);

	// Strong opinion: reject obviously wrong responses early.
	if (!/video\/mp4|application\/octet-stream/i.test(ctype)) {
		throw new Error(`Unexpected content-type "${ctype}" for ${url}`);
	}
	if (Number.isFinite(clen) && clen <= 0) {
		throw new Error(`Empty content-length for ${url}`);
	}
	if (!res.body) {
		throw new Error(`No response body for ${url}`);
	}

	const destPath = path.join(destFolder, fileName);
	const fileStream = fs.createWriteStream(destPath, { flags: "w" });
	await streamPipeline(res.body, fileStream);

	return { bytes: Number.isFinite(clen) ? clen : undefined };
}

async function executeForTest(data) {
	const uncensoredVideoUrl = 'https://fourhoi.com/#DVD_ID#-uncensored-leak/preview.mp4';
	const normalVideoUrl = 'https://fourhoi.com/#DVD_ID#/preview.mp4';
	const engDubVideoUrl = 'https://fourhoi.com/#DVD_ID#-english-subtitle/preview.mp4';

	const hosts = [uncensoredVideoUrl, normalVideoUrl, engDubVideoUrl]
	for (const host of hosts) {
		const url = host.replace("#DVD_ID#", data.dvd_id.toLowerCase());
		try {
			const fileName = data.dvd_id + "-preview.mp4";
			const { bytes } = await downloadMovieByUrl(url, MOVIE_THUMBS_FOLDER, fileName, 20_000);
			return { success: true, url, bytes };
		} catch (err) {
			console.log("Download preview error:", err?.message || String(err));
			// errors.push({ host, error: err?.message || String(err) });
			// Try next host
		}
	}
}