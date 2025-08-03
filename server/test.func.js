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

const client = require('https');
const { getLastFolder, isValidImageURL, } = require("./features/jjgirls/jjgirls.utils");
const { downloadImageByUrl } = require("./helpers");
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

const testobj = {
    name: 'fuua-kaede',
    dob: '2001-03-30',
    measurements: '93-59-88',
    height: '170 cm',
    country: '?',
    cup: 'F',
    movies_count: '169',
    note: '4.50/5',
    favorite: '152',
    my_favorite: 0,
    jp: '楓ふうあ',
    created_time: 1754236361082,
    updated_time: 1754236361082,
    metadata: '{"avatar":"https://www.javdatabase.com/idolimages/full/fuua-kaede.webp","age":"24","debut":"2021-08-13","sign":"Aries","blood":"?","shoe_size":"?","hair_length":"Long","hair_color":"Brown","tags":"birth_year:2001.00,2001.00|debut_year:2021.00,2021.00|debut_age:20.00,20.00|starsign:aries|cup_size:f|height:170.00,170.00|hair_length:long|hair_color:brown|age_group:twenties"}'
}