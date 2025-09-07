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
const { extractDataFromHref, extractText } = require("../features/webCrawler/webCrawler.utils.js");
function check() {
    let data = {};
    const htmlContentString = fs.readFileSync("./test/test.html", "utf-8");
    const root = parse(htmlContentString);

    // const dataNode = root.querySelector("div[class='movietable'] > div[class='row']");
    const dataNode = root.querySelector("#main > .entry-content");
    const allTexts = extractText(dataNode);
    const treatedAttr = [];
    for (let i = 0; i < allTexts.length; i++) {
        if (allTexts[i].includes("[*]")) {
            let newAttr = allTexts[i];
            for (let j = i + 1; j < allTexts.length; j++) {
                if (allTexts[j].includes("[*]") || allTexts[j] === "View All Favorites" || j === allTexts.length - 1) {
                    if (newAttr[newAttr.length - 1] === ",") {
                        newAttr = newAttr.slice(0, -1);
                    }
                    treatedAttr.push(newAttr);
                    break;
                }
                newAttr += allTexts[j] + ",";
            }
        }
    }

    for (let i = 0; i < treatedAttr.length; i++) {
        if (treatedAttr[i].includes("[*]Title:")) {
            treatedAttr[i] = treatedAttr[i].replaceAll("Title,", "").replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
        }
        if (treatedAttr[i].includes("[*]Favorite:")) {
            treatedAttr[i] = treatedAttr[i].replace("Favorite,", "").replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
        }
        if (treatedAttr[i].includes("[*]Idol(s)/Actress(es)")) {
            treatedAttr[i] = "[*]Actress(es):" + treatedAttr[i].split(":")[1];
        }
        // // treatedAttr[i] = treatedAttr[i].replace("[*]", "")
        const [a, v] = treatedAttr[i].replace("[*]", "").split(":");
        data[a.replace(" ", "_").toLowerCase()] = v;
    }

    // delete
    delete data['genre(s)'];
    delete data['actress(es)'];

    // 2. Rating data
    const ratingNode = root?.querySelector("div[class='post-ratings']");
    if (ratingNode) {
        const allTexts = extractText(ratingNode);
        const noRatingText = allTexts[0].replaceAll("\r", "").replaceAll("\n", "").replace(/\s\s+/g, ' ').trim();
        // console.log('[allTexts]', noRatingText)
        const note = noRatingText === "(No Ratings Yet)"
            ? noRatingText
            : allTexts.join(" ").replace(")", "").split("average:")[1].replace(" out of ", "/").trim();
        treatedAttr.push("Note: " + note);
        data.note = note;
    }

    // 3. Movie images
    if (!data.images) data.images = [];
    const imageNodes = root?.querySelector("div[id='lightboxModal']").parentNode.querySelector("div[class='container']")?.firstElementChild.children;
    if (Array.isArray(imageNodes)) {
        for (const iNode of imageNodes) {
            const imgHref = iNode.firstElementChild.getAttribute("data-image-href");
            data.images.push(imgHref);
        }
    }

    // 4. Movie thumbs
    if (!data.thumbs) {
        data.thumbs = { cover: "", full: "" };
    }
    const coverThumbContainer = root?.querySelector("div[id='thumbnailContainer'] > a > img");
    if (coverThumbContainer) {
        const src = coverThumbContainer.getAttribute("src");
        data.thumbs.cover = src;
    }
    const fullThumbContainer = root?.querySelector("div[id='poster-container'] > a > img");
    if (fullThumbContainer) {
        const src = fullThumbContainer.getAttribute("src");
        data.thumbs.full = src;
    }
    const videoThumbContainer = root?.querySelector("video");
    if (videoThumbContainer) {
        const src = videoThumbContainer.getAttribute("poster");
        if (!data.thumbs.cover) data.thumbs.cover = src;
        if (!data.thumbs.full) data.thumbs.full = src;
    }

    //// GET URLS
    {
        if (!data.collectMore) {
            data.collectMore = [];
        }
        const allURLElements = root.querySelectorAll("a");
        const allHrefs = allURLElements?.map(e => e.getAttribute("href"))?.filter(url => {
            if (url === "https://www.javdatabase.com/idols/") return false;
            if (!url.startsWith("https://www.javdatabase.com/idols/")) return false;
            const regCurrentIdol = /https:\/\/www\.javdatabase\.com\/idols\/.*\/\?ipage=[0-9]*/g;
            if (regCurrentIdol.test(url)) return false;
            const regComment = /https:\/\/www\.javdatabase\.com\/idols\/.*\/#comment-[0-9]*/g;
            if (regComment.test(url)) return false;

            return true;
        });

        if (Array.isArray(allHrefs)) {
            const hrefSets = Array.from(new Set(allHrefs));
            data.collectMore = hrefSets;
        }
    }

    //// GET FROM HREF
    const hrefData = extractDataFromHref(dataNode);
    // console.log('[movieData]', hrefData);

    data = { ...data, ...hrefData };
    console.log('[data]', data);

}

const path = require('path');
const { ProxyRotator } = require("../services/proxy.service.js");

function saveBase64VideoAsMp4(base64Data, outputFilePath) {
    // Remove the data URI prefix if present
    const base64String = base64Data.replace(/^data:video\/mp4;base64,/, '');

    // Decode Base64 to buffer
    const videoBuffer = Buffer.from(base64String, 'base64');

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

    // Write buffer to file
    fs.writeFileSync(outputFilePath, videoBuffer);

    console.log(`Video saved successfully at: ${outputFilePath}`);
}

