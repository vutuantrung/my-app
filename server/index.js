const { app } = require('./serverHttp.js');
const { wss, broadcast } = require('./serverWS.js');

module.exports = { broadcast };