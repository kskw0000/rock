import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';  // 必要なパッケージをインポートします

const clownEmojis = ['🤡', '🐯', '🐔'];

const Clown = () => {
  const navigate = useNavigate();
  const [currentClown, setCurrentClown] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [hit, setHit] = useState(false);

  useEffect(() => {
    const gachaSound = new Audio('/gachaSound.mp3'); // 音声ファイルのパスを修正してください。

    if (spinning) {
      gachaSound.play();

      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * clownEmojis.length);
        const newClown = clownEmojis[randomIndex];
        setCurrentClown(newClown);
        setHit(newClown === '🤡'); // 🤡の場合はhitをtrueに設定
        setSpinning(false);
      }, 2000);

      // クリーンアップ関数を返します。
      return () => clearTimeout(timer);
    }
  }, [spinning]);

  const handleSpin = async () => {
    setCurrentClown('');
    setSpinning(true);
    setHit(false); // ガチャを回すたびにhitをリセット

    try {
      // まずアクセストークンを取得します。
      const accessToken = '...'; // 実際にはユーザーがログインして取得したアクセストークンを使用します。

      // アクセストークンを使ってガチャAPIを呼び出します。
      const response = await axios.post('http://localhost:3000/gacha', {
        accessToken: accessToken
      });

      // レスポンスに基づいてガチャ結果を表示する。
      const randomIndex = Math.floor(Math.random() * clownEmojis.length);
      const newClown = clownEmojis[randomIndex];
      setCurrentClown(newClown);
      setHit(newClown === '🤡'); // 🤡の場合はhitをtrueに設定
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setSpinning(false);
    }
  }

  const handleNavigateToPrize = () => {
    navigate('/prize');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <span style={{ fontSize: '50px' }}>{currentClown}</span>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSpin} 
        disabled={spinning}
        sx={{ marginBottom: '20px' }}  // ボタンの下部にマージンを追加します
      >
        {spinning ? '何が出るかな...' : '回してね!'}
      </Button>

      {hit && (
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleNavigateToPrize} 
          sx={{ borderRadius: '25px' }}
        >         
        次へ進む
        </Button>
      )}
      
      {!hit && currentClown && <h1 style={{ color: 'blue' }}>はずれ😢</h1>}
    </div>
  );
}

export default Clown;
