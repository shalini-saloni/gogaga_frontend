import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import FlightCard from './components/FlightCard/FlightCard';
import flightData from './data/flightData.json';
import './App.css';

function App() {
  // Start with completely empty state
  const [query, setQuery] = useState({ from: '', to: '', date: '' });
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    // Validation: Require all fields before filtering
    if (!query.from || !query.to || !query.date) {
      alert("Please enter a From city, To city, and select a Date.");
      return;
    }

    // Filter logic strictly matches user input against your 50 JSON entries
    const filtered = flightData.filter(f => 
      f.from.toLowerCase() === query.from.toLowerCase() &&
      f.to.toLowerCase() === query.to.toLowerCase()
    );

    setResults(filtered);
    setHasSearched(true);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-viewport">
        <Header />
        <div className="content-area">
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

          {/* Conditional Rendering: Only show results if search has been triggered */}
          {!hasSearched ? (
            <div className="welcome-placeholder">
              <h2>Where would you like to go?</h2>
              <p>Enter details above to see available flights from our database.</p>
            </div>
          ) : (
            <div className="flight-display-grid">
              <div className="flight-column">
                <h3 className="col-title outbound">Outbound Flights</h3>
                {results.filter(f => f.type === "Outbound").map(flight => (
                  <FlightCard key={flight.id} {...flight} />
                ))}
                {results.filter(f => f.type === "Outbound").length === 0 && (
                  <p className="no-results">No outbound flights found for this route.</p>
                )}
              </div>

              <div className="flight-column">
                <h3 className="col-title return">Return Flights</h3>
                {results.filter(f => f.type === "Return").map(flight => (
                  <FlightCard key={flight.id} {...flight} />
                ))}
                {results.filter(f => f.type === "Return").length === 0 && (
                  <p className="no-results">No return flights found for this route.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;