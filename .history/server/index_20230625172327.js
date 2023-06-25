// index.js
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'Your-Channel-Access-Token', // LINE Developers Consoleで取得したものを入力します
  channelSecret: 'Your-Channel-Secret', // LINE Developers Consoleで取得したものを入力します
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const echo = { type: 'text', text: `To play the game, please click this link: line://app/Your-LIFF-ID` }; // Your-LIFF-IDを実際のLIFF IDに書き換えます
  return client.replyMessage(event.replyToken, echo);
}

app.listen(3000);
