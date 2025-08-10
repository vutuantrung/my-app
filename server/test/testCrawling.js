const fs = require('fs');
const { parse } = require('node-html-parser');
// const path = require("path")
// const sanitize = require('sanitize-filename');
// const { getVideoData } = require('./youtubeServices');

// const gifData = fs.readFileSync("./redgifdata.json");
// const gifs = JSON.parse(gifData.toString());
// console.log(gifs.gifs.length);

// getVideoData("https://www.youtube.com/watch?v=TISf7ez-Tgg");


// const { parse } = require('node-html-parser');
// const { HTMLToJSON } = require('html-to-json-parser'); // CommonJS

// const ytUrls2 = [
// 	"https://www.youtube.com/watch?v=PWfgJDz8moA",
// 	"https://www.youtube.com/watch?v=wzzgrNgykx8",
// 	"https://www.youtube.com/watch?v=nAIrIL1kiFY"
// ]

// const { downloadVideosByUrl } = require('./services/youtubeServices');
// const ytUrls = [
// 	"https://www.youtube.com/watch?v=PWfgJDz8moA",
// 	"https://www.youtube.com/watch?v=wzzgrNgykx8",
// 	"https://www.youtube.com/watch?v=nAIrIL1kiFY"
// ]
// downloadVideosByUrl(ytUrls)

async function crawlModel(modelName) {
    let data = {},
        htmlContentRoot = null,
        pageCount = 1,
        personalDataCollected = false;

    const treatedAttr = [];
    while (true) {
        // Get from the second page
        const url = `https://www.javdatabase.com/idols/${modelName}/?ipage=${pageCount}`;
        await fetch(url, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        }).then(response => response.text()).then((htmlContent) => {
            htmlContentRoot = htmlContent;
        })
            .catch((err) => console.error(err));

        // Get the root
        const root = parse(htmlContentRoot);

        //// GET MODEL INFORMATION
        if (!personalDataCollected) {

            // 1. Personal data
            const modelInfoNode = root?.querySelector("h1[class='idol-name']")?.parentNode;
            if (modelInfoNode) {
                const newHtmlContent = modelInfoNode.innerHTML.replaceAll("\t-", "").replaceAll("\t", "")
                const allTexts = extractText(parse(newHtmlContent));

                treatedAttr.push(allTexts[0]);
                mainAttrLoop: for (let i = 1; i < allTexts.length; i++) {
                    if (allTexts[i].includes("[*]")) {
                        let newAttr = allTexts[i];
                        supAttrLoop: for (let j = i + 1; j < allTexts.length; j++) {
                            if (allTexts[j].includes("[*]") || allTexts[j] === "Suggest Tags" || j === allTexts.length - 1) {
                                treatedAttr.push(newAttr);
                                break supAttrLoop;
                            }
                            newAttr += allTexts[j];
                        }
                    }
                }

                for (let i = 0; i < treatedAttr.length; i++) {
                    if (i === 0) {
                        treatedAttr[i] = "Name:" + treatedAttr[i].replace("- JAV Profile", "").trim();
                        // data.name = treatedAttr[i].replace("- JAV Profile", "").trim();
                        // continue;
                    }
                    if (treatedAttr[i].includes("[*]Tags:")) {
                        treatedAttr[i] = treatedAttr[i].replaceAll("-", ",").trim();
                        // data.tags = treatedAttr[i].replaceAll("-", ", ").trim();
                        // continue;
                    }
                    if (treatedAttr[i].includes("[*]JP:")) {
                        treatedAttr[i] = treatedAttr[i].replaceAll("-", "").trim();
                        // data.jp = treatedAttr[i].replaceAll("-", "").trim();
                        // continue;
                    }
                    // treatedAttr[i] = treatedAttr[i].replace("[*]", "")
                    const [a, v] = treatedAttr[i].replace("[*]", "").split(":");
                    data[a.replace(" ", "_").toLowerCase()] = v;
                }
            }

            // 2. Rating data
            const ratingNode = root?.querySelector("div[class='post-ratings']");
            if (ratingNode) {
                const allTexts = extractText(ratingNode);
                // console.log(allTexts)
                const note = allTexts[0] === "(No Ratings Yet)"
                    ? "(No Ratings Yet)"
                    : allTexts.join(" ").replace(")", "").split("average:")[1].replace(" out of ", "/").trim();
                treatedAttr.push("Note: " + note);
                data.note = note;
            }

            // 3. Favorite count
            const favoriteCountNode = root?.querySelector("span[class='simplefavorite-button-count']");
            if (favoriteCountNode) {
                const allTexts = extractText(favoriteCountNode);
                treatedAttr.push("Favorite: " + allTexts[0]);
                data.favorite = allTexts[0]
            }

            // 4. Movies count
            const biographyNode = root?.querySelector("div[id='biography']");
            if (biographyNode) {
                const allTexts = extractText(biographyNode);
                const fullText = allTexts.map(e => e.trim().replaceAll("\r", "").replaceAll("\t", "").replaceAll("\n", "")).join(" ");
                const bioData = fullText.split(".").map(e => e.trim()).filter(e => e)
                const reg = /(.*) has starred in ([0-9]*) movies/;
                const test = bioData[bioData.length - 1].match(reg);
                treatedAttr.push("Movies count: " + test[2]);
                data.movies_count = test[2]
            }
            personalDataCollected = true;
        }

        //// GET MOVIES DATA
        {
            if (!data.movies) {
                data.movies = [];
            }
            const listNode = root?.querySelector(".facetwp-template > .row");
            const isEndListReached = listNode.innerText.trim() === "No censored movies found.";
            if (isEndListReached) {
                break;
            }

            const mNodes = listNode?.children;
            const newMovies = [];
            for (const mNode of mNodes) {
                const code = mNode.querySelector("p[class='display-6 pcard']").innerText.trim();
                // console.log('[code]', code)
                const movieLink = mNode.querySelector("p[class='display-6 pcard'] > a[class='cut-text']").getAttribute("href")
                // console.log('[movieLink]', movieLink)
                const thumbsNode = mNode.querySelector("div[class='movie-cover-thumb'] > a > img")
                // console.log('[thumbsSrc]', thumbsNode.getAttribute('src').replace("/thumb/", "/full/").replace("ps.webp", "pl.webp"))
                const movieDataNode = mNode.querySelector("div[class='mt-auto']");
                const movieData = extractText(movieDataNode);
                // console.log('[desc]', movieData[0]);
                // console.log('[publish date]', movieData[1]);
                newMovies.push({
                    code: code,
                    movieLink: movieLink,
                    thumbsShort: thumbsNode.getAttribute('src'),
                    thumbs: thumbsNode.getAttribute('src').replace("/thumb/", "/full/").replace("ps.webp", "pl.webp"),
                    desc: movieData[0],
                    releaseDate: movieData[1],
                    title: null,
                    genres: null,
                    studio: null,
                    trailer: null,
                    runtime: null,
                    favorite: null,
                    actress: null,
                    note: null,
                    thumbs: null
                })
            }

            data.movies = [...data.movies, ...newMovies];
            data.my_favorite = false;

            pageCount++;
        }
    }

    console.log(data)
    console.log(data.movies.length);

    fs.writeFileSync(`./${modelName}.json`, JSON.stringify(data))
}

