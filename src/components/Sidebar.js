import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    leads: false,
    vouchers: false,
    accounts: false,
    reports: false,
    userSettings: false,
    mastersSettings: false,
    hrm: false,
    assets: false,
    suppliers: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">MENU</div>
          
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Dashboard
          </Link>

          <div className="nav-item-wrapper">
            <button 
              type="button" 
              className={`nav-item nav-item-button ${expandedSections.leads ? 'expanded' : ''}`}
              onClick={() => toggleSection('leads')}
            >
              <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18"></path>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
              </svg>
              Leads
              <span className="nav-arrow">›</span>
            </button>
            {expandedSections.leads && (
              <div className="nav-submenu">
                <Link to="/leads" className="nav-subitem">
                  <svg className="nav-icon-small" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  Leads
                  <span className="nav-badge green">35235</span>
                </Link>
              </div>
            )}
          </div>

          <Link to="/itineraries" className="nav-item">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Itineraries
            <span className="nav-arrow">›</span>
          </Link>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Google Reviews
            <span className="nav-arrow">›</span>
          </button>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Vouchers
            <span className="nav-arrow">›</span>
          </button>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            Accounts
            <span className="nav-arrow">›</span>
          </button>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
            Reports
            <span className="nav-arrow">›</span>
          </button>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Customer Support
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">USER CONTROL</div>
          
          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6"></path>
              <path d="m4.2 4.2 4.2 4.3m5.2 5.2 4.2 4.3"></path>
              <path d="M1 12h6m6 0h6"></path>
              <path d="m4.2 19.8 4.2-4.3m5.2-5.2 4.2-4.3"></path>
            </svg>
            User Settings
            <span className="nav-arrow">›</span>
          </button>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Masters Settings
            <span className="nav-arrow">›</span>
          </button>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <polyline points="17 11 19 13 23 9"></polyline>
            </svg>
            HRM
            <span className="nav-arrow">›</span>
          </button>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
              <polyline points="17 2 12 7 7 2"></polyline>
            </svg>
            Assets Management
            <span className="nav-arrow">›</span>
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">PARTICIPANTS</div>
          
          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            </svg>
            Itinerary Customers
          </button>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Partners
          </button>

          <button type="button" className="nav-item nav-item-button">
            <svg className="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Suppliers
            <span className="nav-arrow">›</span>
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-section-title">MISCELLANEOUS</div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
