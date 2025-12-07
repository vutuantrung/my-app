
const http = require('http');
const WebSocket = require('ws');
const WS_SERVER_PORT = 3124;
const server = http.createServer(); // (optional) also serve HTTP if you want

// Bind to all interfaces so LAN devices can connect
server.listen(WS_SERVER_PORT, '0.0.0.0', () => {
	console.log(`WS listening on ws://0.0.0.0:${WS_SERVER_PORT}`);
});

const wss = new WebSocket.Server({ server });
// Track connected clients
const clients = new Set();
// Simple incremental id for messages
let nextId = 1;

/**
 * Broadcast a notification to all connected clients.
 *
 * @param {string} messageType - e.g. "movie.created", "idol.created", "system.info"
 * @param {string} title       - e.g. "New movie added"
 * @param {object} [data]      - arbitrary payload (movie, idol, meta, etc.)
 */
function broadcast(messageType, title, data = {}) {
	const payload = {
		id: nextId++,
		messageType,
		title,
		createdAt: new Date().toISOString(),
		data,
	};

	const json = JSON.stringify(payload);

	for (const ws of clients) {
		if (ws.readyState === WebSocket.OPEN) {
			ws.send(json);
		}
	}
}

wss.on('connection', (ws) => {
	console.log("New connection etablished...")
	clients.add(ws);

	// Optional: send a welcome message
	ws.send(
		JSON.stringify({
			id: nextId++,
			messageType: 'system.connected',
			title: 'Connected to notifications',
			createdAt: new Date().toISOString(),
			data: {},
		})
	);

	ws.on('close', () => {
		console.log("Connection closed.");
		clients.delete(ws);
	});

	ws.on('error', (err) => {
		console.error('[ws] client error:', err.message);
	});
});

module.exports = { wss, broadcast };