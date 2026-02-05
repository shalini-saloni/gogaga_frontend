import React from 'react';
import { LayoutDashboard, Users, Map, Star, FileText, Settings, ShieldCheck, HeadphonesIcon } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuGroups = [
    {
      label: 'MENU',
      items: [
        { name: 'Dashboard', icon: <LayoutDashboard size={18}/> },
        { name: 'Leads', icon: <Users size={18}/>, badge: '20634' },
        { name: 'Itineraries', icon: <Map size={18}/> },
        { name: 'Vouchers', icon: <Star size={18}/> },
        { name: 'Reports', icon: <FileText size={18}/> },
        { name: 'Customer Support', icon: <HeadphonesIcon size={18}/> },
      ]
    },
    {
      label: 'USER CONTROL',
      items: [
        { name: 'User Settings', icon: <Settings size={18}/> },
        { name: 'Masters Settings', icon: <Settings size={18}/> },
        { name: 'HRM', icon: <ShieldCheck size={18}/> },
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">gogaga</div>
      <nav className="sidebar-nav">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="menu-group">
            <p className="group-label">{group.label}</p>
            {group.items.map(item => (
              <div key={item.name} className={`nav-item ${item.name === 'Leads' ? 'active' : ''}`}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;