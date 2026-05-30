import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const mockUsers = [
    { email: 'user1@campus.edu', password: 'password123', userId: 'user001', name: 'Alice Johnson' },
    { email: 'user2@campus.edu', password: 'password456', userId: 'user002', name: 'Bob Smith' },
    { email: 'user3@campus.edu', password: 'password789', userId: 'user003', name: 'Carol Davis' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      login({
        userId: user.userId,
        email: user.email,
        name: user.name
      });
      setLoading(false);
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Campus Notifications</h1>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@campus.edu"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials:</p>
          <div className="credentials-list">
            <p>user1@campus.edu / password123</p>
            <p>user2@campus.edu / password456</p>
            <p>user3@campus.edu / password789</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
