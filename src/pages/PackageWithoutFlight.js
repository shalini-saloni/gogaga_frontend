import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './PackageWithoutFlight.css';

const PackageWithoutFlight = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
    hotelType: '3-4',
    mealPlan: 'breakfast',
    activities: []
  });

  const [showActivities, setShowActivities] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const destinations = [
    { name: 'Goa', price: 12000, image: '🏖️' },
    { name: 'Kerala', price: 15000, image: '🌴' },
    { name: 'Rajasthan', price: 18000, image: '🏰' },
    { name: 'Himachal Pradesh', price: 16000, image: '⛰️' },
    { name: 'Uttarakhand', price: 14000, image: '🏔️' },
    { name: 'Karnataka', price: 13000, image: '🌺' }
  ];

  const activities = [
    { id: 'sightseeing', name: 'City Sightseeing', price: 2000 },
    { id: 'adventure', name: 'Adventure Sports', price: 3500 },
    { id: 'spa', name: 'Spa & Wellness', price: 2500 },
    { id: 'cultural', name: 'Cultural Tours', price: 1500 },
    { id: 'shopping', name: 'Shopping Tour', price: 1000 },
    { id: 'food', name: 'Food Tour', price: 1800 }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActivity = (activityId) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter(id => id !== activityId)
        : [...prev.activities, activityId]
    }));
  };

  const calculateTotalPrice = () => {
    const destination = destinations.find(d => d.name === formData.destination);
    if (!destination) return 0;

    const nights = formData.checkIn && formData.checkOut
      ? Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
      : 0;

    let basePrice = destination.price * nights * formData.rooms;

    // Add meal plan cost
    const mealCosts = {
      'breakfast': 500,
      'half-board': 1000,
      'full-board': 1500
    };
    basePrice += mealCosts[formData.mealPlan] * nights * (formData.adults + formData.children);

    // Add activities cost
    const activitiesCost = formData.activities.reduce((total, activityId) => {
      const activity = activities.find(a => a.id === activityId);
      return total + (activity ? activity.price : 0);
    }, 0);

    return basePrice + activitiesCost;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Please login to book a package');
      navigate('/login');
      return;
    }

    if (!formData.destination || !formData.checkIn || !formData.checkOut) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate booking
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      // Reset form
      setFormData({
        destination: '',
        checkIn: '',
        checkOut: '',
        adults: 2,
        children: 0,
        rooms: 1,
        hotelType: '3-4',
        mealPlan: 'breakfast',
        activities: []
      });
    }, 3000);
  };

  return (
    <div className="package-page">
      <div className="package-container">
        <div className="package-hero">
          <h1>Holiday Packages</h1>
          <p>Book amazing holiday packages without flights</p>
        </div>

        <div className="package-content">
          <div className="destinations-section">
            <h2>Popular Destinations</h2>
            <div className="destinations-grid">
              {destinations.map(dest => (
                <div
                  key={dest.name}
                  className={`destination-card ${formData.destination === dest.name ? 'selected' : ''}`}
                  onClick={() => handleChange('destination', dest.name)}
                >
                  <div className="dest-image">{dest.image}</div>
                  <h3>{dest.name}</h3>
                  <p className="dest-price">From ₹{dest.price.toLocaleString()}/night</p>
                  {formData.destination === dest.name && (
                    <div className="selected-badge">✓ Selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form className="package-form" onSubmit={handleSubmit}>
            <h2>Package Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Check-in Date</label>
                <input
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => handleChange('checkIn', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>Check-out Date</label>
                <input
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => handleChange('checkOut', e.target.value)}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Adults</label>
                <input
                  type="number"
                  value={formData.adults}
                  onChange={(e) => handleChange('adults', parseInt(e.target.value))}
                  min="1"
                  max="10"
                />
              </div>

              <div className="form-group">
                <label>Children</label>
                <input
                  type="number"
                  value={formData.children}
                  onChange={(e) => handleChange('children', parseInt(e.target.value))}
                  min="0"
                  max="10"
                />
              </div>

              <div className="form-group">
                <label>Rooms</label>
                <input
                  type="number"
                  value={formData.rooms}
                  onChange={(e) => handleChange('rooms', parseInt(e.target.value))}
                  min="1"
                  max="5"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Hotel Category</label>
                <select
                  value={formData.hotelType}
                  onChange={(e) => handleChange('hotelType', e.target.value)}
                >
                  <option value="2-3">2★ - 3★</option>
                  <option value="3-4">3★ - 4★</option>
                  <option value="4-5">4★ - 5★</option>
                  <option value="5">5★ Luxury</option>
                </select>
              </div>

              <div className="form-group">
                <label>Meal Plan</label>
                <select
                  value={formData.mealPlan}
                  onChange={(e) => handleChange('mealPlan', e.target.value)}
                >
                  <option value="breakfast">Breakfast Only</option>
                  <option value="half-board">Half Board (Breakfast + Dinner)</option>
                  <option value="full-board">Full Board (All Meals)</option>
                </select>
              </div>
            </div>

            <div className="activities-section">
              <button
                type="button"
                className="activities-toggle"
                onClick={() => setShowActivities(!showActivities)}
              >
                Add Activities & Experiences
                <span className={`arrow ${showActivities ? 'up' : 'down'}`}>▼</span>
              </button>

              {showActivities && (
                <div className="activities-grid">
                  {activities.map(activity => (
                    <label key={activity.id} className="activity-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.activities.includes(activity.id)}
                        onChange={() => toggleActivity(activity.id)}
                      />
                      <div className="activity-info">
                        <strong>{activity.name}</strong>
                        <span>+₹{activity.price.toLocaleString()}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {formData.destination && formData.checkIn && formData.checkOut && (
              <div className="price-summary">
                <div className="summary-row">
                  <span>Base Package:</span>
                  <strong>₹{calculateTotalPrice().toLocaleString()}</strong>
                </div>
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <strong>₹{calculateTotalPrice().toLocaleString()}</strong>
                </div>
              </div>
            )}

            <button type="submit" className="book-package-btn">
              Book Package
              <span className="btn-arrow">→</span>
            </button>
          </form>
        </div>
      </div>

      {bookingConfirmed && (
        <div className="booking-modal">
          <div className="modal-content">
            <div className="success-animation">
              <div className="checkmark">✓</div>
            </div>
            <h2>Package Booked!</h2>
            <p>Your holiday package has been successfully booked</p>
            <p className="booking-ref">Booking Reference: #PKG{Date.now()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageWithoutFlight;
