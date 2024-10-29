// src/Dashboard.jsx
import React from 'react';

function Dashboard() {
  const loginName = localStorage.getItem('login') || "User"; 

  return (
    <div>
      <h1>Welcome, {loginName}! You have successfully logged in.</h1>
      {/* TBA graphs */}
    </div>
  );
}

export default Dashboard;
