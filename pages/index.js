
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {getProfile, getTopArtist, getTopTracks, getRecentlyPlayed} from './api/functions.js';

import { processAll } from '../components/utils/upload.js';



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
function processRecentlyPlayed(data) {
  return data.items.map(item => {
    return {
      trackName: item.track.name,
      albumImage: item.track.album.images[0].url,
      playedAt: new Date(item.played_at).toLocaleString(),
    };
  });
}



const HomePage = () => {
  const router = useRouter();
  const token = router.query.access_token;
  const [profile, setProfile] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  

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
      getRecentlyPlayed(token).then(data => {
        setRecentlyPlayed(data);
      });
    }
  }, [token]);
  
  

  const handleLogin = () => {
    window.location.href = 'api/login';
  };
  const handleButtonClick = () => {
      // Trigger the click event of the hidden file input
      document.getElementById('upload-files').click();
    };
    const handleUpload = (event) => {
      const files = event.target.files;
  
  
      processAll(files);
    
  
    };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <div className="absolute top-10 right-10 z-10">
        <button
          onClick={handleButtonClick}
          className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-700"
        >
          Upload Files
        </button>
        <input
          id="upload-files"
          type="file"
          multiple
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>
      
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
            {recentlyPlayed && (
              <div className="mt-10">
                <h2 className="font-bold">Recently Played</h2>
                <table className="table-auto w-100 mt-2">
                  <tbody>
                    {processRecentlyPlayed(recentlyPlayed).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="w-[80px]">
                            <img src={item.albumImage} alt={item.trackName} className="w-[80px] h-[80px] object-cover" />
                          </td>
                          <td className="max-w-[220px] overflow-hidden text-ellipsis">{item.trackName}</td>
                          <td className="text-right text-xs text-gray-400 max-w-[125px]">{item.playedAt}</td> {}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      )}
      
      </div>
  
  );
};

export default HomePage;
