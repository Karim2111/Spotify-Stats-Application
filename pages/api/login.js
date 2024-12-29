import express from 'express';
import querystring from 'querystring';

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirect_uri = 'http://localhost:3000/callback';

const app = express();

// API route handler
export default function handler(req, res) {
  if (req.method === 'GET') {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';

    const redirectUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    });

    res.redirect(redirectUrl);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
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
