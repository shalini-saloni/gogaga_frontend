import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const { searchParams, updateSearchParams } = useBooking();
  
  const [formData, setFormData] = useState({
    from: searchParams.from || '',
    to: searchParams.to || '',
    departureDate: searchParams.departureDate || '',
    returnDate: searchParams.returnDate || '',
    adults: searchParams.adults || 2,
    children: searchParams.children || 0,
    infants: searchParams.infants || 0,
    packageType: searchParams.packageType || 'with-flight',
    hotelStandard: searchParams.hotelStandard || '3-4'
  });

  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('indian');

  const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
    'Hyderabad', 'Goa', 'Pune', 'Jaipur', 'Ahmedabad'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePassengerChange = (type, increment) => {
    setFormData(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment)
    }));
  };

  const getTotalPassengers = () => {
    return formData.adults + formData.children + formData.infants;
  };

  const getPassengerText = () => {
    const parts = [];
    if (formData.adults > 0) parts.push(`${formData.adults} Adult${formData.adults > 1 ? 's' : ''}`);
    if (formData.children > 0) parts.push(`${formData.children} Child${formData.children !== 1 ? 'ren' : ''}`);
    if (formData.infants > 0) parts.push(`${formData.infants} Infant${formData.infants > 1 ? 's' : ''}`);
    return parts.join(', ') || 'Select passengers';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.from || !formData.to || !formData.departureDate) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.packageType === 'with-flight' && !formData.returnDate) {
      alert('Please select return date');
      return;
    }

    if (getTotalPassengers() === 0) {
      alert('Please select at least one passenger');
      return;
    }

    updateSearchParams(formData);
    if (onSearch) {
      onSearch(formData);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const swapCities = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <div className="search-form-container">
      <div className="search-tabs">
        <button 
          className={`tab-btn ${activeTab === 'indian' ? 'active' : ''}`}
          onClick={() => setActiveTab('indian')}
        >
          Indian Holidays
        </button>
        <button 
          className={`tab-btn ${activeTab === 'international' ? 'active' : ''}`}
          onClick={() => setActiveTab('international')}
        >
          International Holidays
        </button>
      </div>

      <div className="package-type-selector">
        <button 
          className={`package-btn ${formData.packageType === 'with-flight' ? 'active' : ''}`}
          onClick={() => handleChange('packageType', 'with-flight')}
        >
          Package with Flights
        </button>
        <button 
          className={`package-btn ${formData.packageType === 'without-flight' ? 'active' : ''}`}
          onClick={() => handleChange('packageType', 'without-flight')}
        >
          Package without Flights
        </button>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group location-group">
            <label>From</label>
            <div className="location-input-wrapper">
              <select 
                value={formData.from}
                onChange={(e) => handleChange('from', e.target.value)}
                className="location-select"
                required
              >
                <option value="">Select city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <button 
                type="button" 
                className="swap-btn"
                onClick={swapCities}
                title="Swap cities"
              >
                ⇄
              </button>
            </div>
          </div>

          <div className="form-group location-group">
            <label>To</label>
            <select 
              value={formData.to}
              onChange={(e) => handleChange('to', e.target.value)}
              className="location-select"
              required
            >
              <option value="">Select city</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="form-group date-group">
            <label>Departure Date</label>
            <input 
              type="date"
              value={formData.departureDate}
              onChange={(e) => handleChange('departureDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="date-input"
              required
            />
            {formData.departureDate && (
              <div className="date-display">{formatDate(formData.departureDate)}</div>
            )}
          </div>

          {formData.packageType === 'with-flight' && (
            <div className="form-group date-group">
              <label>Return Date</label>
              <input 
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleChange('returnDate', e.target.value)}
                min={formData.departureDate || new Date().toISOString().split('T')[0]}
                className="date-input"
                required
              />
              {formData.returnDate && (
                <div className="date-display">{formatDate(formData.returnDate)}</div>
              )}
            </div>
          )}

          <div className="form-group passenger-group">
            <label>Passengers</label>
            <div className="passenger-selector">
              <button 
                type="button"
                className="passenger-display"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
              >
                {getPassengerText()}
                <span className="dropdown-arrow">▼</span>
              </button>

              {showPassengerDropdown && (
                <div className="passenger-dropdown">
                  <div className="passenger-row">
                    <div className="passenger-label">
                      <strong>Adults</strong>
                      <small>12+ years</small>
                    </div>
                    <div className="passenger-controls">
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('adults', -1)}
                        disabled={formData.adults === 0}
                      >
                        -
                      </button>
                      <span>{formData.adults}</span>
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('adults', 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="passenger-row">
                    <div className="passenger-label">
                      <strong>Children</strong>
                      <small>2-12 years</small>
                    </div>
                    <div className="passenger-controls">
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('children', -1)}
                        disabled={formData.children === 0}
                      >
                        -
                      </button>
                      <span>{formData.children}</span>
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('children', 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="passenger-row">
                    <div className="passenger-label">
                      <strong>Infants</strong>
                      <small>Under 2 years</small>
                    </div>
                    <div className="passenger-controls">
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('infants', -1)}
                        disabled={formData.infants === 0}
                      >
                        -
                      </button>
                      <span>{formData.infants}</span>
                      <button 
                        type="button"
                        onClick={() => handlePassengerChange('infants', 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button 
                    type="button"
                    className="passenger-done-btn"
                    onClick={() => setShowPassengerDropdown(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Hotel Standard</label>
            <select 
              value={formData.hotelStandard}
              onChange={(e) => handleChange('hotelStandard', e.target.value)}
              className="hotel-select"
            >
              <option value="2-3">2★ - 3★</option>
              <option value="3-4">3★ - 4★</option>
              <option value="4-5">4★ - 5★</option>
              <option value="5">5★</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="search-submit-btn">
            <span className="search-icon"></span>
            Search Flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
