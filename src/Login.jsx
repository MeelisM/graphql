// src/Login.jsx
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = btoa(`${username}:${password}`); 

    try {
      const response = await fetch('https://01.kood.tech/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Encoding': 'base64',
          'Authorization': `Basic ${credentials}`, 
        },
      });
      
      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      const jwt = data.token;
      localStorage.setItem('jwt', jwt); 
      onLogin(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        placeholder="Username or Email" 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>} {/* Error msg */}
    </form>
    </div>
  );
}

export default Login;
