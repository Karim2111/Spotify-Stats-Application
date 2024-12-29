// pages/index.js

import React from 'react';

const HomePage = () => {
  // This function will be called when the button is clicked
  const handleLogin = () => {
    // Redirect to the Express server's /login route
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <div>
      <h1>Welcome to Spotify Stats</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default HomePage;
