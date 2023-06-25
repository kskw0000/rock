import { useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clown from './components/Clown';
import Prize from './components/Prize';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [userId, setUserId] = useState(null); 
  const [userName, setUserName] = useState(''); // ユーザー名を保持するためのStateを追加

  useEffect(() => {
    liff.init({ liffId: '1661526180-9XXVGD1x' }) 
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          liff.getProfile()
            .then(profile => {
              setUserName(`Name: ${profile.displayName}`); // ユーザー名をStateに保存

              axios.post('/login', { userId: profile.userId })
                .then(response => {
                  console.log(response.data);
                  setUserId(profile.userId); 
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
      <div>{userName}</div> {/* ユーザー名を表示 */}
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
