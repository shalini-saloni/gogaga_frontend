import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <h1>gogaga</h1>
        </Link>
        <button className="compose-btn" title="Compose">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">MENU</div>
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            Dashboard
            <span className="nav-arrow">›</span>
          </Link>
          <Link to="/packages" className={`nav-item ${location.pathname === '/packages' ? 'active' : ''}`}>
            Leads
            <span className="nav-badge">29M</span>
            <span className="nav-arrow">›</span>
          </Link>
          <button type="button" className="nav-item nav-item-button">
            Google Reviews
            <span className="nav-arrow">›</span>
          </button>
          <button type="button" className="nav-item nav-item-button">
            Vouchers
            <span className="nav-arrow">›</span>
          </button>
          <button type="button" className="nav-item nav-item-button">
            Accounts
            <span className="nav-arrow">›</span>
          </button>
          <button type="button" className="nav-item nav-item-button">
            Reports
            <span className="nav-arrow">›</span>
          </button>
          <button type="button" className="nav-item nav-item-button">
            Customer Support
            <span className="nav-arrow">›</span>
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">USER CONTROL</div>
          <button type="button" className="nav-item nav-item-button">
            User Settings
            <span className="nav-arrow">›</span>
          </button>
          <button type="button" className="nav-item nav-item-button">
            Masters Settings
            <span className="nav-arrow">›</span>
          </button>
          <button type="button" className="nav-item nav-item-button">
            HR & Payroll
            <span className="nav-arrow">›</span>
          </button>
          <button type="button" className="nav-item nav-item-button">
            Assets Management
            <span className="nav-arrow">›</span>
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">PARTICIPANTS</div>
          <button type="button" className="nav-item nav-item-button">
            Itinerary Customers
            <span className="nav-arrow">›</span>
          </button>
          <button type="button" className="nav-item nav-item-button">
            Suppliers
            <span className="nav-arrow">›</span>
          </button>
          <button type="button" className="nav-item nav-item-button">
            Miscellaneous
            <span className="nav-arrow">›</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-user">
        {isAuthenticated ? (
          <>
            <div className="sidebar-user-avatar">
              {user?.name?.charAt(0) || 'T'}
            </div>
            <span className="sidebar-user-name">{user?.name || 'Test'}</span>
          </>
        ) : (
          <div className="sidebar-auth-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
