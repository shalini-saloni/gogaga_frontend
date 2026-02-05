import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ query, setQuery, onSearch, activeTab, setActiveTab }) => {
  return (
    <div className="advanced-filter-card">
      <div className="sub-tabs">
        <button className={activeTab === 'Package with Flights' ? 'active' : ''} onClick={() => setActiveTab('Package with Flights')}>Package with Flights</button>
        <button className={activeTab === 'Package without Flights' ? 'active' : ''} onClick={() => setActiveTab('Package without Flights')}>Package without Flights</button>
      </div>

      <div className="filter-inputs-row">
        <div className="f-group">
          <label>Destination</label>
          <input type="text" name="to" placeholder="City" value={query.to} onChange={(e) => setQuery({...query, to: e.target.value})} />
        </div>
        <div className="f-group">
          <label>Trip start date</label>
          <input type="date" name="date" value={query.date} onChange={(e) => setQuery({...query, date: e.target.value})} />
        </div>
        <div className="f-group">
          <label>No. of Passengers</label>
          <select value={query.passengers} onChange={(e) => setQuery({...query, passengers: e.target.value})}>
            <option>2 Adults, 2 Children</option>
            <option>1 Adult</option>
          </select>
        </div>
        <button className="black-search-btn" onClick={onSearch}><Search size={18}/></button>
      </div>

      <div className="bottom-options">
        <div className="hotel-stars">
          <span>Hotel Standard:</span>
          {['3.0', '4.0', '5.0'].map(star => (
            <button key={star} className={query.hotel === star ? 'active' : ''} onClick={() => setQuery({...query, hotel: star})}>{star}</button>
          ))}
        </div>
        <div className="meals">
          <label><input type="checkbox" checked={query.lunch} onChange={(e) => setQuery({...query, lunch: e.target.checked})} /> Add Lunch</label>
          <label><input type="checkbox" checked={query.dinner} onChange={(e) => setQuery({...query, dinner: e.target.checked})} /> Add Dinner</label>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;