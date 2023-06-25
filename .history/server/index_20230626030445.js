// 必要なパッケージをインポートします
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydb.sqlite');
const express = require('express');
const line = require('@line/bot-sdk');
const bodyParser = require('body-parser');

// テーブルを作成します
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, gachaCount INTEGER, points INTEGER)");
});

const config = {
  channelAccessToken: 'zV5sYFTbQ61zF9+ySdcYh+jd3disZ/DyU2fxyTOGSG44uPl8d6SZyaqsGdF5V17Q8TMrDDjdUEBylSYpifUvJUsloGz2m3MI1kG6nOMWCds5OlLAJ6dV14Wi4OXGjSgfxPanDYImzdnKF13l1ysjkQdB04t89/1O/w1cDnyilFU=', // LINE Developers Consoleで取得したものを入力します
  channelSecret: '13df6e5457d0ef1e9e2097dc4ea1701e', // LINE Developers Consoleで取得したものを入力します
};

const app = express();
app.use(bodyParser.json());

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

app.listen(3000, () => {
  console.log(`Server is running at :3000`);
});

// ユーザーログインエンドポイント
app.post('/login', (req, res) => {
  const { userId } = req.body;

  // データベースからユーザー情報を取得します
  db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
    if (err) {
      // エラーハンドリング
      console.error(err.message);
      res.status(500).send(err.message);
    } else if (row) {
      // ユーザーが見つかった場合、その情報を送ります
      res.json(row);
    } else {
      // ユーザーが見つからない場合、新規にユーザーを作ります
      const gachaCount = 0;
      const points = 0;
      db.run("INSERT INTO users (id, gachaCount, points) VALUES (?, ?, ?)", [userId, gachaCount, points], (err) => {
        if (err) {
          // エラーハンドリング
          console.error(err.message);
          res.status(500).send(err.message);
        } else {
          // 新規作成したユーザー情報を送ります
          res.json({ id: userId, gachaCount, points });
        }
      });
    }
  });
});

// サーバーサイドコード（index.js）

// ガチャエンドポイント
app.post('/gacha', (req, res) => {
  const { userId } = req.body;

  db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    } else if (row) {
      let newGachaCount = row.gachaCount + 1;
      let newPoints = row.points;

      // 最初の3回は無料で、4回目以降はポイントが必要
      if (newGachaCount <= 3) {
        db.run("UPDATE users SET gachaCount = ? WHERE id = ?", [newGachaCount, userId], (err) => {
          if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
          } else {
            res.json({ id: userId, gachaCount: newGachaCount, points: newPoints });
          }
        });
      } else if (newPoints > 0) { // 4回目以降はポイントが必要
        newPoints--; // ポイントを1減らします
        db.run("UPDATE users SET gachaCount = ?, points = ? WHERE id = ?", [newGachaCount, newPoints, userId], (err) => {
          if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
          } else {
            res.json({ id: userId, gachaCount: newGachaCount, points: newPoints });
          }
        });
      } else {
        res.status(400).send("Not enough points");
      }
    } else {
      res.status(404).send("User not found");
    }
  });
});
