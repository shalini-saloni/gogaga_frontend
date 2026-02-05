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
  { value: 'Goa', label: 'Goa International Airport (GOI), Goa, India' }
];

const SearchForm = ({ onSearch }) => {
  const { searchParams, updateSearchParams } = useBooking();

  const [formData, setFormData] = useState({
    to: searchParams.to || 'Mumbai',
    departureDate: searchParams.departureDate || '2026-03-12',
    returnDate: searchParams.returnDate || '2026-03-17',
    adults: searchParams.adults || 2,
    children: searchParams.children || 2,
    infants: searchParams.infants || 0,
    packageType: searchParams.packageType || 'with-flight',
    hotelStandard: searchParams.hotelStandard || '50',
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
    return `${formData.adults} Adult, ${formData.children} Child`;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    });

  const getDestinationLabel = () => {
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
      {/* TABS */}
      <div className="search-tabs">
        <button className={`tab-btn ${activeTab === 'indian' ? 'active' : ''}`} onClick={() => setActiveTab('indian')}>
          Indian Holidays
        </button>
        <button className={`tab-btn ${activeTab === 'international' ? 'active' : ''}`} onClick={() => setActiveTab('international')}>
          International Holidays
        </button>
      </div>

      {/* PACKAGE TYPE */}
      <div className="package-type-selector">
        <button className={`package-btn ${formData.packageType === 'with-flight' ? 'active' : ''}`} onClick={() => handleChange('packageType', 'with-flight')}>
          Package with Flights
        </button>
        <button className={`package-btn ${formData.packageType === 'without-flight' ? 'active' : ''}`} onClick={() => handleChange('packageType', 'without-flight')}>
          Package without Flights
        </button>
      </div>

      {/* MAIN FORM ROW */}
      <form onSubmit={handleSubmit} className="search-form-row">
        
        {/* LEFT BLOCK: DESTINATION + HOTEL STACK */}
        <div className="destination-stack">
          <div className="form-group">
            <label>DESTINATION</label>
            <div className="custom-select-wrapper">
              <div className="custom-select-trigger" onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}>
                {getDestinationLabel()} <span>▼</span>
              </div>
              {showDestinationDropdown && (
                <div className="custom-dropdown">
                  {destinations.map(dest => (
                    <div key={dest.value} className="dropdown-option" onClick={() => { handleChange('to', dest.value); setShowDestinationDropdown(false); }}>
                      {dest.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hotel-amenities-subrow">
            <div className="form-group">
              <label>HOTEL STANDARD</label>
              <div className="hotel-btn-group">
                {['3★', '4★', '5★'].map(star => (
                  <button key={star} type="button" className={`hotel-pill ${formData.hotelStandard === star ? 'active' : ''}`} onClick={() => handleChange('hotelStandard', star)}>{star}</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>AMENITIES</label>
              <div className="amenity-checks">
                <label><input type="checkbox" checked={formData.addLunch} onChange={e => handleChange('addLunch', e.target.checked)} /> ADD LUNCH</label>
                <label><input type="checkbox" checked={formData.addDinner} onChange={e => handleChange('addDinner', e.target.checked)} /> ADD DINNER</label>
              </div>
            </div>
          </div>
        </div>

        {/* START DATE */}
        <div className="form-group date-field">
          <label>TRIP START DATE</label>
          <div className="input-with-subtext">
            <input type="date" value={formData.departureDate} onChange={e => handleChange('departureDate', e.target.value)} />
            <small>{formatDate(formData.departureDate)}</small>
          </div>
        </div>

        {/* RETURN DATE */}
        <div className="form-group date-field">
          <label>RETURN DATE</label>
          <div className="input-with-subtext">
            <input type="date" value={formData.returnDate} onChange={e => handleChange('returnDate', e.target.value)} />
            <small>{formatDate(formData.returnDate)}</small>
          </div>
        </div>

        {/* PASSENGERS */}
        <div className="form-group passenger-field">
          <label>NO. OF PASSENGERS</label>
          <div className="passenger-trigger-wrapper">
            <button type="button" className="passenger-trigger" onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}>
              {getPassengerText()} <span>▼</span>
            </button>
            {showPassengerDropdown && (
              <div className="passenger-popover">
                {['adults', 'children', 'infants'].map(type => (
                  <div key={type} className="popover-row">
                    <span className="capitalize">{type}</span>
                    <div className="counter-controls">
                      <button type="button" onClick={() => handlePassengerChange(type, -1)}>-</button>
                      <span>{formData[type]}</span>
                      <button type="button" onClick={() => handlePassengerChange(type, 1)}>+</button>
                    </div>
                  </div>
                ))}
                <button type="button" className="done-btn" onClick={() => setShowPassengerDropdown(false)}>Done</button>
              </div>
            )}
          </div>
        </div>

        {/* SEARCH ACTION */}
        <div className="search-action-field">
          <button className="search-submit-icon" type="submit">🔍</button>
        </div>

      </form>
    </div>
  );
};

export default SearchForm;