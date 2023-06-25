import { useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios'; // リクエストを送信するためにaxiosをインポートします
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clown from './components/Clown';
import Prize from './components/Prize';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [userId, setUserId] = useState(null); // ユーザーIDを保持するためのStateを追加します

  useEffect(() => {
    liff.init({ liffId: '1661526180-9XXVGD1x' }) // Your-LIFF-IDはLINE Developers Consoleで取得したものを入力します
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          liff.getProfile()
            .then(profile => {
              const name = document.getElementById('name');
              name.innerText = `Name: ${profile.displayName}`;

              // ユーザー情報をサーバーに送信します
              axios.post('/login', { userId: profile.userId })
                .then(response => {
                  console.log(response.data);
                  setUserId(profile.userId); // ユーザーIDをStateに保持します
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleGacha = () => { // ガチャガチャ機能を呼び出す関数を追加します
    axios.post('/gacha', { userId: userId })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Header />
      <Router>
        <main style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1',
        }}>
            <Routes>
              <Route path="/" element={<Clown />} />
              <Route path="/prize" element={<Prize />} />
            </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
