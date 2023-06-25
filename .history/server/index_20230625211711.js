const bodyParser = require('body-parser');
app.use(bodyParser.json());
// index.js
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'zV5sYFTbQ61zF9+ySdcYh+jd3disZ/DyU2fxyTOGSG44uPl8d6SZyaqsGdF5V17Q8TMrDDjdUEBylSYpifUvJUsloGz2m3MI1kG6nOMWCds5OlLAJ6dV14Wi4OXGjSgfxPanDYImzdnKF13l1ysjkQdB04t89/1O/w1cDnyilFU=', // LINE Developers Consoleで取得したものを入力します
  channelSecret: '13df6e5457d0ef1e9e2097dc4ea1701e', // LINE Developers Consoleで取得したものを入力します
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

  const echo = { type: 'text', text: `1661526180-9XXVGD1x` }; // Your-LIFF-IDを実際のLIFF IDに書き換えます
  return client.replyMessage(event.replyToken, echo);
}

app.listen(3000);

// ユーザーログインエンドポイント
app.post('/login', (req, res) => {
  const { userId } = req.body;

  // ここでデータベースからユーザー情報を取得します
  // この例では仮のデータを使用しています
  const user = { id: userId, gachaCount: 0, points: 0 };

  // ユーザー情報をレスポンスとして送信します
  res.json(user);
});