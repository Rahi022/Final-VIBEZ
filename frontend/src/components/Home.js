import React from 'react';
import { Link } from 'react-router-dom';
import './common.css'; 
import logo from '../assets/logo-home.png';

function Home() {
  console.log('Home Component Rendered');

  return (
    <div className="home">
      <header className="home-header">        
        <img src={logo} alt="App Logo" className="logo" />
        <h1>Welcome to VIBEZ</h1>
        <p>Your music, your way. Discover, play, and enjoy your favorite tracks!</p>

        {/* Sign-In and Sign-Up buttons */}
        <Link to="/signin">
          <button className="home-button">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="home-button">Sign Up</button>
        </Link>
      </header>
    </div>
  );
}

export default Home;