import React from "react";
import "./FlightCard.css";

const FlightCard = ({ flight, selected, onSelect }) => {
  return (
    <div
      className={`flight-row ${selected ? "highlight-bg" : ""}`}
      onClick={() => onSelect(flight)}
    >
      {/* Airline */}
      <div className="airline-section">
        <div className="airline-logo">{flight.airline[0]}</div>
        <div className="airline-meta">
          <span className="name">{flight.airline}</span>
          <span className="code">IX 2879 TC</span>
        </div>
      </div>

      {/* Time */}
      <div className="time-section">
        <div className="time-block">
          <strong>{flight.departure}</strong>
          <span>{flight.from}</span>
        </div>

        <div className="duration-indicator">
          <span className="line"></span>
          <small>Non Stop</small>
        </div>

        <div className="time-block">
          <strong>{flight.arrival}</strong>
          <span>{flight.to}</span>
        </div>
      </div>

      {/* Price */}
      <div className="price-section">
        <div className="price-tag">
          ₹ {flight.price} <span className="badge">PUBLISHED</span>
        </div>
        <button className="rules-link">Rules</button>
      </div>
    </div>
  );
};

export default FlightCard;
