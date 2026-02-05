import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo" onClick={() => handleNavigation('/')} style={{cursor: 'pointer'}}>
            <h1>gogaga</h1>
          </div>
          <nav className="main-nav">
            <button 
              onClick={() => handleNavigation('/')}
              className={location.pathname === '/' ? 'active' : ''}
            >
              Dashboard
            </button>
            <button 
              onClick={() => handleNavigation('/packages')}
              className={location.pathname === '/packages' ? 'active' : ''}
            >
              Packages
            </button>
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
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={() => handleNavigation('/login')} className="btn-login">
                Login
              </button>
              <button onClick={() => handleNavigation('/signup')} className="btn-signup">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;