import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './AuthContext';
import Login from './Login';
import Home from './Home';
import Priority from './Priority';
import './App.css';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <h2 className="app-title">Campus Notifications</h2>
          <div className="nav-links">
            <button
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              All Notifications
            </button>
            <button
              className={`nav-link ${currentPage === 'priority' ? 'active' : ''}`}
              onClick={() => setCurrentPage('priority')}
            >
              Priority Inbox
            </button>
            <span className="user-info">
              {user?.name} ({user?.email})
            </span>
            <button
              className="nav-link logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'home' && <Home />}
        {currentPage === 'priority' && <Priority />}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Campus Notifications Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return user ? <Dashboard /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
