const tph = require('./telegraph.utils');

// upload the photo to the channel using bot.sendPhoto
const urls = [
    {
        url: 'https://telegra.ph/Alina-Becker---Dehya-04-11',
        title: 'Alina Becker - Dehya – Telegraph',
    },
];

// const args = process.argv;
const main = async () => {
    const modelName = 'AlinaBecker';
    // const path = args[2];
    // if (!path) {
    //   console.log('Path not found');
    //   return;
    // }

    const paths = urls.map(u => {
        return u.url;
    });

    console.log(paths);

    for (const path of paths) {
        console.log('[PATH]', path);
        await tph.reUploadPage(path.replace('https://telegra.ph/', ''), modelName);
    }
};

main();