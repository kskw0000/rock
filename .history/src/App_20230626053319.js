import { useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clown from 'components/Clown';
import Prize from '../../ww/tsfff/clown-app/src/components/Prize';
import Header from '../../ww/tsfff/clown-app/src/components/Header';
import Footer from '../../ww/tsfff/clown-app/src/components/Footer';

function App() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [gachaCount, setGachaCount] = useState(0); // ガチャの回数を保持するためのStateを追加
  const [points, setPoints] = useState(0); // ユーザーのポイントを保持するためのStateを追加

  useEffect(() => {
    liff.init({ liffId: '1661526180-9XXVGD1x' })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          liff.getProfile()
            .then(profile => {
              setUserName(`Name: ${profile.displayName}`);

              axios.post('/login', { userId: profile.userId })
                .then(response => {
                  console.log(response.data);
                  setUserId(response.data.id);
                  setGachaCount(response.data.gachaCount);
                  setPoints(response.data.points);
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleGacha = () => {
    axios.post('/gacha', { userId: userId })
      .then(response => {
        console.log(response.data);
        setGachaCount(response.data.gachaCount);
        setPoints(response.data.points);
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
      <div>{userName}</div>
      <div>Gacha Count: {gachaCount}</div> {/* ガチャの回数を表示 */}
      <div>Points: {points}</div> {/* ユーザーのポイントを表示 */}
      <button onClick={handleGacha}>Play Gacha</button> {/* ガチャを回すためのボタンを追加 */}
      <Router>
        <main style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1',
        }}>
            <Routes>
              <Route path="/" element={<Clown userId={userId} />} />
              <Route path="/prize" element={<Prize />} />
            </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
