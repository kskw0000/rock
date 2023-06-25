import { useEffect } from 'react';
import liff from '@line/liff';

function App() {
  useEffect(() => {
    liff.init({ liffId: 'Your-LIFF-ID' }) // Your-LIFF-IDはLINE Developers Consoleで取得したものを入力します
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
    <div className="App">
      <h1>Rock, Paper, Scissors Game</h1>
      <p id="name"></p>
      
    </div>
  );
}

export default App;
