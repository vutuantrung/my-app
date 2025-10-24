// Minimal fetch wrapper with timeout + JSON handling + errors
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.77:3123';

class HttpError extends Error {
	constructor(status, message, body) {
		super(message);
		this.status = status;
		this.body = body;
	}
}
export { HttpError };

function buildURL(path, params) {
	const url = new URL(path.startsWith('http') ? path : `${BASE_URL}${path}`);
	if (params) {
		Object.entries(params).forEach(([k, v]) => {
			if (v !== undefined && v !== null) url.searchParams.append(k, String(v));
		});
	}
	return url.toString();
}

class AbortControllerComposite {
	constructor(signals) {
		this.controller = new AbortController();
		this.signal = this.controller.signal;
		signals.forEach((s) =>
			s.addEventListener('abort', () => this.controller.abort(), { once: true })
		);
	}
}

export async function http(method, path, options = {}) {
	const { params, body, headers, signal, timeoutMs = 15000 } = options;
	const controller = new AbortController();
	const t = setTimeout(() => controller.abort(), timeoutMs);
	const mergedSignal = signal
		? new AbortControllerComposite([signal, controller.signal]).signal
		: controller.signal;

	try {
		const res = await fetch(buildURL(path, params), {
			method,
			headers: {
				Accept: 'application/json',
				...(body ? { 'Content-Type': 'application/json' } : {}),
				...(headers || {}),
			},
			body: body ? JSON.stringify(body) : undefined,
			signal: mergedSignal,
		});

		const text = await res.text();
		const data = text ? JSON.parse(text) : null;

		if (!res.ok) throw new HttpError(res.status, (data && data.message) || res.statusText, data);
		return data;
	} catch (e) {
		if (e?.name === 'AbortError') throw new HttpError(499, 'Request aborted/timeout');
		throw e;
	} finally {
		clearTimeout(t);
	}
}
