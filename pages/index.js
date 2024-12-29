import React from 'react';

const HomePage = () => {
  // This function will be called when the button is clicked
  const handleLogin = () => {
    // Redirect to the /api/login route
    window.location.href = '/api/login'; // Use the internal Next.js API route
  };

  return (
    <div>
      <h1>Welcome to Spotify Stats</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default HomePage;
