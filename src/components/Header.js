import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'GK';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <h1>gogaga</h1>
          </div>
          <button className="menu-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="header-right">
          <div className="header-icons">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button className="icon-btn notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge">2</span>
            </button>
            <button className="icon-btn notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span className="notification-badge orange">4</span>
            </button>
            <button className="icon-btn notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="notification-badge red">10</span>
            </button>
          </div>

          {isAuthenticated ? (
            <div className="user-menu">
              <button className="user-avatar" onClick={toggleDropdown}>
                <img 
                  src="https://via.placeholder.com/40" 
                  alt={user?.name || 'Girish Kumar'} 
                  className="avatar-image"
                />
                <span className="user-name">{user?.name || 'Girish Kumar'}</span>
                <span className="dropdown-arrow">▼</span>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {getInitials(user?.name || 'Girish Kumar')}
                    </div>
                    <div className="dropdown-user-info">
                      <strong>{user?.name || 'Girish Kumar'}</strong>
                      <small>{user?.email || 'girish@example.com'}</small>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <a href="/profile" className="dropdown-item">
                    <span className="dropdown-icon">👤</span>
                    Profile
                  </a>
                  <a href="/bookings" className="dropdown-item">
                    <span className="dropdown-icon">🎫</span>
                    My Bookings
                  </a>
                  <a href="/settings" className="dropdown-item">
                    <span className="dropdown-icon">⚙️</span>
                    Settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="/login" className="btn-login">Login</a>
              <a href="/signup" className="btn-signup">Sign Up</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
