const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const fs = require('fs');
const moment = require('moment');
const { fetchVideoDataYLTD } = require('../services/youtubeServices');
const { getAllUserMedia, getUserInformation } = require('../services/instagramServices');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

process.title = 'helper server';
