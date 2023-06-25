import { useEffect } from 'react';
import liff from '@line/liff';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clown from './components/Clown';
import Prize from './components/Prize';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
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
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }, []);

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
        {/* 以下にルーティングの機能を追加します。 */}
            <Routes>
              <Route path="/clown" element={<Clown />} />
              <Route path="/prize" element={<Prize />} />
            </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
