const { searchIdol } = require("./idol.controller");
const { searchMovie } = require("./movie.controller");

async function searchByIdentify(req, res) {
    try {
        const { identify } = req.body;
        const isMovie = /\d/.test(identify);

        if (isMovie) {
            req.body.code = identify;
            return searchMovie(req, res);
        } else {
            req.body.name = identify;
            return searchIdol(req, res);
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { searchByIdentify }