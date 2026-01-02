const { mainApp } = require('./serverHttp.js');
const { app } = require('./serverHelper.js');
const { wss, broadcast } = require('./serverWS.js');

module.exports = { broadcast };