import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './common.css';
import logo1 from '../assets/vibez-banner.png';
import { signup } from '../services/auth';
import { AuthContext } from '../Context/Context';

function SignUp() {
  console.log('Signup Component Rendered');
  const { token } = useContext(AuthContext);  // Get token from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    console.log('Token in Signup:', token);
    if (token) {
      navigate('/');  // Redirect to home if token exists
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');  // Reset error before submission

    try {
      const response = await signup(email, password);  // Call signup service
      console.log('Signup Response:', response);

      if (response.status === 200) {
        // Redirect to sign-in page after successful signup
        navigate('/signin');
      }
    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="container">
        <img src={logo1} alt="vibez-banner.png" className="logo1" />
        <h2 className="title">Sign Up</h2>
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
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="switch-text">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;