// Example usage:
// const base64Video = fs.readFileSync('test/video_base64.txt', 'utf8'); // file containing base64 string
// saveBase64VideoAsMp4(base64Video, './video_converted.mp4');

// const axios = require("axios");
// const https = require("https");

// const agent = new https.Agent({
//     family: 4,               // force IPv4 (like curl -4)
//     minVersion: "TLSv1.2",   // don't use TLS1.0/1.1
//     maxVersion: "TLSv1.2",   // stop at TLS1.2, like your curl test
//     honorCipherOrder: true,
//     rejectUnauthorized: true // keep SSL verification ON
// });

// (async () => {
//     try {
//         // curl --noproxy "*" -4 --tls-max 1.2 --http1.1 -v https://www.javdatabase.com/movies/emcs-014/
//         const res = await fetch("https://www.javdatabase.com/idols/yurika-hiyama/", {
//             "headers": {
//                 "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//                 "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,vi;q=0.6",
//                 "cache-control": "max-age=0",
//                 "if-modified-since": "Sat, 30 Aug 2025 04:00:22 GMT",
//                 "priority": "u=0, i",
//                 "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
//                 "sec-ch-ua-mobile": "?0",
//                 "sec-ch-ua-platform": "\"Windows\"",
//                 "sec-fetch-dest": "document",
//                 "sec-fetch-mode": "navigate",
//                 "sec-fetch-site": "same-origin",
//                 "sec-fetch-user": "?1",
//                 "upgrade-insecure-requests": "1",
//                 "cookie": "_ga=GA1.3.477133654.1748142697; simplefavorites=%5B%7B%22site_id%22%3A1%2C%22posts%22%3A%5B427582%2C510992%5D%2C%22groups%22%3A%5B%7B%22group_id%22%3A1%2C%22site_id%22%3A1%2C%22group_name%22%3A%22Default%20List%22%2C%22posts%22%3A%5B427582%2C510992%5D%7D%5D%7D%5D; _gid=GA1.2.805061454.1756561569; _lscache_vary=89c822065a9c63d586d4df6a104ec0bb; search_post_type=movies,uncensored; cf_clearance=HuFhz0BaF90ctoyW3zJiJi7CLaQyRPZuDkz5f55x6FQ-1756707546-1.2.1.1-.H3iM8WIxWfcV73p1aZfKLdA_R7JtblsY6KjGbrXJNOIuhae2RuHGCM8YTjapzYCtTW7oAsZfLzMiHnj.EGYyUa2PRFdssr5FnMdTrxm6dzcr1OshCJRh1uygID8.SY2i6vT2rxsP_6DQT2RACOXmJYqfBd8dXVC32bK1qVDJ0jctnkRZrOzbmw7rZuqZTCiVA8R4rT3_C6.NTNlEB_iJv6wOOvsKNOIincZVmNsmSQ; _ga_HGMR25F5SD=GS1.3.1756707587.51.1.1756709336.0.0.0; _ga_90573ZRJ22=GS2.1.s1756707587$o103$g1$t1756709337$j60$l0$h0; _ga=GA1.1.477133654.1748142697",
//                 "Referer": "https://www.javdatabase.com/idols/chise-iori/"
//             },
//             "body": null,
//             "method": "GET"
//         });
//         if (!res.ok) {
//             console.log("not ok");
//         }
//         const data = await res.text();
//         console.log(data);
//         fs.writeFileSync("./test/htmlCONTENTTest.html", data)
//         console.log(res.status, res.headers["content-type"]);
//         console.log(res.data.slice(0, 500)); // print first 500 chars
//     } catch (err) {
//         console.error("Request failed:", err.message);
//     }
// })();


// const { chromium } = require('playwright');

// (async () => {
//     // Launch Chromium in headless mode
//     const browser = await chromium.launch({ headless: true });
//     // Create a new page
//     const page = await browser.newPage();
//     // Go to your target URL
//     await page.goto(
//         // 'https://www5.javmost.com/BMW-303/',
//         'https://www.javdatabase.com/idols/chise-iori/',
//         { timeout: 0 }
//     );
//     // Get the full HTML after JS execution
//     const html = await page.content();
//     console.log(html);
//     // Optionally extract specific text
//     const title = await page.title();
//     console.log("Page Title:", title);
//     // Close browser
//     await browser.close();
// })();

//https://pics.dmm.co.jp/digital/video/mikr00038/mikr00038jp-4.jpg
//https://pics.dmm.co.jp/digital/video/mikr00038/mikr00038pl.jpg
//https://pics.dmm.co.jp/digital/video/mikr00038/mikr00038ps.jpg
//https://pics.dmm.co.jp/mono/movie/adult/juq701/juq701pl.jpg
//https://pics.dmm.co.jp/mono/actjpgs/hatano_yui.jpg

//https://pics.dmm.co.jp/digital/video/sone00311/sone00311-1.jpg
//https://pics.dmm.co.jp/digital/video/sone00311/sone00311jp-1.jpg

//https://www.javdatabase.com/covers/full/mi/mikr00038pl.webp


// ---------- Example usage ----------
// (async () => {
//     const rotator = new ProxyRotator("round-robin"); // or "random"

//     // Rotate per request
//     for (let n = 0; n < 3; n++) {
//         const client = rotator.axiosForNextProxy();
//         try {
//             const res = await client.get("https://www.javdatabase.com/idols/yurika-hiyama/");
//             console.log("Used proxy:", client._proxy.url, "->", res.data);
//             await sleep(10000);
//         } catch (err) {
//             console.error("Request failed via", client._proxy.url, "-", err.message);
//             // You could retry with the next proxy here if desired
//         }
//     }
// })();