// src/Context/MusicContext.js

import React, { createContext, useState, useEffect } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch access token
  const fetchToken = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          'grant_type=client_credentials&client_id=0a5abd97671e47e29da659e0c974e021&client_secret=184d73b0e0bd4e4a8dfa5f2f92912afe',
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.statusText}`);
      }
      const jsonData = await response.json();
      setToken(jsonData.access_token);  // Store the token in state
    } catch (error) {
      setMessage('We couldn’t retrieve the token. Please try again.');
      console.error('Error fetching token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch tracks based on keyword
  const fetchTracks = async () => {
    if (!token || !keyword) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTracks(data.tracks.items); // Set the tracks data
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();  // Get the token when the component mounts
  }, []);

  useEffect(() => {
    fetchTracks();  // Fetch tracks whenever the keyword changes
  }, [keyword, token]);

  return (
    <MusicContext.Provider
      value={{
        tracks,
        keyword,
        setKeyword,
        isLoading,
        currentTrack,
        setCurrentTrack,
        message,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};