import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import FlightCard from './components/FlightCard/FlightCard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-viewport">
        <Header />
        <div className="content-padding">
          <div className="tab-system">
            <button className="tab active">Indian Holidays</button>
            <button className="tab">International Holidays</button>
          </div>
          
          <SearchBar />

          <div className="flight-results-container">
            {/* Outbound Column */}
            <div className="flight-column">
              <div className="column-header blue-grad">
                <span>Departure {`->`} Hyderabad (HYD)</span>
                <span>11:30 {`->`} 18:55</span>
                <strong>₹ 105,300.00</strong>
              </div>
              <FlightCard airline="Air India Express" time="12:05" price="13,300" selected />
              <FlightCard airline="Air India" time="11:30" price="105,300" highlight />
              <FlightCard airline="Indigo" time="20:50" price="13,300" />
            </div>

            {/* Return Column */}
            <div className="flight-column">
              <div className="column-header blue-grad">
                <span>Return  {`->`} Goa (GOI)</span>
                <span>00:50 {`->`} 01:55</span>
                <strong>₹ 105,300.00</strong>
              </div>
              <FlightCard airline="Air India Express" time="12:05" price="13,300" selected />
              <FlightCard airline="Air India" time="13:15" price="105,300" highlight />
              <FlightCard airline="Indigo" time="20:50" price="13,300" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;