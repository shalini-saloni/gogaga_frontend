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
    updateSearchParams,
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

  const getDefaultOrigin = (destination) => {
    const routeMap = {
      'Mumbai': 'Delhi', 'Delhi': 'Mumbai', 'Bangalore': 'Hyderabad',
      'Hyderabad': 'Bangalore', 'Chennai': 'Kolkata', 'Kolkata': 'Chennai',
      'Goa': 'Delhi', 'Pune': 'Mumbai', 'Jaipur': 'Delhi', 'Ahmedabad': 'Mumbai'
    };
    return routeMap[destination] || 'Mumbai';
  };

  const handleSearch = (params) => {
    if (!isAuthenticated) {
      alert('Please login to search flights');
      navigate('/login');
      return;
    }

    const to = params.to;
    const from = params.from || (to ? getDefaultOrigin(to) : 'Mumbai') || 'Mumbai';
    const departureDate = params.departureDate;
    const returnDate = params.returnDate || params.departureDate;

    updateSearchParams({ ...params, from });

    const outboundFlights = flightData.filter(flight => 
      flight.from === from &&
      flight.to === to &&
      flight.type === 'Outbound' &&
      flight.date === departureDate
    );

    const returnFlights = flightData.filter(flight => 
      flight.from === to &&
      flight.to === from &&
      flight.type === 'Return' &&
      flight.date === returnDate
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
    const totalPassengers = searchParams.adults + searchParams.children + searchParams.infants;
    return (selectedOutbound.price + selectedReturn.price) * totalPassengers;
  };

  const getPassengerText = () => {
    const parts = [];
    if (searchParams.adults > 0) parts.push(`${searchParams.adults} adult${searchParams.adults > 1 ? 's' : ''}`);
    if (searchParams.children > 0) parts.push(`${searchParams.children} child${searchParams.children !== 1 ? 'ren' : ''}`);
    if (searchParams.infants > 0) parts.push(`${searchParams.infants} infant${searchParams.infants > 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  const getAirportCode = (city) => {
    const codes = {
      'Delhi': 'DEL', 'Mumbai': 'BOM', 'Bangalore': 'BLR', 'Chennai': 'MAA',
      'Kolkata': 'CCU', 'Hyderabad': 'HYD', 'Goa': 'GOI', 'Pune': 'PNQ',
      'Jaipur': 'JAI', 'Ahmedabad': 'AMD'
    };
    return codes[city] || city.substring(0, 3).toUpperCase();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <SearchForm onSearch={handleSearch} />

        {hasSearched && (
          <div className="search-results">
            {searchResults.outbound.length === 0 && searchResults.return.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">✈️</div>
                <h3>No flights found</h3>
                <p>Try adjusting your search criteria or destination</p>
              </div>
            ) : (
              <>
                <div className="flight-summary-bar">
                  <div className="summary-bar-content">
                    <div className="summary-departure">
                      <div className="summary-label">Departure</div>
                      <div className="summary-airline">
                        {selectedOutbound ? selectedOutbound.airline : 'Select flight'}
                      </div>
                      <div className="summary-time">
                        {selectedOutbound 
                          ? `${selectedOutbound.departure} - ${selectedOutbound.arrival}` 
                          : '-'}
                      </div>
                      <div className="summary-price">
                        {selectedOutbound 
                          ? `₹${(selectedOutbound.price * (searchParams.adults + searchParams.children + searchParams.infants)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` 
                          : '-'}
                      </div>
                    </div>
                    <div className="summary-return">
                      <div className="summary-label">Return</div>
                      <div className="summary-airline">
                        {selectedReturn ? selectedReturn.airline : 'Select flight'}
                      </div>
                      <div className="summary-time">
                        {selectedReturn 
                          ? `${selectedReturn.departure} - ${selectedReturn.arrival}` 
                          : '-'}
                      </div>
                      <div className="summary-price">
                        {selectedReturn 
                          ? `₹${(selectedReturn.price * (searchParams.adults + searchParams.children + searchParams.infants)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` 
                          : '-'}
                      </div>
                    </div>
                    <div className="summary-total">
                      <div className="summary-passengers">
                        for {getPassengerText()}
                      </div>
                      <div className="summary-total-fare">
                        Total Round fare ₹{getTotalPrice().toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      {selectedOutbound && selectedReturn && (
                        <button 
                          className="confirm-booking-inline-btn"
                          onClick={handleConfirmBooking}
                        >
                          Continue
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flights-two-column">
                  <div className="flight-column">
                    <h3 className="column-header">
                      Outbound: {searchParams.from ? `${getAirportCode(searchParams.from)} (${searchParams.from})` : ''}
                    </h3>
                    <div className="column-headers">
                      <span>Departure</span>
                      <span>Duration</span>
                      <span>Arrival</span>
                    </div>
                    <div className="flights-list">
                      {searchResults.outbound.map(flight => (
                        <FlightCard
                          key={flight.id}
                          flight={flight}
                          type="Outbound"
                          isSelected={selectedOutbound?.id === flight.id}
                          onSelect={selectOutboundFlight}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flight-column">
                    <h3 className="column-header">
                      Inbound: {searchParams.to ? `${getAirportCode(searchParams.to)} (${searchParams.to})` : ''}
                    </h3>
                    <div className="column-headers">
                      <span>Departure</span>
                      <span>Duration</span>
                      <span>Arrival</span>
                    </div>
                    <div className="flights-list">
                      {searchResults.return.map(flight => (
                        <FlightCard
                          key={flight.id}
                          flight={flight}
                          type="Return"
                          isSelected={selectedReturn?.id === flight.id}
                          onSelect={selectReturnFlight}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </div>
                </div>
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
