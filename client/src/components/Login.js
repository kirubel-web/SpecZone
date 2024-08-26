import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data);
        console.log("Successful login"); // Debugging message
        navigate("/");
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="login-container">
      <h1>Welcome Back</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit">Sign In</button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="divider">
        <span>or</span>
      </div>
      <div className="social-login">
        <button className="social-btn" onClick={() => handleSocialLogin('Google')}>
          Login with Google
        </button>
        <button className="social-btn" onClick={() => handleSocialLogin('Facebook')}>
          Login with Facebook
        </button>
      </div>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}
