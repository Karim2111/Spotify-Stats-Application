// pages/index.js
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {getProfile, getTopArtist} from './api/functions.js';

const HomePage = () => {
  const router = useRouter();
  const token = router.query.access_token;
  const [profile, setProfile] = useState(null);
  const [topArtist, setTopArtist] = useState(null);


  useEffect(() => {
    if (token) {
      getProfile(token).then(data => {
        setProfile(data);
      });
    }
  }, [token]);

    useEffect(() => {
    if (token) {
      getTopArtist(token).then(data => {
        setTopArtist(data);
      });
    }
    }, [token]);
  
  

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
          <p>
            profile: {JSON.stringify(topArtist)}
          </p>
         
        </div>
      )}
    </div>
  );
};

export default HomePage;
