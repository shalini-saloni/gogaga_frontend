import React from 'react';
import './FlightCard.css';

const FlightCard = ({ airline, departure, arrival, price, duration, departureTime, arrivalTime, departureDate, arrivalDate, outbound, inbound, handBaggage, checkInBaggage, refundable, rules }) => {
  // Construct path based on airline name
  const logoUrl = `/assets/${airline.replace(/\s+/g, '_')}.png`;

  return (
    <div className="detailed-card">
      <div className="card-top">
        <img src={logoUrl} alt={airline} className="airline-logo-img" />
        <div className="airline-info">
          <strong>{airline}</strong>
          <small>IX 2879 TC</small>
        </div>
      </div>
      
      <div className="flight-times">
        <div className="time-box">
          <strong>{departure}</strong>
          <span>HYD</span>
        </div>
        <div className="duration-graphic">
          <small>1h 25m</small>
          <div className="plane-line"></div>
        </div>
        <div className="time-box">
          <strong>{arrival}</strong>
          <span>GOI</span>
        </div>
      </div>
      
      <div className="card-bottom">
        <div className="price-tag">
          ₹ {price.toLocaleString()}
          <span className="p-badge">PUBLI</span>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
