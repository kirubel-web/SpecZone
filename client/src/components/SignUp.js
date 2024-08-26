import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect to login after successful signup
        navigate("/login");
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleSocialSignUp = (provider) => {
    // Implement social sign up logic here
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div className="signup-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="divider">
        <span>or</span>
      </div>
      <div className="social-login">
        <button className="social-btn" onClick={() => handleSocialSignUp('Google')}>
          Sign up with Google
        </button>
        <button className="social-btn" onClick={() => handleSocialSignUp('Facebook')}>
          Sign up with Facebook
        </button>
      </div>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
