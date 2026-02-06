import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import flightData from '../data/flightData.json';
import './Dashboard.css';

const Dashboard = () => {
  const { 
    searchParams, 
    selectedOutbound, 
    selectedReturn, 
    selectOutboundFlight, 
    selectReturnFlight 
  } = useBooking();

  const [outboundFlights, setOutboundFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (searchParams.from && searchParams.to) {
      handleSearch(searchParams);
    }
  }, [searchParams]);

  const handleSearch = (params) => {
    const outbound = flightData.filter(f => 
      f.from === params.from && 
      f.to === params.to && 
      f.type === 'Outbound' && 
      f.date === params.departureDate
    );

    const returnF = flightData.filter(f => 
      f.from === params.to && 
      f.to === params.from && 
      f.type === 'Return' && 
      f.date === params.returnDate
    );

    setOutboundFlights(outbound);
    setReturnFlights(returnF);
    setHasSearched(true);
  };

  const getTotalPrice = () => {
    if (!selectedOutbound || !selectedReturn) return 0;
    const passengers = searchParams.adults + searchParams.children + searchParams.infants;
    return (selectedOutbound.price + selectedReturn.price) * passengers;
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <SearchForm onSearch={handleSearch} />

        {hasSearched && (
          <>
            {selectedOutbound && selectedReturn && (
              <div className="summary-bar">
                <div className="summary-section">
                  <span className="summary-label">Departure - Air India</span>
                  <div className="summary-details">
                    <span className="summary-time">{selectedOutbound.departure} → {selectedOutbound.arrival}</span>
                    <span className="summary-price">{formatPrice(selectedOutbound.price)}</span>
                  </div>
                </div>
                <div className="summary-section">
                  <span className="summary-label">Return - Air India</span>
                  <div className="summary-details">
                    <span className="summary-time">{selectedReturn.departure} → {selectedReturn.arrival}</span>
                    <span className="summary-price">{formatPrice(selectedReturn.price)}</span>
                  </div>
                </div>
                <div className="summary-total">
                  <span className="summary-passengers">for {searchParams.adults} adult, {searchParams.children} children</span>
                  <div className="summary-total-price">
                    Total Round fare {formatPrice(getTotalPrice())}
                  </div>
                  <button className="continue-btn">Continue</button>
                </div>
              </div>
            )}

            <div className="flights-grid">
              <div className="flight-column">
                <h3 className="column-title">Outbound: {searchParams.from} (HYD)</h3>
                <div className="column-headers">
                  <span>Departure</span>
                  <span>Duration</span>
                  <span>Arrival</span>
                </div>
                {outboundFlights.map(flight => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={selectOutboundFlight}
                    isSelected={selectedOutbound?.id === flight.id}
                  />
                ))}
              </div>

              <div className="flight-column">
                <h3 className="column-title">Inbound: {searchParams.to} (GOI)</h3>
                <div className="column-headers">
                  <span>Departure</span>
                  <span>Duration</span>
                  <span>Arrival</span>
                </div>
                {returnFlights.map(flight => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={selectReturnFlight}
                    isSelected={selectedReturn?.id === flight.id}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
