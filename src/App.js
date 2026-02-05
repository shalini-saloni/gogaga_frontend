import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FlightCard from "./components/FlightCard";
import flightData from "./data/flightData.json";
import "./App.css";

function App() {
  const [query, setQuery] = useState({ from: "", to: "", date: "" });
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const handleSearch = () => {
    if (!query.from || !query.to || !query.date) {
      alert("Enter From, To and Date");
      return;
    }

    const filtered = flightData.filter(
      f =>
        f.from.toLowerCase() === query.from.toLowerCase() &&
        f.to.toLowerCase() === query.to.toLowerCase()
    );

    setResults(filtered);
    setSelectedOutbound(null);
    setSelectedReturn(null);
    setHasSearched(true);
  };

  const totalFare =
    (selectedOutbound?.price || 0) +
    (selectedReturn?.price || 0);

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-viewport">
        <Header />

        <div className="content-area">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />

          {!hasSearched ? (
            <div className="welcome-placeholder">
              <h2>Where would you like to go?</h2>
              <p>Search flights to begin</p>
            </div>
          ) : (
            <>
              {/* SUMMARY BAR */}
              <div className="summary-bar">
                <div>
                  Departure:
                  <b>
                    {selectedOutbound
                      ? ` ${selectedOutbound.departure} → ${selectedOutbound.arrival}`
                      : " Not selected"}
                  </b>
                </div>

                <div>
                  Return:
                  <b>
                    {selectedReturn
                      ? ` ${selectedReturn.departure} → ${selectedReturn.arrival}`
                      : " Not selected"}
                  </b>
                </div>

                <div className="summary-price">
                  Total Fare ₹{totalFare}
                </div>
              </div>

              {/* FLIGHTS */}
              <div className="flight-display-grid">
                {/* OUTBOUND */}
                <div className="flight-column">
                  <h3 className="col-title outbound">Outbound Flights</h3>

                  {results
                    .filter(f => f.type === "Outbound")
                    .map(f => (
                      <FlightCard
                        key={f.id}
                        flight={f}
                        selected={selectedOutbound?.id === f.id}
                        onSelect={setSelectedOutbound}
                      />
                    ))}
                </div>

                {/* RETURN */}
                <div className="flight-column">
                  <h3 className="col-title return">Return Flights</h3>

                  {results
                    .filter(f => f.type === "Return")
                    .map(f => (
                      <FlightCard
                        key={f.id}
                        flight={f}
                        selected={selectedReturn?.id === f.id}
                        onSelect={setSelectedReturn}
                      />
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
