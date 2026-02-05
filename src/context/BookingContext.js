import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    adults: 2,
    children: 0,
    infants: 0,
    packageType: 'with-flight',
    hotelStandard: '50',
    addLunch: false,
    addDinner: true
  });

  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);

  const updateSearchParams = (params) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  };

  const selectOutboundFlight = (flight) => {
    setSelectedOutbound(flight);
  };

  const selectReturnFlight = (flight) => {
    setSelectedReturn(flight);
  };

  const confirmBooking = () => {
    if (selectedOutbound && selectedReturn) {
      const booking = {
        id: Date.now(),
        outbound: selectedOutbound,
        return: selectedReturn,
        searchParams,
        bookingDate: new Date().toISOString(),
        totalPrice: selectedOutbound.price + selectedReturn.price
      };
      
      setBookingHistory(prev => [...prev, booking]);
      
      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      // Reset selections
      setSelectedOutbound(null);
      setSelectedReturn(null);
      
      return booking;
    }
    return null;
  };

  const clearSelection = () => {
    setSelectedOutbound(null);
    setSelectedReturn(null);
  };

  const value = {
    searchParams,
    updateSearchParams,
    selectedOutbound,
    selectedReturn,
    selectOutboundFlight,
    selectReturnFlight,
    confirmBooking,
    clearSelection,
    bookingHistory
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
