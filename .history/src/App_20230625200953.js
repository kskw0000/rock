import { useEffect, useState } from 'react';
import liff from '@line/liff';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Clown from './components/Clown';
import Prize from './components/Prize';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [choice, setChoice] = useState('');
  const [result, setResult] = useState('');
  const hands = ['rock', 'scissors', 'paper'];



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

  const playGame = (playerChoice) => {
    setChoice(`You chose ${playerChoice}`);
    const computerChoice = hands[Math.floor(Math.random() * 3)];
    const result = getResult(playerChoice, computerChoice);
    setResult(result);
  }

  const getResult = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      return "It's a draw!";
    }
    if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'scissors' && computerChoice === 'paper') ||
      (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
      return "You win!";
    }
    return "You lose!";
  }

  return (
    <div className="App">
      <h1>Rock, Paper, Scissors Game</h1>
      <p id="name"></p>
      <button onClick={() => playGame('rock')}>Rock</button>
      <button onClick={() => playGame('scissors')}>Scissors</button>
      <button onClick={() => playGame('paper')}>Paper</button>
      <p>{choice}</p>
      <p>{result}</p>
    </div>
  );
}

export default App;
