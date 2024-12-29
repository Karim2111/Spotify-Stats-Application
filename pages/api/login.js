import querystring from 'querystring';


const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

export default function handler(req, res) {
  if (req.method === 'GET') {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-top-read';

    const redirectUrl = `https://accounts.spotify.com/authorize?` + querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    });

    res.redirect(redirectUrl);
  }
}

// Helper function to generate a random string
function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
