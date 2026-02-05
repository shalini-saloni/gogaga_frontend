import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import flightData from '../data/flightData.json';
import './Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const { 
    searchParams, 
    selectedOutbound, 
    selectedReturn, 
    selectOutboundFlight, 
    selectReturnFlight,
    confirmBooking
  } = useBooking();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState({ outbound: [], return: [] });
  const [hasSearched, setHasSearched] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleSearch = (params) => {
    if (!isAuthenticated) {
      alert('Please login to search flights');
      navigate('/login');
      return;
    }

    // Filter flights based on search criteria
    const outboundFlights = flightData.filter(flight => 
      flight.from === params.from &&
      flight.to === params.to &&
      flight.type === 'Outbound' &&
      flight.date === params.departureDate
    );

    const returnFlights = flightData.filter(flight => 
      flight.from === params.to &&
      flight.to === params.from &&
      flight.type === 'Return' &&
      flight.date === params.returnDate
    );

    setSearchResults({
      outbound: outboundFlights,
      return: returnFlights
    });
    setHasSearched(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedOutbound || !selectedReturn) {
      alert('Please select both outbound and return flights');
      return;
    }

    const booking = confirmBooking();
    if (booking) {
      setShowBookingModal(true);
      setTimeout(() => {
        setShowBookingModal(false);
        setHasSearched(false);
        setSearchResults({ outbound: [], return: [] });
      }, 3000);
    }
  };

  const getTotalPrice = () => {
    if (!selectedOutbound || !selectedReturn) return 0;
    const basePrice = selectedOutbound.price + selectedReturn.price;
    const totalPassengers = searchParams.adults + searchParams.children;
    return basePrice * totalPassengers;
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-hero">
          <h1>Find Your Perfect Flight</h1>
          <p>Search and book flights from over 50+ airlines worldwide</p>
        </div>

        <SearchForm onSearch={handleSearch} />

        {hasSearched && (
          <div className="search-results">
            {searchResults.outbound.length === 0 && searchResults.return.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">✈️</div>
                <h3>No flights found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            ) : (
              <>
                {searchResults.outbound.length > 0 && (
                  <div className="flight-section">
                    <h2 className="section-title">
                      <span className="title-icon">🛫</span>
                      Outbound Flights
                      <span className="flight-count">{searchResults.outbound.length} flights</span>
                    </h2>
                    <div className="flights-grid">
                      {searchResults.outbound.map(flight => (
                        <FlightCard
                          key={flight.id}
                          flight={flight}
                          type="Outbound"
                          isSelected={selectedOutbound?.id === flight.id}
                          onSelect={selectOutboundFlight}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.return.length > 0 && (
                  <div className="flight-section">
                    <h2 className="section-title">
                      <span className="title-icon">🛬</span>
                      Return Flights
                      <span className="flight-count">{searchResults.return.length} flights</span>
                    </h2>
                    <div className="flights-grid">
                      {searchResults.return.map(flight => (
                        <FlightCard
                          key={flight.id}
                          flight={flight}
                          type="Return"
                          isSelected={selectedReturn?.id === flight.id}
                          onSelect={selectReturnFlight}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedOutbound && selectedReturn && (
                  <div className="booking-summary">
                    <div className="summary-content">
                      <div className="summary-details">
                        <h3>Booking Summary</h3>
                        <div className="summary-row">
                          <span>Outbound:</span>
                          <strong>{selectedOutbound.airline} - ₹{selectedOutbound.price.toLocaleString()}</strong>
                        </div>
                        <div className="summary-row">
                          <span>Return:</span>
                          <strong>{selectedReturn.airline} - ₹{selectedReturn.price.toLocaleString()}</strong>
                        </div>
                        <div className="summary-row">
                          <span>Passengers:</span>
                          <strong>{searchParams.adults + searchParams.children}</strong>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                          <span>Total Amount:</span>
                          <strong>₹{getTotalPrice().toLocaleString()}</strong>
                        </div>
                      </div>
                      <button className="confirm-booking-btn" onClick={handleConfirmBooking}>
                        Confirm Booking
                        <span className="btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="features-section">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Compare prices from multiple airlines and get the best deals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Booking</h3>
              <p>Your payment information is safe and secure with us</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Confirmation</h3>
              <p>Get instant booking confirmation via email and SMS</p>
            </div>
          </div>
        )}
      </div>

      {showBookingModal && (
        <div className="booking-modal">
          <div className="modal-content">
            <div className="success-animation">
              <div className="checkmark">✓</div>
            </div>
            <h2>Booking Confirmed!</h2>
            <p>Your flight has been successfully booked</p>
            <p className="booking-ref">Booking Reference: #{Date.now()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
