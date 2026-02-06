import React from 'react';
import airIndia from '../assets/Air_India.webp';
import airIndiaExpress from '../assets/Air_India_Express.jpeg';
import indigo from '../assets/Indigo.png';
import starAir from '../assets/Star_Air.png';

import './FlightCard.css';

const FlightCard = ({ flight, onSelect, isSelected }) => {
  const { airline, flightNumber, departure, arrival, duration, from, to, price, handBaggage,refundable, stops } = flight;

  const getAirportCode = (city) => {
    const codes = {
      'Delhi': 'DEL', 'Mumbai': 'BOM', 'Bangalore': 'BLR', 'Chennai': 'MAA',
      'Kolkata': 'CCU', 'Hyderabad': 'HYD', 'Goa': 'GOI', 'GOX': 'GOX', 
      'Pune': 'PNQ', 'Jaipur': 'JAI', 'Ahmedabad': 'AMD'
    };
    return codes[city] || city.substring(0, 3).toUpperCase();
  };

  const getAirlineLogo = (airlineName) => {
    const airlineLogos = {
      'Air India': airIndia,
      'Air India Express': airIndiaExpress,
      'Indigo': indigo,
      'Star Air': starAir
    };
    return airlineLogos[airlineName] || '✈️';
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div 
      className={`flight-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(flight)}
    >
      <div className="flight-card-header">
        <div className="airline-section">
          <div className="airline-logo">
            <img
              src={getAirlineLogo(airline)}
              alt={airline}
              className="airline-logo"
            />
          </div>
          <div className="airline-info">
            <div className="airline-name">{airline}</div>
            <div className="flight-number">{flightNumber}</div>
          </div>
        </div>

        <div className="flight-times-section">
          <div className="time-info">
            <div className="time">{departure}</div>
            <div className="airport">{getAirportCode(from)}</div>
          </div>

          <div className="duration-info">
            <div className="duration">{duration}</div>
            <div className="flight-line">
              <div className="line"></div>
              <div className="stops-indicator">
                {stops === 'Direct' ? (
                  <span className="direct-badge">Non-stop</span>
                ) : (
                  <span className="stop-badge">{stops}</span>
                )}
              </div>
            </div>
          </div>

          <div className="time-info">
            <div className="time">{arrival}</div>
            <div className="airport">{getAirportCode(to)}</div>
          </div>
        </div>
      </div>

      <div className="flight-card-footer">
        <div className="baggage-info">
          <div className="baggage-item">
            <input type="checkbox" checked readOnly />
            <span>{formatPrice(price)}</span>
            <span className="badge orange">Instant</span>
          </div>
          <div className="baggage-item">
            <input type="checkbox" />
            <span>{formatPrice(price)}</span>
            <span className="badge gray">Normal</span>
          </div>
          <div className="baggage-item">
            <input type="checkbox" />
            <span>{formatPrice(price)}</span>
            <span className="badge gray">Flexible</span>
          </div>
        </div>

        <div className="flight-amenities">
          <span className="amenity">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
            </svg>
            Hand Baggage - {handBaggage}
          </span>
          <span className="amenity">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
            </svg>
            Check-In Baggage
          </span>
          <span className={`amenity ${refundable ? 'refundable' : 'non-refundable'}`}>
            <span className={`dot ${refundable ? 'green' : 'gray'}`}></span>
            {refundable ? 'Refundable' : 'Non-refundable'}
          </span>
          <button className="rules-btn">Rules</button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
