import React from 'react';
import './FlightCard.css';

const FlightCard = ({ flight, onSelect, isSelected, type }) => {
  const { airline, departure, arrival, price, from, to } = flight;
  
  const logoUrl = `/assets/${airline.replace(/\s+/g, '_')}.png`;

  const calculateDuration = (dep, arr) => {
    const [depHour, depMin] = dep.split(':').map(Number);
    const [arrHour, arrMin] = arr.split(':').map(Number);
    
    let totalMinutes = (arrHour * 60 + arrMin) - (depHour * 60 + depMin);
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const duration = calculateDuration(departure, arrival);

  const getAirportCode = (city) => {
    const codes = {
      'Delhi': 'DEL',
      'Mumbai': 'BOM',
      'Bangalore': 'BLR',
      'Chennai': 'MAA',
      'Kolkata': 'CCU',
      'Hyderabad': 'HYD',
      'Goa': 'GOI',
      'Pune': 'PNQ',
      'Jaipur': 'JAI',
      'Ahmedabad': 'AMD'
    };
    return codes[city] || city.substring(0, 3).toUpperCase();
  };

  return (
    <div className={`flight-card ${isSelected ? 'selected' : ''}`}>
      <div className="flight-card-header">
        <div className="airline-info">
          <img src={logoUrl} alt={airline} className="airline-logo" onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNFNUU1RTUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2Ij4=';
          }} />
          <div className="airline-details">
            <strong>{airline}</strong>
            <small>{type === 'Outbound' ? 'Departure' : 'Return'} Flight</small>
          </div>
        </div>
        <div className="flight-type-badge">{type}</div>
      </div>

      <div className="flight-times">
        <div className="time-block">
          <div className="time">{departure}</div>
          <div className="airport">{getAirportCode(from)}</div>
          <div className="city">{from}</div>
        </div>

        <div className="duration-block">
          <div className="duration-text">{duration}</div>
          <div className="flight-path">
            <div className="path-line"></div>
            <div className="plane-icon">✈</div>
          </div>
          <div className="direct-text">Direct</div>
        </div>

        <div className="time-block">
          <div className="time">{arrival}</div>
          <div className="airport">{getAirportCode(to)}</div>
          <div className="city">{to}</div>
        </div>
      </div>

      <div className="flight-card-footer">
        <div className="price-section">
          <div className="price-label">Price per person</div>
          <div className="price">₹{price.toLocaleString()}</div>
        </div>
        <button 
          className={`select-btn ${isSelected ? 'selected' : ''}`}
          onClick={() => onSelect(flight)}
        >
          {isSelected ? (
            <>
              <span className="check-icon">✓</span>
              Selected
            </>
          ) : (
            'Select Flight'
          )}
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
