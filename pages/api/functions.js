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

const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
    headers: {
    Authorization: 'Bearer ' + accessToken
    }
});

const data = await response.json();
return data;
}

  