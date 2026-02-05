import React from 'react';
import { Bell, Search} from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search mail" />
      </div>
      <div className="header-actions">
        <div className="icon-group">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </div>
        <div className="profile-pill">
          <div className="avatar">S</div>
          <span className="user-name">School</span>
        </div>
      </div>
    </header>
  );
};

export default Header;