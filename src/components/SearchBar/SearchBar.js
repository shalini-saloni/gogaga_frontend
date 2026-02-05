import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    from: 'Rajiv Gandhi International Airport (HYD), Hyderabad, India',
    to: 'Mopa Airport Goa (GOX), Goa, India',
    startDate: 'Tue, Mar 12',
    returnDate: 'Sun, Mar 17, 2025',
    passengers: '2 Adults, 2 Children',
    hotelStandard: '3★ - 4★',
    addLunch: false,
    addDinner: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="search-bar-container">
      <div className="search-tabs">
        <button className="tab-btn active">Indian Holidays</button>
        <button className="tab-btn">International Holidays</button>
      </div>

      <div className="search-options">
        <button className="option-btn active">Package with Flights</button>
        <button className="option-btn">Package without Flights</button>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Destination</label>
            <input 
              type="text" 
              placeholder="City" 
              value={formData.from}
              onChange={(e) => handleChange('from', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Trip start date</label>
            <input 
              type="text" 
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>No.of Passengers</label>
            <input 
              type="text" 
              value={formData.passengers}
              onChange={(e) => handleChange('passengers', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Hotel Standard</label>
            <select 
              value={formData.hotelStandard}
              onChange={(e) => handleChange('hotelStandard', e.target.value)}
            >
              <option>3★ - 4★</option>
              <option>4★ - 5★</option>
              <option>5★</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={formData.addLunch}
                onChange={(e) => handleChange('addLunch', e.target.checked)}
              />
              Add Lunch
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={formData.addDinner}
                onChange={(e) => handleChange('addDinner', e.target.checked)}
              />
              Add Dinner
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="search-btn">
            <span className="search-icon">🔍</span>
          </button>
        </div>
      </form>

      <div className="flight-filters">
        <div className="filter-section">
          <h3>Departure - Air India</h3>
          <div className="flight-info">
            <div className="flight-time">
              <span className="time">11:30</span>
              <span className="arrow">→</span>
              <span className="time">18:55</span>
            </div>
            <div className="flight-price">₹105,300.00</div>
          </div>
        </div>

        <div className="filter-section">
          <h3>Return - Air India</h3>
          <div className="flight-info">
            <div className="flight-time">
              <span className="time">00:50</span>
              <span className="arrow">→</span>
              <span className="time">01:55</span>
            </div>
            <div className="flight-price">₹105,300.00</div>
          </div>
        </div>

        <div className="total-section">
          <div className="total-label">Total Round trip for 2 adults, 2 children</div>
          <div className="total-price">₹210,600.00</div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;