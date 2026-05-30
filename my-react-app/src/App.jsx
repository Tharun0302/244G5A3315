import React, { useState } from 'react';
import Home from './Home';
import Priority from './Priority';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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

export default App;
