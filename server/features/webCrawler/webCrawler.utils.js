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

function extractRawNamesIdol(node) {
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

module.exports = { extractText, extractRawNamesMovie, extractRawNamesIdol }