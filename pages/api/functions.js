export async function getProfile(accessToken) {
    
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    return data;
  }

export async function getTopArtist(accessToken) {

const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10', {
    headers: {
    Authorization: 'Bearer ' + accessToken
    }
});

const data = await response.json();
return data;
}

export async function getTopTracks(accessToken) {

const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10', {
    headers: {  
    Authorization: 'Bearer ' + accessToken
    }
});

const data = await response.json();
return data;
}

export async function getRecentlyPlayed(accessToken) {

  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
      headers: {  
      Authorization: 'Bearer ' + accessToken
      }
  });
  
  const data = await response.json();
  return data;
  }
  
