import { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";
import { fetchAllBookings } from "./services/bookingServices";
import Heartbeat from "./components/Heartbeat";

function App() {
  // STATE
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bookings (async)
  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAllBookings();
        setBookings(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  // Add new booking
  function addBooking(newBooking) {
    setBookings((prev) => [...prev, newBooking]);
  }

  // Delete booking
  function deleteBooking(id) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  // Retry function
  function retry() {
    setError("");
    setLoading(true);

    async function loadBookings() {
      try {
        const data = await fetchAllBookings();
        setBookings(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }

  // UI states
  if (loading) {
    return <h2>Loading bookings...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container">
      <Heartbeat />

      <h1>Conference Booking Dashboard</h1>

      <h2>Total Bookings: {bookings.length}</h2>

      <BookingForm onAddBooking={addBooking} />

      <BookingList bookings={bookings} onDelete={deleteBooking} />
    </div>
  );
}

export default App;