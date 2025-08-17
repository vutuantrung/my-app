const fs = require("fs");

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

const { getJJGirlsImageIndex } = require("../features/jjgirls/jjgirls.utils.js")

async function execute() {
    const res = await getJJGirlsImageIndex("ryo-shinohara");
    console.log(res);
}

// const client = require('https');
// const { getJJGirlsImageIndex, isValidImageURL, } = require("./features/jjgirls/jjgirls.utils");
// const { downloadImageByUrl } = require("./helpers");
// function downloadImage(url, filepath) {
//     return new Promise((resolve, reject) => {
//         client.get(url, (res) => {
//             if (res.statusCode === 200) {
//                 res.pipe(fs.createWriteStream(filepath))
//                     .on('error', reject)
//                     .once('close', () => resolve(filepath));
//             } else {
//                 // Consume response data to free up memory
//                 res.resume();
//                 reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
//             }
//         });
//     });
// }

///// TESTING INSERT OR IGNORE MULTIPLE RECORDS IN DB
// const sqlite3 = require('sqlite3').verbose();
// const db = require("./database/db")
// const crypto = require('crypto');
// const { randomDate } = require("./commons/helpers.func");

// // Sample data: You can scale this up as needed
// const models = Array.from({ length: 26 }, (_, i) => ({
//     code: `code ${i + 1}` + crypto.randomBytes(8).toString('hex'),
//     dob: randomDate(new Date(1990, 0, 1), new Date(2000, 11, 31), 0, 23).toISOString().split('T')[0],
//     title: `Movie Title ${i + 1}`,
//     release_date: randomDate(new Date(2010, 0, 1), new Date(2023, 11, 31), 0, 23).toISOString().split('T')[0],
//     runtime: Math.floor(Math.random() * 120) + 60, // Random runtime between 60 and 180 minutes
//     thumbs_short: `https://example.com/thumbs_short_${i + 1}.jpg`,
//     metadata: JSON.stringify({ "data": "blabla", "more": "something more" }),
// }));

// models.push({
//     code: `code DUPLICATION TEST`,
//     dob: randomDate(new Date(1990, 0, 1), new Date(2000, 11, 31), 0, 23).toISOString().split('T')[0],
//     title: `Movie Title DUPLICATION TEST`,
//     release_date: randomDate(new Date(2010, 0, 1), new Date(2023, 11, 31), 0, 23).toISOString().split('T')[0],
//     runtime: Math.floor(Math.random() * 120) + 60, // Random runtime between 60 and 180 minutes
//     thumbs_short: `https://example.com/thumbs_short_DUPLICATION_TEST.jpg`,
//     metadata: JSON.stringify({ "data": "blabla", "more": "something more" }),
// })

// const properties = ["code", "title", "studio", "release_date", "runtime", "note", "favorite", "my_favorite", "thumbs_short", "thumbs", "metadata"];

// function createPropertiesCREATEColumns() {
//     return `(${properties.join(', ')})`;
// }

// function createPropertiesValues() {
//     return `(${properties.map(() => '?').join(', ')})`;
// }

// function createRecordArray(record) {
//     return properties.map((pName) => record[pName]);
// }

// // Function to insert records in batches of 10
// function insertMultipleRecords(records) {
//     db.serialize(() => {
//         db.run(`BEGIN TRANSACTION`);
//         const stmt = db.prepare(`
//             INSERT OR IGNORE INTO movie ${createPropertiesCREATEColumns()}
//             VALUES ${createPropertiesValues()}`);
//         for (const r of records) {
//             stmt.run(createRecordArray(r));
//         }
//         stmt.finalize();
//         db.run(`COMMIT`);
//     });
// }
// db.close();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// async function execute() {
//     const result = await downloadImageByUrl("https://japanesebeauties.one/japanese/shoko-takahashi/56/shoko-takahashi-5.jpg", "database/idol-avatars");
//     console.log(result)
// }
const crypto = require('crypto');
const { parse } = require('node-html-parser');
function check() {
    const htmlContentString = fs.readFileSync("./test/test.html", "utf-8");
    const root = parse(htmlContentString);

    let listNode = root?.querySelector("#primary > .row");
    const isEndListReached = listNode.innerText.trim().includes("No uncensored movies for this idol.");
    if (isEndListReached) {
        console.log("reach end");
        return;
    }

    const newMovies = [];
    const cardNodes = listNode.querySelectorAll(".card");
    for (const cardNode of cardNodes) {
        const title = cardNode.querySelector("p[class='display-6 pcard']").innerText.trim().replaceAll("\r\n", "").replace(/ +/g, " ");
        // console.log(JSON.stringify(cardNode.querySelector("p[class='display-6 pcard']").innerText));
        // console.log('[code]', code)
        const movieLink = cardNode.querySelector("p[class='display-6 pcard'] > a[class='cut-text']").getAttribute("href")
        // console.log('[movieLink]', movieLink)
        const thumbsNode = cardNode.querySelector("div[class='movie-cover-thumb'] > a > img");
        // console.log('[thumbsSrc]', thumbsNode.getAttribute('src').replace("/thumb/", "/full/").replace("ps.webp", "pl.webp"))
        const releasedDateNode = cardNode.querySelector("div[class='mt-auto']").innerText.trim().replaceAll("\t", "").replaceAll("\n", "").replace(/ +/g, " ");

        console.log('\n');
        console.log(title);
        console.log(movieLink);
        // console.log(thumbsNode.getAttribute('src'));
        // console.log(releasedDateNode);

        const hashed = crypto.createHash('md5').update(movieLink).digest('hex');
        const data = {
            code: crypto.createHash('md5').update(movieLink).digest('hex'),
            movieLink: movieLink,
            thumbsShort: thumbsNode.getAttribute('src'),
            thumbs: "",
            desc: "",
            releaseDate: releasedDateNode,
            title: title,
            genres: null,
            studio: null,
            trailer: null,
            runtime: null,
            favorite: null,
            actress: null,
            note: null,
            thumbs: null
        };
        console.log(data.code === hashed);
    }
}