const fs = require('fs');
const path = require('path');
const {
    IDOL_AVATAR_FOLDER,
    MOVIE_THUMBS_FOLDER,
    CACHED_FOLDER,
    SERVER_FOLDER_PATH
} = require('./constants.js');

if (!fs.existsSync(SERVER_FOLDER_PATH)) {
    console.log(`External DB path does not exist: ${SERVER_FOLDER_PATH}, please create theses folders:
		- ${IDOL_AVATAR_FOLDER}
		- ${MOVIE_THUMBS_FOLDER}
		- ${CACHED_FOLDER}`);
    return;
}

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// const puppeteer = require('puppeteer');

app.use(cors());
app.use(express.json());

// Serve static files from a 'public' directory
app.use('/images', express.static(path.join(process.cwd(), 'database')));
// console.log(path.join(process.cwd(), 'database'))

const idolProfileRoutes = require('./routes/idol.route.js');
app.use('/api/idol', idolProfileRoutes);
const movieRoutes = require('./routes/movie.route.js');

app.use('/api/movie', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});