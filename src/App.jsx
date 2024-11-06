// App.jsx
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('login');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="dashboard-container">
          <Dashboard />
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;