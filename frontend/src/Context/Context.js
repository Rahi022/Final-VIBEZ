import React, { createContext, useState, useEffect } from 'react';

// Create and export the AuthContext
export const AuthContext = createContext();
export const MusicContext = createContext();  // Added MusicContext

// AuthProvider to manage authentication state
export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token'); // Getting token from localStorage initially
  console.log('Initial Token from localStorage:', initialToken);

  const [token, setToken] = useState(initialToken);

  // Sync token with localStorage whenever it changes
  useEffect(() => {
    if (token) {
      console.log('Setting token in localStorage:', token);
      localStorage.setItem('token', token);
    } else {
      console.log('Removing token from localStorage');
      localStorage.removeItem('token');
    }
  }, [token]);

  // Login function to set token
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);  // Ensure token is saved
  };

  // Logout function to remove token
  const logout = () => {
    console.log('Logout called');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// MusicProvider to manage music-related state
export const MusicProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultOffset, setResultOffset] = useState(0);

  return (
    <MusicContext.Provider value={{ isLoading, setIsLoading, resultOffset, setResultOffset }}>
      {children}
    </MusicContext.Provider>
  );
};
