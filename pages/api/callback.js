import querystring from 'querystring';

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

export default function handler(req, res) {
  const { code, state } = req.query;

  if (!code || !state) {
    // If there is an error with the code or state, redirect back to home
    return res.redirect('/?error=missing_code_or_state');
  }

  // Spotify token request
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    },
    json: true
  };

  // Use fetch to request the token
  fetch(authOptions.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authOptions.headers['Authorization']
    },
    body: querystring.stringify(authOptions.form)
  })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        // Store or process the access token as needed

        // Redirect the user back to the main page
        res.redirect('/?access_token=' + data.access_token);
      } else {
        // If token exchange fails, redirect back to home with error
        res.redirect('/?error=invalid_token');
      }
    })
    .catch(error => {
      console.error('Error during token request:', error);
      res.redirect('/?error=token_request_failed');
    });
}