function extractText(node, texts = []) {
    if (node.nodeType === 3) { // TEXT_NODE
        const trimmed = node.rawText.trim();
        if (trimmed) {
            if (node.parentNode?.rawTagName && node.parentNode.rawTagName.toLowerCase() === "b") {
                texts.push("[*]" + trimmed);
            } else {
                texts.push(trimmed);
            }

        }
    }
    if (node.childNodes && node.childNodes.length > 0) {
        for (const child of node.childNodes) {
            extractText(child, texts);
        }
    }
    return texts;
}

// crawlModel("reiran-akame");

async function crawlMovie(movieCode) {
    let data = {},
        htmlContentRoot = null;
    const filePath = `./${movieCode}.html`;

    const fileExists = fs.existsSync(filePath);

    if (!fileExists) {
        const url = `https://www.javdatabase.com/movies/${movieCode}/`;
        await fetch(url, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        }).then(response => response.text()).then((htmlContent) => {
            htmlContentRoot = htmlContent;
            fs.writeFileSync(filePath, htmlContent);
        })
            .catch((err) => console.error(err));
    }

    const htmlContentString = fs.readFileSync(filePath, "utf-8");
    const root = parse(htmlContentString);

    const dataNode = root.querySelector("div[class='movietable'] > div[class='row']");
    const allTexts = extractText(dataNode);
    const treatedAttr = [];
    mainAttrLoop: for (let i = 0; i < allTexts.length; i++) {
        if (allTexts[i].includes("[*]")) {
            let newAttr = allTexts[i];
            supAttrLoop: for (let j = i + 1; j < allTexts.length; j++) {
                if (allTexts[j].includes("[*]") || allTexts[j] === "View All Favorites" || j === allTexts.length - 1) {
                    if (newAttr[newAttr.length - 1] === ",") {
                        newAttr = newAttr.slice(0, -1);
                    }
                    treatedAttr.push(newAttr);
                    break supAttrLoop;
                }
                newAttr += allTexts[j] + ",";
            }
        }
    }

    for (let i = 0; i < treatedAttr.length; i++) {
        if (treatedAttr[i].includes("[*]Favorite:")) {
            treatedAttr[i] = treatedAttr[i].replaceAll("Favorite,", "").trim();
        }
        if (treatedAttr[i].includes("[*]Idol(s)/Actress(es)")) {
            treatedAttr[i] = "[*]Actress(es):" + treatedAttr[i].split(":")[1];
        }
        // // treatedAttr[i] = treatedAttr[i].replace("[*]", "")
        const [a, v] = treatedAttr[i].replace("[*]", "").split(":");
        data[a.replace(" ", "_").toLowerCase()] = v;
    }

    // 2. Rating data
    const ratingNode = root?.querySelector("div[class='post-ratings']");
    if (ratingNode) {
        const allTexts = extractText(ratingNode);
        // console.log(allTexts)
        const note = allTexts[0] === "(No Ratings Yet)"
            ? "(No Ratings Yet)"
            : allTexts.join(" ").replace(")", "").split("average:")[1].replace(" out of ", "/").trim();
        treatedAttr.push("Note: " + note);
        data.note = note;
    }

    // 3. Movie images
    if (!data.images) data.images = [];
    const imageNodes = root?.querySelector("div[id='lightboxModal']").parentNode.querySelector("div[class='container']").firstElementChild.children;
    for (const iNode of imageNodes) {
        const imgHref = iNode.firstElementChild.getAttribute("data-image-href");
        data.images.push(imgHref)
    }

    console.log(data)
}

crawlMovie("ofje-584");