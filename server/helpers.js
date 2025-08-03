const axios = require('axios');
const path = require("path");
const fs = require("fs");

function secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h : "";
    const mDisplay = m > 0 ? m : "";
    const sDisplay = s > 0 ? s : "";

    const times = [hDisplay, mDisplay, sDisplay].filter(t => t);
    const value = times.reduce((acc, cur) => acc + ":" + cur);

    return value;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createPropertiesCREATEColumns(properties) {
    return `(${properties.join(', ')})`;
}

function createPropertiesValues(properties) {
    return `(${properties.map(() => '?').join(', ')})`;
}

function createPropertiesUPDATEColumns(updateData) {
    const setValues = [];
    const values = [];
    for (const [key, value] of Object.entries(updateData)) {
        if (key === "updated_time") continue;// Ignore current updated_time and replace it the newer one
        setValues.push(`${key} = ?`);
        values.push(value);
    }

    // Add updated_time value
    setValues.push("updated_time = ?");
    values.push(Date.now());
    return {
        setString: setValues.join(', '),
        valuesArr: values
    }
}

function createRecordArrayByPropertyName(properties, record) {
    return properties.map((pName) => record[pName]);
}

async function downloadImageByUrl(url, destFolder, fileName = "", proxy = null) {
    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            'Referer': 'https://google.com', // sometimes required
        };

        const options = {
            responseType: 'stream',
            headers,
            timeout: 10000,
        };

        if (proxy) {
            options.proxy = proxy;
        }

        // get File name
        fileName = fileName ? fileName : getFileNameFromUrl(url);
        console.log(fileName);

        const destPath = path.join(destFolder, fileName);

        // Ensure directory exists
        fs.mkdirSync(path.dirname(destFolder), { recursive: true });

        const response = await axios.get(url, options);
        const writer = fs.createWriteStream(destPath);

        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`✅ Downloaded to ${destPath}`);

        return true;
    } catch (err) {
        console.error('❌ Download failed:', err.message);
        return false;
    }
}

function getFileNameFromUrl(imageUrl) {
    try {
        const parsedUrl = new URL(imageUrl);
        return path.basename(parsedUrl.pathname);
    } catch (err) {
        console.error('Invalid URL:', err.message);
        return '';
    }
}

function treatIdolName(name) {
    if (!name.trim().includes(" ")) return name.toLowerCase();
    return name.trim().split(" ").map(e => e.toLowerCase()).join("-");
}

function treatMovieCode(code) {
    return code.toLowerCase();
}

module.exports = {
    secondsToHms,
    sleep,
    createPropertiesCREATEColumns,
    createPropertiesUPDATEColumns,
    createPropertiesValues,
    createRecordArrayByPropertyName,
    downloadImageByUrl,
    treatIdolName,
    treatMovieCode
}