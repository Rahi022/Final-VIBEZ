import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './common.css';
import logo1 from '../assets/vibez-banner.png';
import { signin } from '../services/auth';
import { AuthContext } from '../Context/Context';

function SignIn() {
  console.log('SignIn Component Rendered');
  const { token, login } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    console.log('Token in SignIn:', token);
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset error before submission
    setLoading(true);

    try {
      const response = await signin(email, password);  // Call signin service
      console.log('Signin Response:', response);

      if (response.status === 200 && response.token) {
        login(response.token);  // Set token in context
        navigate('/dashboard');  // Redirect to dashboard
      }
    } catch (err) {
      console.error('Signin Error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="container">
      <img src={logo1} alt="vibez-banner.png" className="logo1" />
        <h2 className="title">Sign In</h2>

        {error && <p className="error-message">{error}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
