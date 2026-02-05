import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import flightData from '../data/flightData.json'; // [cite: 9, 18]
import { useBooking } from '../context/BookingContext';
import './Dashboard.css';

const Dashboard = () => {
  const { selectedOutbound, selectedReturn, selectOutboundFlight, selectReturnFlight } = useBooking();
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (params) => {
    const results = flightData.filter(f => 
      f.from.toLowerCase() === params.origin.toLowerCase() &&
      f.to.toLowerCase() === params.destination.toLowerCase()
    );
    setFilteredFlights(results);
    setHasSearched(true);
  };

  const totalFare = (selectedOutbound?.price || 0) + (selectedReturn?.price || 0);

  return (
    <div className="dashboard-page">
      <div className="holiday-tabs">
        <button className="tab active">Indian Holidays</button>
        <button className="tab">International Holidays</button>
      </div>

      <SearchForm onSearch={handleSearch} />

      {hasSearched && (
        <div className="results-container">
          {/* Blue Summary Banner from the reference image */}
          <div className="price-summary-banner">
            <div>Outbound: {selectedOutbound ? `${selectedOutbound.departure} → ${selectedOutbound.arrival}` : 'Select Flight'} | ₹{selectedOutbound?.price || 0}</div>
            <div>Return: {selectedReturn ? `${selectedReturn.departure} → ${selectedReturn.arrival}` : 'Select Flight'} | ₹{selectedReturn?.price || 0}</div>
            <div className="total-price">Total Fare: <strong>₹{totalFare.toLocaleString()}</strong></div>
          </div>

          <div className="flight-grid">
            <div className="flight-column">
              <h3>Outbound Flights</h3>
              <div className="scroll-area">
                {filteredFlights.filter(f => f.type === 'Outbound').map(flight => (
                  <FlightCard 
                    key={flight.id} 
                    flight={flight} 
                    type="Outbound"
                    isSelected={selectedOutbound?.id === flight.id}
                    onSelect={() => selectOutboundFlight(flight)}
                  />
                ))}
              </div>
            </div>

            <div className="flight-column">
              <h3>Return Flights</h3>
              <div className="scroll-area">
                {filteredFlights.filter(f => f.type === 'Return').map(flight => (
                  <FlightCard 
                    key={flight.id} 
                    flight={flight} 
                    type="Return"
                    isSelected={selectedReturn?.id === flight.id}
                    onSelect={() => selectReturnFlight(flight)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;