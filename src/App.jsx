// src/App.jsx
import { useState } from 'react';
import Login from './Login'; 
import Dashboard from './Dashboard'; 
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div id="root">
      {isLoggedIn ? (
        <Dashboard /> 
      ) : (
        <Login onLogin={handleLogin} /> 
      )}
    </div>
  );
}

export default App;
