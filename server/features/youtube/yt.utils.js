const fs = require('fs');
const path = require('path');
const moment = require('moment');
const ytdl = require('ytdl-core');
const { secondsToHms } = require('../helpers');
const { getAsync } = require('../apiHelpers');
const sanitize = require('sanitize-filename');
const axios = require('axios');

const TAG = 'YOUTUBE';

async function fetchVideoDataYLTD(url) {
    const options = { quality: 'highest' };
    const info = await ytdl.getInfo(url);
    const jsonValue = JSON.parse(JSON.stringify(info));

    const videoId = jsonValue['videoDetails']['videoId'];
    const dataVideoDetails = {
        title: jsonValue['videoDetails']['title'],
        embed: jsonValue['videoDetails']['embed'],
        viewCount: jsonValue['videoDetails']['viewCount'],
        uploadDate: moment(jsonValue['videoDetails']['uploadDate']).format('DD-MM-YYYY hh:mm:ss'),
        publishDate: moment(jsonValue['videoDetails']['publishDate']).format('DD-MM-YYYY hh:mm:ss'),
        lengthSeconds: secondsToHms(jsonValue['videoDetails']['lengthSeconds']),
        description: jsonValue['videoDetails']['description'],
        video_url: jsonValue['videoDetails']['video_url'],
        thumbnails: jsonValue['videoDetails']['thumbnails'],
    };

    const dataVideoFormat = jsonValue['formats'].map((val) => ({
        url: val['url'],
        mimeType: val['mimeType'],
        bitrate: val['bitrate'],
        fps: val['fps'],
        qualityLabel: val['qualityLabel'],
        width: val['width'],
        height: val['height'],
        contentLength: val['contentLength'],
        quality: val['quality'],
        projectionType: val['projectionType'],
        hasVideo: val['hasVideo'],
        hasAudio: val['hasAudio'],
    }));

    const staticalData = await getAsync('https://returnyoutubedislikeapi.com/votes?videoId=' + videoId);

    const videoData = {
        ...dataVideoDetails,
        ...staticalData.data,
        formats: dataVideoFormat,
    };

    fs.writeFileSync('videoData.json', JSON.stringify(videoData));

    return videoData;
}

async function fetchVideoData(url) {
    const req = await fetch("https://www.clipto.com/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
    });

    if (!req.ok) {
        return { success: false, error: req.statusText };
    }
    const data = await req.json();
    // console.log(data)
    return data;
}

async function downloadVideosByUrl(urls) {
    const RETRY_MAX = 3;
    if (!Array.isArray(urls) || urls.length === 0) {
        console.log(TAG, 'No urls found');
        return;
    }

    for (let i = 0; i < urls.length; i++) {
        console.log("Video url:", urls[i]);
        //// 1. Get youtube video download url
        let retrievedData = null;
        for (let retryTime = 0; retryTime < RETRY_MAX; retryTime++) {
            const data = await fetchVideoData(urls[i]);
            if (data.success) {
                retrievedData = data;
                break;
            }

            console.log(TAG, `Retrying ${retryTime} time... (3s)`, data.error || data.message);
            await sleep(3000);
        }

        if (!retrievedData) {
            console.log(TAG, 'Error when fetching video data: ', urls[i]);
            const text = `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [FETCHING] ${urls[i]}\r\n`
            appendTextToFile(text, "./savefiles/youtubeDownloadFailed.log");
            console.log("\r\n\r\n\r\n");
            continue;
        }

        console.log("[TASK] Fetch video success => Find best video");

        //// 2. Get best video (highest resolution)
        const medias = retrievedData.medias.filter(m => m.type === 'video');
        const bestVideo =
            medias.find(m => m.quality === '4320p' && m.extension === 'mp4') ||
            medias.find(m => m.quality === '2160p' && m.extension === 'webm') ||
            medias.find(m => m.quality === '2160p60' && m.extension === 'webm') ||
            medias.find(m => m.quality === '1440p' && m.extension === 'webm') ||
            medias.find(m => m.quality === '1440p60' && m.extension === 'webm') ||
            medias.find(m => m.quality === '1080p' && m.extension === 'webm') ||
            medias.find(m => m.quality === '1080p60' && m.extension === 'webm') ||
            medias.find(m => m.quality === '1080p60' && m.extension === 'mp4') ||
            medias.find(m => m.quality === '1080p60' && m.extension === 'mp4');

        if (!bestVideo) {
            console.log(TAG, 'Error when getting best video: ', urls[i]);
            const text = `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [FILTERING] ${urls[i]}\r\n`
            appendTextToFile(text, "./savefiles/youtubeDownloadFailed.log");
            console.log("\r\n\r\n\r\n");
            continue;
        }
        console.log('[bestVideo found]', bestVideo)
        console.log("[TASK] Best video found => Download");

        //// 3. Download video
        const saveDir = path.join(__dirname, '..', 'savefiles');
        const videoName = sanitize(`${retrievedData.title}.${bestVideo.extension}`);
        const videoPath = path.join(saveDir, videoName);


        const isVideoDownloaded = fs.existsSync(videoPath);
        if (isVideoDownloaded) {
            console.log(TAG, 'Video is already downloaded: ', urls[i]);
            const text = `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [DOWNLOAD] ${urls[i]}\r\n`
            appendTextToFile(text, "./savefiles/youtubeDownloadSuccess.log");
            console.log("\r\n\r\n\r\n");
            continue;
        }
        const videoUrl = bestVideo.url;
        try {
            await downloadVideo(videoUrl, videoPath);

            console.log(TAG, 'Download successfully', urls[i]);
            const text = `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [DOWNLOAD] ${urls[i]}\r\n`
            appendTextToFile(text, "./savefiles/youtubeDownloadSuccess.log");
        } catch (error) {
            console.log(TAG, 'Error when downloading video: ', urls[i], error.message);
            const text = `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [DOWNLOAD] ${urls[i]}\r\n`
            appendTextToFile(text, "./savefiles/youtubeDownloadFailed.log");
        }
        console.log("\r\n\r\n\r\n");
    }
}

