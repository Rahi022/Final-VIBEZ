import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Context/Context';
import './components/common.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';

function App() {
  const { token } = useContext(AuthContext);
  const [keyword, setKeyword] = useState('');

  const fetchMusicData = () => {
    console.log('Fetching data for:', keyword);
    // Implement actual fetch logic here (Spotify API, etc.)
  };

  console.log('App Component Rendered');
  console.log('Current Token:', token);

  return (
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={token ? <Navigate to="/signin" /> : <Signup />} />
        <Route path="/signin" element={token ? <Navigate to="/dashboard" /> : <Signin />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
  );
}

export default App;