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
    window.location.href = 'api/login';
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      
      {!token ? (
        <button onClick={handleLogin}className="bg-green-600 text-black py-2 px-4 rounded hover:bg-green-700">Login with Spotify</button>
      ) : (
        <div>
            {profile && (
                <div className="flex items-center">
                    <img 
                        src={profile.images[0].url} 
                        alt={profile.display_name} 
                        className="w-[150px] h-[150px] rounded-full mr-4" 
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{profile.display_name}</h1>
                        <p className="text-sm">{profile.email}</p>
                        <p className="text-sm">{profile.followers.total} followers</p>
                    </div>
                </div>
            )}
            
        
          {topArtist && (
            <div className="mt-10">
              <h2 className="font-bold">Top Artists</h2>
              
              <div className="flex flex-wrap gap-2 mt-2" >
                {processTopArtist(topArtist).map((artist, index) => (
                  <div key={index} className="flex flex-col ">
                    <img src={artist.image} alt={artist.name} className="w-[132px] h-[132px] object-cover rounded-full"/>
                    <p className=" text-center text-sm  break-normal">{ ++index+". " + artist.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
            {topTracks && (
                <div className="mt-10">
                <h2 className="font-bold" >Top Tracks</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {processTopTracks(topTracks).map((track, index) => (
                    <div key={index} className="flex flex-col ">
                        <img src={track.image} alt={track.name} className="w-[132px] h-[132px] object-cover" />
                        <p className="max-w-[125px] text-sm break-normal">{++index+". " +track.name}</p>
                    </div>
                ))}
                </div>
            </div>
            )}
         
         
        </div>
      )}
    </div>
  );
};

export default HomePage;
