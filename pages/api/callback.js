import querystring from 'querystring';

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code || !state) {
    res.redirect('/?error=missing_code_or_state');
    return; // End function execution after responding
  }

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  };

  try {
    const response = await fetch(authOptions.url, {
      method: 'POST',
      headers: authOptions.headers,
      body: querystring.stringify(authOptions.form),
    });

    if (!response.ok) {
      console.error('Spotify token request failed:', response.status);
      res.redirect('/?error=token_request_failed');
      return;
    }

    const data = await response.json();

    if (data.access_token) {
      res.redirect('/?access_token=' + data.access_token);
    } else {
      res.redirect('/?error=invalid_token');
    }
  } catch (error) {
    console.error('Error during token request:', error);
    res.redirect('/?error=token_request_failed');
  }
}
