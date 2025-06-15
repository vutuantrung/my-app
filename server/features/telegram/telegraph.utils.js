

const crypto = require('crypto');
const fs = require('fs');
const telegraph = require('telegraph-node');
const ph = new telegraph();

const options = {
    return_content: false,
};
const getPage = async url => {
    const crawledPageInfo = await ph.getPage(url, options).catch(err => {
        throw err;
    });

    return crawledPageInfo;
};

const editPage = async (accessToken, path, content) => {
    const editPageResult = await ph
        .editPage(accessToken, path, 'Edit_sample_test_page', content, options)
        .catch(err => {
            throw err;
        });
    console.log(editPageResult);
};

const createPage = async (accessToken, title, content) => {
    const createPageResult = await ph
        .createPage(accessToken, title, content, options)
        .catch(err => {
            throw err;
        });

    return createPageResult;
};

const createAccount = async () => {
    const createAccResult = await ph
        .createAccount('CK_0', {
            short_name: 'CK_SN',
            author_name: 'CK_AUTHOR',
        })
        .catch(err => {
            throw err;
        });

    return createAccResult;
};

/**
 * {
  short_name: 'CK_AUTHOR',
  author_name: '',
  author_url: '',
  access_token: '30c62863298ce3424db8214f2db2b064ca4db68cb306200039b62a2313bd',
  auth_url: 'https://edit.telegra.ph/auth/4SKEuRsHNruiUvKkoRCSVpBm7oyvZbb43TGxL8cyxG'
}
*/

const ACCESS_TOKEN =
    '26b0407b1d8b3e2c79bfea29597d76ec1679b147d5720664ecad7e13697e';

// Defining key
const secret = 'HAKU_BASE';

const createTitle = ({ path, url, title }) => {
    if (!path) {
        throw Error('Invalid path');
    }
    if (!url) {
        throw Error('Invalid url');
    }
    if (!title) {
        throw Error('Invalid title');
    }

    return crypto
        .createHash('sha256', secret)
        .update(`${path}${url}${title}`)
        .digest('hex');
};

const reUploadPage = async (targetUrl, modelName) => {
    try {
        if (!targetUrl) {
            throw Error('No target url found');
        }

        if (!modelName) {
            throw Error('No model name found');
        }
        //Get page
        const dataFilePath = `./telegram/${modelName}.json`;
        const crawledPageInfo = await getPage(targetUrl);

        // Create page
        const title = createTitle(crawledPageInfo);
        // Todo: get page if exists? -> need to know datetime
        const createPageResult = await createPage(
            ACCESS_TOKEN,
            title,
            crawledPageInfo.content
        );

        console.log('[CREATEPAGE]', createPageResult);

        let savedData = [];
        if (fs.existsSync(dataFilePath)) {
            savedData = fs.readFileSync(dataFilePath);
            savedData = JSON.parse(savedData);
        }

        const data = {
            model: crawledPageInfo.title.split(' - ')[0],
            accessToken: ACCESS_TOKEN,
            url: createPageResult.url,
            title: createPageResult.title,
            oTitle: crawledPageInfo.title,
            oPath: crawledPageInfo.path,
        };

        savedData = [data, ...savedData];

        console.log('[DATA]', data);

        fs.writeFileSync(dataFilePath, JSON.stringify(savedData), 'utf-8');

        console.log('[SUCCESS]');
    } catch (err) {
        console.warn('[ERROR]', err.message);
    }
};

module.exports = { createAccount, createPage, editPage, getPage, reUploadPage };
// https://rr5---sn-npoeenle.googlevideo.com/videoplayback?expire=1703451744&ei=AEiIZbjIB9KN_9EPws2RsAw&ip=186.179.39.137&id=o-AO01z1uMH9h7-JWUVTXE25TwGFzR7W8kyCVtedVBQVsp&itag=313&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C271%2C278%2C313&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&vprv=1&svpuc=1&mime=video%2Fwebm&ns=7ZXyAl0AW9Ao8DjX9pcTZa8Q&gir=yes&clen=142326970&dur=126.933&lmt=1703426252031755&keepalive=yes&fexp=24007246&c=TVHTML5_SIMPLY_EMBEDDED_PLAYER&txp=6219224&n=f92ZC5-6poJ91J_Mp_L&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAKfYTq6aRL1Ps2bh8i_QKzq0f0tIro12wXg_ro0p_eGnAiBsXLO_5rqSzievWHYIufmVMSjaV8Bs0XGtiRf7SVo0WA%3D%3D&redirect_counter=1&cm2rm=sn-ab5eee7e&req_id=fba417cba384a3ee&cms_redirect=yes&mh=x1&mip=113.169.211.27&mm=34&mn=sn-npoeenle&ms=ltu&mt=1703432611&mv=u&mvi=5&pl=23&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AAO5W4owRgIhAOlt5bXO7_IJd6GTZfokPc1JKM2kfbXJfqftZHVa7aI5AiEAxa4zu5XLk68q0b2Da_do0p2RXfXE9HteIY9aZVuyEec%3D
