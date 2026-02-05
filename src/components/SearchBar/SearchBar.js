import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  return (
    <div className="search-filter-card">
      <div className="input-group">
        <label>From</label>
        <input 
          type="text" 
          name="from" 
          placeholder="e.g. Delhi" 
          value={query.from} 
          onChange={handleChange} 
        />
      </div>

      <div className="input-group">
        <label>To</label>
        <input 
          type="text" 
          name="to" 
          placeholder="e.g. Mumbai" 
          value={query.to} 
          onChange={handleChange} 
        />
      </div>

      <div className="input-group">
        <label>Departure Date</label>
        <input 
          type="date" 
          name="date" 
          className="calendar-picker"
          value={query.date} 
          onChange={handleChange} 
        />
      </div>

      <button className="search-action-btn" onClick={onSearch}>
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;