import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PackageWithoutFlight from './pages/PackageWithoutFlight';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="App app-with-sidebar">
            <Sidebar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/packages" element={<PackageWithoutFlight />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
