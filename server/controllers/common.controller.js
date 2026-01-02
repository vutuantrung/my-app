const { searchIdol } = require("./idol.controller");
const { searchMovie } = require("./movie.controller");

function checkMovieOrIdol(identify) {
	//const dateMilisecondLength = "xxxxxxxxxxxxx".length;
	if (!identify) return "unknown";
	if (identify.includes(",")) return "idol";
	const regex = /\b\d{13}\b/;
	if (regex.test(identify)) return "movie";
	if (/\d/.test(identify)) return "movie";
	return "idol";
}

async function searchByIdentify(req, res) {
	try {
		const { identify } = req.body;
		if (identify.includes(",")) isIdol = true;

		const mode = checkMovieOrIdol(identify);
		if (mode === "unknown") {
			throw new Error("Cannot detect searching mode");
		}

		if (mode === "idol") {
			req.body.name = identify;
			return searchIdol(req, res);
		}

		if (mode === "movie") {
			req.body.code = identify;
			return searchMovie(req, res);
		}
	} catch (error) {
		console.error(error.message);
	}
}

module.exports = { searchByIdentify }