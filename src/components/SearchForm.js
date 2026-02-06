import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import './SearchForm.css';

const destinations = [
  { value: 'Hyderabad', label: 'Rajiv Gandhi International Airport (HYD), Hyderabad, India' },
  { value: 'Mumbai', label: 'Chhatrapati Shivaji International Airport (BOM), Mumbai, India' },
  { value: 'Delhi', label: 'Indira Gandhi International Airport (DEL), Delhi, India' },
  { value: 'Bangalore', label: 'Kempegowda International Airport (BLR), Bangalore, India' },
  { value: 'Chennai', label: 'Chennai International Airport (MAA), Chennai, India' },
  { value: 'Kolkata', label: 'Netaji Subhas Chandra Bose International (CCU), Kolkata, India' },
  { value: 'Goa', label: 'Mopa Airport India (GOX), Goa, India' }
];

const SearchForm = ({ onSearch }) => {
  const { searchParams, updateSearchParams } = useBooking();

  const [formData, setFormData] = useState({
    to: searchParams.to || 'Goa',
    from: searchParams.from || 'Hyderabad',
    departureDate: searchParams.departureDate || '2025-03-12',
    returnDate: searchParams.returnDate || '2025-03-17',
    adults: searchParams.adults || 2,
    children: searchParams.children || 2,
    infants: searchParams.infants || 0,
    packageType: searchParams.packageType || 'with-flight',
    hotelStandard: searchParams.hotelStandard || '5★',
    addLunch: searchParams.addLunch || false,
    addDinner: searchParams.addDinner || true
  });

  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('indian');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePassengerChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value)
    }));
  };

  const getPassengerText = () => {
    return `${formData.adults} Adults, ${formData.children} Children`;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    });

  const getDestinationLabel = () => {
    const d = destinations.find(d => d.value === formData.to);
    return d ? d.value : '';
  };

  const getFromLabel = () => {
    const d = destinations.find(d => d.value === formData.from);
    return d ? d.label : '';
  };

  const getToLabel = () => {
    const d = destinations.find(d => d.value === formData.to);
    return d ? d.label : '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearchParams(formData);
    if (onSearch) onSearch(formData);
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

      <form onSubmit={handleSubmit} className="search-form-main">
        <div className="form-row-top">
          <div className="form-group destination-group">
            <label>Destination</label>
            <input 
              type="text" 
              value={getDestinationLabel()} 
              placeholder="City"
              readOnly
              onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}
            />
            {showDestinationDropdown && (
              <div className="destination-dropdown">
                {destinations.map(dest => (
                  <div 
                    key={dest.value} 
                    className="dropdown-option" 
                    onClick={() => { 
                      handleChange('to', dest.value); 
                      setShowDestinationDropdown(false); 
                    }}
                  >
                    {dest.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group date-group">
            <label>Trip start date</label>
            <input 
              type="date" 
              value={formData.departureDate} 
              onChange={e => handleChange('departureDate', e.target.value)} 
            />
          </div>

          <div className="form-group passenger-group">
            <label>No of Passengers</label>
            <div className="passenger-trigger" onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}>
              {getPassengerText()}
              <span className="dropdown-icon">▼</span>
            </div>
            {showPassengerDropdown && (
              <div className="passenger-dropdown">
                <div className="passenger-row">
                  <span>Adults</span>
                  <div className="counter">
                    <button type="button" onClick={() => handlePassengerChange('adults', -1)}>-</button>
                    <span>{formData.adults}</span>
                    <button type="button" onClick={() => handlePassengerChange('adults', 1)}>+</button>
                  </div>
                </div>
                <div className="passenger-row">
                  <span>Children</span>
                  <div className="counter">
                    <button type="button" onClick={() => handlePassengerChange('children', -1)}>-</button>
                    <span>{formData.children}</span>
                    <button type="button" onClick={() => handlePassengerChange('children', 1)}>+</button>
                  </div>
                </div>
                <div className="passenger-row">
                  <span>Infants</span>
                  <div className="counter">
                    <button type="button" onClick={() => handlePassengerChange('infants', -1)}>-</button>
                    <span>{formData.infants}</span>
                    <button type="button" onClick={() => handlePassengerChange('infants', 1)}>+</button>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="done-btn" 
                  onClick={() => setShowPassengerDropdown(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>

          <button className="search-btn" type="submit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        <div className="form-row-bottom">
          <div className="hotel-amenities-row">
            <div className="form-group">
              <label>Hotel Standard</label>
              <div className="hotel-stars">
                {['3★', '4★', '5★'].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${formData.hotelStandard === star ? 'active' : ''}`}
                    onClick={() => handleChange('hotelStandard', star)}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group meal-options">
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.addLunch} 
                  onChange={e => handleChange('addLunch', e.target.checked)} 
                />
                Add Lunch
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={formData.addDinner} 
                  onChange={e => handleChange('addDinner', e.target.checked)} 
                />
                Add Dinner
              </label>
            </div>

            <div className="info-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </div>
        </div>

        <div className="flight-details-row">
          <div className="flight-detail">
            <span className="detail-label">From</span>
            <span className="detail-value">{getFromLabel()}</span>
          </div>
          <div className="flight-date-info">
            <span className="date-label">Departure Date</span>
            <span className="date-value">{formatDate(formData.departureDate)}</span>
          </div>
          <div className="flight-swap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </div>
          <div className="flight-detail">
            <span className="detail-label">To</span>
            <span className="detail-value">{getToLabel()}</span>
          </div>
          <div className="flight-date-info">
            <span className="date-label">Return Date</span>
            <span className="date-value">{formatDate(formData.returnDate)}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
