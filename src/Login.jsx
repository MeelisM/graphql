import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch('https://01.kood.tech/api/auth/signin', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
        },
      });
      
      if (!response.ok) throw new Error('Invalid credentials');
  
      const token = await response.json();
      localStorage.setItem('jwt', token);
  
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
  
      const userId = payload["https://hasura.io/jwt/claims"]["x-hasura-user-id"];
      if (userId) {
        localStorage.setItem('userId', userId); // Store the user ID
      } else {
        throw new Error("User ID not found in JWT payload.");
      }
  
      localStorage.setItem('login', username);
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
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;