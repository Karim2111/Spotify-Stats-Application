// server.js

const express = require('express');
const querystring = require('querystring');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;  
const redirect_uri = 'http://localhost:3000';  // Your redirect URI

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString;
}

app.prepare().then(() => {
  const server = express();

  // Define /login route for Spotify authentication
  server.get('/login', function(req, res) {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    
    const queryParams = querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    });

    res.redirect('https://accounts.spotify.com/authorize?' + queryParams);
  });

  // All other routes will be handled by Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
