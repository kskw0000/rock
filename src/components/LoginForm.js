import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="ユーザ名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br/>
      <TextField
        label="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br/>
      <Button variant="contained" color="primary" type="submit">
        ログイン
      </Button>
    </form>
  );
}

export default LoginForm;