function removeDuplicateUrls(filePath, destPath, externalUrls = []) {
    let data = fs.readFileSync(filePath, 'utf-8');
    if (!data) {
        console.log(TAG, 'File not found', filePath);
        return;
    }

    data = data
        .replaceAll('\r', '')
        .split('\n')
        .concat(externalUrls)
        .filter((e) => {
            if (!e) return false;
            if (!e.startsWith('https://www.youtube.com')) return false;

            return true;
        })
        .map((e) => {
            const orgUrl = e.split('&')[0].replace('/videos', '');
            return orgUrl;
        });
    console.log('Finish treating url array', data.length, 'url found');

    /// CREATING SET
    data = Array.from(new Set(data));
    console.log('Finish removing dup from url array', data.length, 'url found');

    /// FILTER
    const page = [],
        watch = [],
        search = [],
        shorts = [],
        unknown = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].startsWith('https://www.youtube.com/watch')) {
            watch.push(data[i]);
            continue;
        }
        if (data[i].startsWith('https://www.youtube.com/results')) {
            search.push(data[i]);
            continue;
        }
        if (data[i].startsWith('https://www.youtube.com/shorts')) {
            shorts.push(data[i]);
            continue;
        }
        if (data[i].startsWith('https://www.youtube.com/@')) {
            page.push(data[i]);
            continue;
        }
        unknown.push(data[i]);
    }

    /// SAVE IN FILE
    if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
    }
    fs.writeFileSync(destPath, '');
    fs.appendFileSync(destPath, `[updated_time] ${moment().format('YYYY-MM-DD')}\r\n\r\n`);

    if (page.length > 0) {
        fs.appendFileSync(destPath, '[page]\r\n');
        for (let i = 0; i < page.length; i++) {
            fs.appendFileSync(destPath, page[i] + '\r\n');
        }
        fs.appendFileSync(destPath, '\r\n');
        console.log('Finish writing data to file by style page', page.length, 'url');
    }

    if (watch.length > 0) {
        fs.appendFileSync(destPath, '[watch]\r\n');
        for (let i = 0; i < watch.length; i++) {
            fs.appendFileSync(destPath, watch[i] + '\r\n');
        }
        fs.appendFileSync(destPath, '\r\n');
        console.log('Finish writing data to file by style watch', watch.length, 'url');
    }

    if (search.length > 0) {
        fs.appendFileSync(destPath, '[search]\r\n');
        for (let i = 0; i < search.length; i++) {
            fs.appendFileSync(destPath, search[i] + '\r\n');
        }
        fs.appendFileSync(destPath, '\r\n');
        console.log('Finish writing data to file by style search', search.length, 'url');
    }

    if (shorts.length > 0) {
        fs.appendFileSync(destPath, '[shorts]\r\n');
        for (let i = 0; i < shorts.length; i++) {
            fs.appendFileSync(destPath, shorts[i] + '\r\n');
        }
        fs.appendFileSync(destPath, '\r\n');
        console.log('Finish writing data to file by style short', shorts.length, 'url');
    }

    if (unknown.length > 0) {
        fs.appendFileSync(destPath, '[unknown]\r\n');
        for (let i = 0; i < unknown.length; i++) {
            fs.appendFileSync(destPath, unknown[i] + '\r\n');
        }
        fs.appendFileSync(destPath, '\r\n');
        console.log('Finish writing data to file by style unknown', unknown.length, 'url');
    }
}

// Helper functions
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadVideo(url, path) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    });

    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

function appendTextToFile(text, filePath) {
    fs.appendFile(filePath, text, function (err) {
        if (err) throw err;
        console.log('Data appended to file!');
    });
}

module.exports = { fetchVideoDataYLTD, fetchVideoData, downloadVideosByUrl, removeDuplicateUrls };
