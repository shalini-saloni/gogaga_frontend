import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const getInitials = (name) => {
    if (!name) return '';
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
          <nav className="main-nav">
            <a href="/">Dashboard</a>
            <a href="/bookings">My Bookings</a>
          </nav>
        </div>

        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-menu">
              <button className="user-avatar" onClick={toggleDropdown}>
                <span className="avatar-initials">{getInitials(user?.name)}</span>
                <span className="user-name">{user?.name}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {getInitials(user?.name)}
                    </div>
                    <div className="dropdown-user-info">
                      <strong>{user?.name}</strong>
                      <small>{user?.email}</small>
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
