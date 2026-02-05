import React from 'react';
import './FlightCard.css';

const FlightCard = ({ flight, onSelect, isSelected, type, variant = 'default' }) => {
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
      'Delhi': 'DEL', 'Mumbai': 'BOM', 'Bangalore': 'BLR', 'Chennai': 'MAA',
      'Kolkata': 'CCU', 'Hyderabad': 'HYD', 'Goa': 'GOI', 'Pune': 'PNQ',
      'Jaipur': 'JAI', 'Ahmedabad': 'AMD'
    };
    return codes[city] || city.substring(0, 3).toUpperCase();
  };

  const isRefundable = Math.random() > 0.3;

  if (variant === 'compact') {
    return (
      <div 
        className={`flight-card flight-card-compact ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelect(flight)}
      >
        <div className="compact-radio">
          <div className={`radio-circle ${isSelected ? 'selected' : ''}`} />
        </div>
        <div className="compact-content">
          <div className="compact-airline">
            <div className="compact-logo-wrap">
              <img 
                src={logoUrl} 
                alt={airline} 
                className="compact-logo" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="compact-logo-fallback">{airline.charAt(0)}</span>
            </div>
            <span className="compact-airline-name">{airline}</span>
          </div>
          <div className="compact-times">
            <div className="compact-time-block">
              <span className="compact-time">{departure}</span>
              <span className="compact-airport">{getAirportCode(from)}</span>
            </div>
            <span className="compact-duration">{duration}</span>
            <div className="compact-time-block">
              <span className="compact-time">{arrival}</span>
              <span className="compact-airport">{getAirportCode(to)}</span>
            </div>
          </div>
          <div className="compact-price">₹ {price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <div className="compact-details">
            <span className="compact-detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              Hand Baggage - 7 Kg
            </span>
            <span className="compact-detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              Check-in Baggage
            </span>
            <span className={`compact-detail refundable ${isRefundable ? 'yes' : 'no'}`}>
              <span className="refund-dot" />
              {isRefundable ? 'Refundable' : 'Non-refundable'}
            </span>
            <button
              type="button"
              className="compact-rules"
              onClick={(e) => e.stopPropagation()}
            >
              Rules
            </button>
          </div>
        </div>
      </div>
    );
  }

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
