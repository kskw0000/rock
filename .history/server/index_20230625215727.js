// 必要なパッケージをインポートします
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.sqlite');
const express = require('express');
const line = require('@line/bot-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');


// テーブルを作成します
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, gachaCount INTEGER, points INTEGER)");
});

const config = {
  channelAccessToken: 'zV5sYFTbQ61zF9+ySdcYh+jd3disZ/DyU2fxyTOGSG44uPl8d6SZyaqsGdF5V17Q8TMrDDjdUEBylSYpifUvJUsloGz2m3MI1kG6nOMWCds5OlLAJ6dV14Wi4OXGjSgfxPanDYImzdnKF13l1ysjkQdB04t89/1O/w1cDnyilFU=', // LINE Developers Consoleで取得したものを入力します
  channelSecret: '13df6e5457d0ef1e9e2097dc4ea1701e', // LINE Developers Consoleで取得したものを入力します
};

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at :${port}`);
});


// const app = express();
// // app.use(bodyParser.json());

// // app.post('/webhook', line.middleware(config), (req, res) => {
// //   Promise
// //     .all(req.body.events.map(handleEvent))
// //     .then((result) => res.json(result))
// //     .catch((err) => {
// //       console.error(err);
// //       res.status(500).end();
// //     });
// // });

// const client = new line.Client(config);

// function handleEvent(event) {
//   if (event.type !== 'message' || event.message.type !== 'text') {
//     return Promise.resolve(null);
//   }

//   const echo = { type: 'text', text: `1661526180-9XXVGD1x` }; // Your-LIFF-IDを実際のLIFF IDに書き換えます
//   return client.replyMessage(event.replyToken, echo);
// }

// app.listen(3000);

// app.use(express.json());
// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // // ユーザーログインエンドポイント
// // app.post('/login', (req, res) => {
// //   const { userId } = req.body;

// //   // データベースからユーザー情報を取得します
// //   db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
// //     if (err) {
// //       // エラーハンドリング
// //       console.error(err.message);
// //       res.status(500).send(err.message);
// //     } else if (row) {
// //       // ユーザーが見つかった場合、その情報を送ります
// //       res.json(row);
// //     } else {
// //       // ユーザーが見つからない場合、新規にユーザーを作ります
// //       const gachaCount = 0;
// //       const points = 0;
// //       db.run("INSERT INTO users (id, gachaCount, points) VALUES (?, ?, ?)", [userId, gachaCount, points], (err) => {
// //         if (err) {
// //           // エラーハンドリング
// //           console.error(err.message);
// //           res.status(500).send(err.message);
// //         } else {
// //           // 新規作成したユーザー情報を送ります
// //           res.json({ id: userId, gachaCount, points });
// //         }
// //       });
// //     }
// //   });
// // });
