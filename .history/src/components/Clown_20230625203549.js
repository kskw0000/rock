import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

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

  const handleSpin = () => {
    setCurrentClown('');
    setSpinning(true);
    setHit(false); // ガチャを回すたびにhitをリセット
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
