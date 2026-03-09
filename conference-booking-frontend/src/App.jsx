import { useState } from "react";
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import useBookings from "./hooks/useBookings";

function App() {

  // Check if user already has a token
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // Hook for booking data
  const { bookings, loading, error, refetch, cancelBooking } = useBookings();

  // If not logged in show login form
  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  if (loading) return <h2>Loading bookings...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Conference Booking Dashboard</h1>
        <h2>Total Bookings: {bookings.length}</h2>

        <BookingForm onBookingCreated={refetch} />

        <BookingList
          bookings={bookings}
          onDelete={cancelBooking}
        />
      </div>

      <Footer />
    </>
  );
}

export default App;