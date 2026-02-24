import { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";
import { fetchAllBookings } from "./services/bookingServices";
import Heartbeat from "./components/Heartbeat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useBookings from "./hooks/useBookings";

function App() {
  // STATE
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category , setCategory] = useState("All");

  useEffect(() => {
  async function loadBookings() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchAllBookings();

      const filtered =
        category === "All"
          ? data
          : data.filter((b) => b.category === category);

      setBookings(filtered);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  loadBookings();

}, [category]);

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
        setError(err.message || "Something went wrong");
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
   <>
    <Navbar />
    <div className="container">
      <Heartbeat />

      <h1 style={{ textAlign: "center"}}>
        Conference Booking Dashboard
        </h1>

      <h2>Total Bookings: {bookings.length}</h2>

      <BookingForm onAddBooking={addBooking} />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)}
          >
          <option value="All">All</option>
          <option value="Internal">Internal</option>
          <option value="Client">Client</option>
          </select>

      <BookingList bookings={bookings} onDelete={deleteBooking} />
    </div>

    <Footer />
    </>
  );
}

export default App;