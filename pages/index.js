// pages/index.js
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {getProfile, getTopArtist, getTopTracks} from './api/functions.js';


function processTopArtist(data) {
    return data.items.map(item => {
        return {
        name: item.name,
        image: item.images[0].url
        };
    });
}
function processTopTracks(data) {
    return data.items.map(item => {
        return {
        name: item.name,
        image: item.album.images[0].url
        };
    });
}


const HomePage = () => {
  const router = useRouter();
  const token = router.query.access_token;
  const [profile, setProfile] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  

  useEffect(() => {
    if (token) {
      getProfile(token).then(data => {
        setProfile(data);
      });
      getTopArtist(token).then(data => {
        setTopArtist(data);
      });   
      getTopTracks(token).then(data => {
        setTopTracks(data);
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
          {topArtist && (
            <div className="artist-container">
              {processTopArtist(topArtist).map((artist, index) => (
                <div key={index} className="artist-item">
                  <img src={artist.image} alt={artist.name} />
                  <p>{artist.name}</p>
                </div>
              ))}
            </div>
          )}
            {topTracks && (
                <div className="tracks-container">
                {processTopTracks(topTracks).map((track, index) => (
                    <div key={index} className="track-item">
                    <img src={track.image} alt={track.name} />
                    <p>{track.name}</p>
                    </div>
                ))}
                </div>
            )}
         
         
        </div>
      )}
    </div>
  );
};

export default HomePage;
