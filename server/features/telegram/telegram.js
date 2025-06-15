const botToken = '6020306202:AAFKYkL0Gt0_NhiUjLOSW9S3pzvhuLMLBB0';
const bot = new TelegramBot(botToken, { polling: true });
const channel = '@viSDfoK7Yf_GNSd3Pfdt8_0ZAWK5Ot8L'; // replace <CHANNEL USERNAME> with the username of the channel you want to send the photo to
// const TelegramBot = require('node-telegram-bot-api');
// const imgBuffer1 = fs.createReadStream('./imgsUpload/IMG_TEST_1.jpg');
// const imgBuffer2 = fs.createReadStream('./imgsUpload/IMG_TEST_2.jpg');

const sendMediaGroup = async () => {
  bot
    .sendMediaGroup(channel, [
      { type: 'photo', media: imgBuffer1 },
      { type: 'photo', media: imgBuffer2 },
    ])
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.error('Error sending photo: ', error);
    });
};

const uploadPhoto = async path => {
  const uploadResult = await bot.sendDocument(
    channel,
    { source: path },
    {
      caption: files[0],
    }
  );

  console.log(uploadResult);
};
