
const { sleep } = require("../../helpers");
const axios = require('axios');

BASE_IMAGE_TEMPLATE = 'https://jjgirls.com/japanese/#NAME#/#FOLDER#/#NAME#-#INDEX#.jpg';
STEP = 10;

async function checkNameExist(name) {
    const firstImgUrl = this.BASE_IMAGE_TEMPLATE
        .replaceAll('#NAME#', name)
        .replaceAll('#FOLDER#', 1)
        .replaceAll('#INDEX#', 1);
    const isUrlValid = await isValidImageURL(firstImgUrl);
    return isUrlValid;
}

async function getLastFolder(name) {
    async function stepUntilReachInvalid(step) {
        let isImage = true;
        let curStepCount = 0;
        while (isImage) {
            const newImageUrl = this.BASE_IMAGE_TEMPLATE
                .replaceAll('#NAME#', name)
                .replaceAll('#FOLDER#', (++curStepCount * step).toString())
                .replaceAll('#INDEX#', '1');
            // console.log(newImageUrl);
            isImage = await isValidImageURL(newImageUrl);
            await sleep(1000);
        }
        return curStepCount;
    }

    async function chooseRange(min, max) {
        if (max - min <= 1) {
            return { min, max }
        }
        const average = Math.round((max - min) / 2);
        const newImageUrl = this.BASE_IMAGE_TEMPLATE
            .replaceAll('#NAME#', name)
            .replaceAll('#FOLDER#', (min + average).toString())
            .replaceAll('#INDEX#', '1');
        const isImage = await isValidImageURL(newImageUrl);
        await sleep(1000);
        if (isImage) {
            return { min: max - average, max: max }
        }
        return { min: min, max: min + average }
    }

    async function getExactNumber(range, currentStepCount) {
        if (currentStepCount === 1) {
            let isImage = true;
            let curIndex = 0;
            while (isImage) {
                const newImageUrl = this.BASE_IMAGE_TEMPLATE
                    .replaceAll('#NAME#', name)
                    .replaceAll('#FOLDER#', (++curIndex).toString())
                    .replaceAll('#INDEX#', '1');
                isImage = await isValidImageURL(newImageUrl);
                await sleep(1000);
                // console.log(curIndex);
            }
            return curIndex;
        } else {
            let max = range * currentStepCount;
            let min = range * (currentStepCount - 1);
            if (max <= 0) throw new Error("Error: max");

            let values;
            while (max - min > 1) {
                values = await chooseRange(min, max);
                // console.log(values);
                max = values.max;
                min = values.min;
            }

            let isImage = true;
            const newImageUrl = this.BASE_IMAGE_TEMPLATE
                .replaceAll('#NAME#', name)
                .replaceAll('#FOLDER#', max.toString())
                .replaceAll('#INDEX#', '1');
            isImage = await isValidImageURL(newImageUrl);
            await sleep(1000);
            if (isImage) return max;
            return min;
        }
    }

    console.log("[STEP]", "Getting last folder index");
    const curStepCount = await stepUntilReachInvalid(this.STEP);
    console.log('[curStepCount]', curStepCount)
    const folderIndex = await getExactNumber(this.STEP, curStepCount);
    console.log('[curStepCount]', curStepCount, '[folderIndex]', folderIndex);

    // Check index
    console.log("[STEP]", "Getting last image index");
    let imageIndex = 12;
    let newImageUrl = this.BASE_IMAGE_TEMPLATE
        .replaceAll('#NAME#', name)
        .replaceAll('#FOLDER#', folderIndex.toString())
        .replaceAll('#INDEX#', imageIndex.toString());
    let isImage = await isValidImageURL(newImageUrl);
    await sleep(1000);

    if (!isImage) {
        for (let i = 1; i <= 12; i++) {
            let newImageUrl = this.BASE_IMAGE_TEMPLATE
                .replaceAll('#NAME#', name)
                .replaceAll('#FOLDER#', folderIndex.toString())
                .replaceAll('#INDEX#', i.toString());
            isImage = await isValidImageURL(newImageUrl);
            await sleep(1000);

            if (!isImage) {
                imageIndex = --imageIndex;
                break;
            }
        }
    }

    console.log('[STEP]', 'Done. Name: ' + name + '. Last folder: ' + folderIndex + '. Last image index: ' + imageIndex + ']');
    return { 'name': name, 'folder': folderIndex, 'index': imageIndex }
}

async function isValidImageURL(url) {
    try {
        const response = await axios.head(url, {
            timeout: 5000, // ms
            validateStatus: status => status < 500, // accept 4xx to analyze failures
        });

        const is404Redirected = response.request.path.includes("404.Not.Found.svg");
        const contentType = response.headers['content-type'];
        const isImage = contentType && contentType.startsWith('image/');
        const statusOK = response.status >= 200 && response.status < 300;

        return isImage && statusOK && !is404Redirected;
    } catch (err) {
        console.error('Error checking image:', err.message);
        return false;
    }
}

module.exports = { checkNameExist, getLastFolder, isValidImageURL };