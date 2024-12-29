// pages/index.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  
  const token = router.query.access_token;
  

  const handleLogin = () => {
    // Redirect to /api/login to initiate the login process
    window.location.href = '/api/login';
  };

  return (
    <div>
      <h1>Spotify Stats</h1>
      {!token ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <div>
          <h2>Logged In</h2>
         
        </div>
      )}
    </div>
  );
};

export default HomePage;
