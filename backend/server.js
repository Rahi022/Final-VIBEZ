const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging - Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Spotify Token Route
app.post('/get-spotify-token', async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const grantType = req.body.grant_type || 'client_credentials';

  if (!clientId || !clientSecret) {
    console.log('Spotify credentials are missing');
    return res.status(500).json({ error: "Spotify credentials are missing" });
  }
  
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    console.log('Requesting Spotify token...');
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=${grantType}`,  // Dynamically handle grant type
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`
        }
      }
    );
    res.json({
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
      token_type: response.data.token_type
    });
  } catch (error) {
    console.error('Error fetching token:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || 'Error fetching token'
    });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
