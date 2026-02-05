import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="filter-card">
      <div className="filter-row-top">
        <button className="sub-tab active">Package with Flights</button>
        <button className="sub-tab">Package without Flights</button>
      </div>
      
      <div className="filter-inputs">
        <div className="input-group">
          <label>Destination</label>
          <input type="text" placeholder="City" />
        </div>
        <div className="input-group">
          <label>Trip start date</label>
          <input type="text" defaultValue="Tue, Mar 12" />
        </div>
        <div className="input-group">
          <label>No. of Passengers</label>
          <select>
            <option>2 Adults, 2 Children</option>
          </select>
        </div>
        <button className="main-search-btn">
          <Search size={20} />
        </button>
      </div>

      <div className="hotel-stars">
        <span>Hotel Standard:</span>
        {[3, 4, 5].map(star => (
          <button key={star} className={`star-btn ${star === 5 ? 'active' : ''}`}>{star}☆</button>
        ))}
        <div className="meal-options">
          <input type="checkbox" id="lunch" /> <label htmlFor="lunch">Add Lunch</label>
          <input type="checkbox" id="dinner" /> <label htmlFor="dinner">Add Dinner</label>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;