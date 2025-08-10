const axios = require('axios');
const path = require("path");
const fs = require("fs");
const { default: parse } = require('node-html-parser');
const { default: render } = require('dom-serializer');
const { CLIENT_RENEG_LIMIT } = require('tls');

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

        const destPath = path.join(destFolder, fileName);
        if (fs.existsSync(destPath)) {
            console.log(`⚠️  ${fileName} downloaded.`);
            return true;
        }

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

function toMime(ext) {
    switch (ext.toLowerCase()) {
        case '.png': return 'image/png';
        case '.jpg':
        case '.jpeg': return 'image/jpeg';
        case '.gif': return 'image/gif';
        case '.svg': return 'image/svg+xml';
        case '.webp': return 'image/webp';
        case '.bmp': return 'image/bmp';
        case '.ico': return 'image/x-icon';
        default: return 'application/octet-stream';
    }
}

function dashToTitleCase(input) {
    if (typeof input !== 'string') return '';
    return input
        .split('-')
        .map(word => {
            if (!word) return '';
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}

function updateHTMLTemplate(idolData, moviesData) {
    const htmlTemplateString = fs.readFileSync("./assets/TEMPLATE_IDOL.html", "utf-8");
    const html = parse(htmlTemplateString);

    const idolMetadata = JSON.parse(idolData.metadata)

    // avatar
    const imagePath = `./database/idol-avatars/${idolData.name}-avatar.jpg`;
    const abs = path.resolve(imagePath);
    const b64 = fs.readFileSync(imagePath, "base64");
    const mime = toMime(path.extname(abs));
    const dataUri = `data:${mime};base64,${b64}`;
    html.querySelector("img[class='avatar-img']").setAttribute("src", dataUri);

    // bios
    const dateOfBirth = idolData.dob;
    const biosElement = html.querySelector("div[class='bios']");
    if (dateOfBirth) {
        const ele = `<div class="bio-info"><span class="label">Date of birth</span><span class="value">${dateOfBirth}</span></div>`;
        biosElement.innerHTML += ele;
    }

    const dateOfDebut = idolMetadata.debut;
    if (dateOfDebut) {
        const ele = `<div class="bio-info"><span class="label">Date of debut</span><span class="value">${dateOfDebut}</span></div>`;
        biosElement.innerHTML += ele;
    }

    const moviesCount = idolData.movies_count;
    if (moviesCount) {
        const ele = `<div class="bio-info"><span class="label">Movies count</span><span class="value">${moviesCount}</span></div>`;
        biosElement.innerHTML += ele;
    }

    const measurements = `${idolData.measurements} (${idolData.cup})`;
    if (measurements) {
        const ele = `<div class="bio-info"><span class="label">Measurements</span><span class="value">${measurements}</span></div>`;
        biosElement.innerHTML += ele;
    }

    // name
    let name = dashToTitleCase(idolData.name);
    if (idolData.jp) {
        name += ` (${idolData.jp})`;
    }
    html.querySelector("#idolName").innerHTML = name;

    // flag
    html.querySelector("img[class='nation-flag']").src = "https://www.countryflags.com/wp-content/uploads/japan-flag-png-large.png";

    // tags
    const tags = idolMetadata.tags.split("|");
    const tagsElement = html.querySelector("div[class='tags']");
    for (const tag of tags) {
        if (tag.includes("age_group") || tag.includes("body_type")) {
            const tagVal = dashToTitleCase(tag.split(":")[1]);
            const tagElement = `<span class="tag">${tagVal}</span>`;
            tagsElement.innerHTML += tagElement;
        }
    }

    const note = idolData.note;
    if (note) {
        const eleTemplate = `
            <span id="tag-note" class="tag tag-icon">
                <svg width="15px" height="15px" viewBox="0 0 24 24">
                    <g id="SVGRepo_iconCarrier">
                        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                            fill="#fff824"></path>
                    </g>
                </svg>
                <div id="tag-note-val">${note}</div>
            </span>`;
        html.querySelector("div[class='tags']").innerHTML += eleTemplate;
    }

    const fav = idolData.favorite;
    if (fav) {
        const eleTemplate = `
            <span id="tag-fav" class="tag tag-icon">
                <svg fill="#ff0000" height="15px" width="15px" viewBox="0 0 512 512">
                    <g id="SVGRepo_iconCarrier">
                        <path d="M467.204,67.921C412.786,20.394,329.86,25.984,282.31,80.365l-26.311,29.66l-26.311-29.66 C182.138,25.984,99.212,20.396,44.795,67.921c-54.437,47.543-60.045,130.51-12.503,184.946l185.641,206.535 c9.692,10.783,23.568,16.968,38.067,16.968c14.499,0,28.375-6.185,38.067-16.968L479.546,253.05l0.161-0.182 C527.251,198.431,521.641,115.464,467.204,67.921z">
                        </path>
                    </g>
                </svg>
                <div id="tag-fav-val">${fav}</div>
            </span>`;
        html.querySelector("div[class='tags']").innerHTML += eleTemplate;
    }

    // links
    const javdatabaseLink = `
        <nav class="links" aria-label="Links">
            <a class="link" href="https://www.javdatabase.com/idols/${idolData.name}/">
                <span class="dot"></span>
                <span>JAV Database</span>
            </a>
        </nav>`;
    html.querySelector("div[class='links-section']").innerHTML += javdatabaseLink;
    if (idolData.jjgirlData) {
        const jjgirlsLink = `
            <nav class="links" aria-label="Links">
                <a class="link" href="https://jjgirls.com/japanese/${idolData.name}/1/">
                    <span class="dot"></span>
                    <span>JJGirls</span>
                </a>
            </nav>`;
        html.querySelector("div[class='links-section']").innerHTML += jjgirlsLink;

        const jjgilrsLinkIcon = `<img style="height: 25px; margin-right: 5px;" src="https://jjgirls.com/favicon.ico" />`;
        html.querySelector("nav[class='source-links']").innerHTML += jjgilrsLinkIcon;
    }

    // movie thumbs
    let movieDisplayCount = 1;
    // Todo: shuffle movies array
    const shuffledMoviesData = shuffleArray(moviesData);
    for (const movie of shuffledMoviesData) {
        if (movieDisplayCount > 8) break;
        const imgHtmlString = `<img class="movie-thumbs" src="${movie.thumbs_short}" />`
        html.querySelector("div[class='gallery']").innerHTML += imgHtmlString;
        movieDisplayCount++;
    }

    return html.toString();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    treatMovieCode,
    toMime,
    updateHTMLTemplate
}