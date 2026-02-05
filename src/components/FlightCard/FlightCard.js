import React from 'react';
import './FlightCard.css';

const FlightCard = ({ airline, time, price, highlight, selected }) => {
  return (
    <div className={`flight-row ${highlight ? 'highlight-bg' : ''}`}>
      <div className="airline-section">
        <div className="airline-logo">{airline[0]}</div>
        <div className="airline-meta">
          <span className="name">{airline}</span>
          <span className="code">IX 2879 TC</span>
        </div>
      </div>
      
      <div className="time-section">
        <div className="time-block">
          <strong>{time}</strong>
          <span>HYD</span>
        </div>
        <div className="duration-indicator">
          <span className="line"></span>
          <small>1h 25m</small>
        </div>
        <div className="time-block">
          <strong>13:30</strong>
          <span>GOI</span>
        </div>
      </div>

      <div className="price-section">
        <div className="price-tag">₹ {price} <span className="badge">PUBLISHED</span></div>
        <button className="rules-link">Rules</button>
      </div>
    </div>
  );
};

export default FlightCard;