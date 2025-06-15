const fs = require("fs");
const { parse } = require('node-html-parser');

const urls = [
    "https://www.javdatabase.com/idols/?_sort_=most_favorited",
    "https://www.javdatabase.com/idols/?_age_group=teen",
    "https://www.javdatabase.com/idols/?_age_group=twenties",
    "https://www.javdatabase.com/idols/?_age_group=milf",
    "https://www.javdatabase.com/idols/?_age_group=mature",
    "https://www.javdatabase.com/idols/?_body_type=big-tits",
    "https://www.javdatabase.com/idols/?_body_type=big-ass",
    "https://www.javdatabase.com/idols/?_body_type=loli",
    "https://www.javdatabase.com/idols/?_birth_year=1994.00%2C1994.00",
    "https://www.javdatabase.com/idols/?_debut_year=2013.00%2C2013.00",
    "https://www.javdatabase.com/idols/?_debut_age=19.00%2C19.00",
    "https://www.javdatabase.com/idols/?_birthplace=kyoto",
    "https://www.javdatabase.com/idols/?_starsign=pisces",
    "https://www.javdatabase.com/idols/?_cup_size=j",
    "https://www.javdatabase.com/idols/?_height=161.00%2C161.00",
    "https://www.javdatabase.com/idols/?_hair_length=long",
    "https://www.javdatabase.com/idols/?_hair_color=black",
    "https://www.javdatabase.com/idols/?_hair_color=brown",
    "https://www.javdatabase.com/idols/?_body_type=slim",
    "https://www.javdatabase.com/idols/fumika-nagano/",
    "https://www.javdatabase.com/idols/?_cup_size=e",
    "https://www.javdatabase.com/idols/mamiko-fujieda/",
    "https://www.javdatabase.com/idols/?_cup_size=c",
    "https://www.javdatabase.com/idols/chika-harada/",
    "https://www.javdatabase.com/idols/?_height=162.00%2C162.00",
    "https://www.javdatabase.com/idols/erina-asou/",
    "https://www.javdatabase.com/idols/?_cup_size=f",
    "https://www.javdatabase.com/idols/?_height=170.00%2C170.00",
    "https://www.javdatabase.com/idols/mio-adachi/",
    "https://www.javdatabase.com/idols/?_height=165.00%2C165.00",
    "https://www.javdatabase.com/idols/akane-ayaka/",
    "https://www.javdatabase.com/idols/?_cup_size=i",
    "https://www.javdatabase.com/idols/yumika-nanaki/",
    "https://www.javdatabase.com/idols/mayuri-hanamura/",
    "https://www.javdatabase.com/idols/rara-anzai/"
];

function execute() {
    for (const url of urls) {
        const decodeUrl = decodeURIComponent(url);
        const reg = /https:\/\/www\.javdatabase\.com\/idols\/\?_(?<tag_name>.*)=(?<tag_val>.*)/;
        const match = decodeUrl.match(reg);
        if (match?.groups) {
            console.log(match.groups.tag_name, match.groups.tag_val);
        }
    }
}

function extractRawNamesMovie(node) {
    const data = {};
    const allURLElements = node.querySelectorAll("a");
    const genres = [], idols = [];
    for (const aElement of allURLElements) {
        const href = aElement.getAttribute("href");
        if (!href) continue;

        const name = aElement.innerText.replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ');

        const decodeUrl = decodeURIComponent(href);
        // if href of "serie"
        const regSerie = /https:\/\/www\.javdatabase\.com\/series\/(?<serie>.*[^\/])\/*/;
        if (regSerie.test(decodeUrl)) {
            const matchGroups = decodeUrl.match(regSerie);
            data.serie = { raw: matchGroups.groups.serie, name: name };
            continue;
        }

        // if href of "studio"
        const regStudio = /https:\/\/www\.javdatabase\.com\/studios\/(?<studio>.*[^\/])\/*/;
        if (regStudio.test(decodeUrl)) {
            const matchGroups = decodeUrl.match(regStudio);
            data.studio = { raw: matchGroups.groups.studio, name: name };
            continue;
        }

        // if href of "genre"
        const regGenre = /https:\/\/www\.javdatabase\.com\/genres\/(?<genre>.*[^\/])\/*/;
        if (regGenre.test(decodeUrl)) {
            const matchGroups = decodeUrl.match(regGenre);
            genres.push({ raw: matchGroups.groups.genre, name: name });
            continue;
        }

        // if href of "idol"
        const regIdol = /https:\/\/www\.javdatabase\.com\/idols\/(?<idol>.*[^\/])\/*/;
        if (regIdol.test(decodeUrl)) {
            const matchGroups = decodeUrl.match(regIdol);
            idols.push({ raw: matchGroups.groups.idol, name: name });
            continue;
        }
    }

    data.genres = genres;
    data.idols = idols;

    return data;
}

function extractRawNamesIdols(node) {
    const allHrefUrls = node.querySelectorAll("a").map(e => e.getAttribute("href")).filter(e => e);
    const removedDupHrefs = Array.from(new Set(allHrefUrls));
    const tags = [];
    for (const href of removedDupHrefs) {
        const decodeUrl = decodeURIComponent(href);
        console.log(decodeUrl);
        const reg = /https:\/\/www\.javdatabase\.com\/idols\/\?_(?<tag_name>.*)=(?<tag_val>.*)/;
        const match = decodeUrl.match(reg);
        if (match?.groups) {
            tags.push({ name: match.groups.tag_name, value: match.groups.tag_val });
        }
    }

    return tags;
}

const htmlString = fs.readFileSync("./test.html", "utf-8")
const result = extractRawNamesIdols(parse(htmlString));
console.log(result);

const client = require('https');
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });
    });
}

// https://www.javdatabase.com/covers/full/pf/pf_o1_abf-137.webp
// https://www.javdatabase.com/covers/thumb/pf/pf_o1_abf-137.webp
// downloadImage('https://www.javdatabase.com/covers/thumb/pf/pf_o1_abf-137.webp', 'pf_o1_abf-137.webp');

// execute()