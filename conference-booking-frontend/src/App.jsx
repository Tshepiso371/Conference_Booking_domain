import { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";
import Heartbeat from "./components/Heartbeat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useBookings from "./hooks/useBookings";

function App() {
  const { bookings, loading, error } = useBookings();

  if (loading) return <h2>Loading bookings...</h2>;
  if (error) return <h2></h2>;

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Conference Booking Dashboard</h1>
        <h2>Total Bookings: {bookings.length}</h2>

        <BookingList bookings={bookings} />
      </div>

      <Footer />
    </>
  );
}

export default App;
  