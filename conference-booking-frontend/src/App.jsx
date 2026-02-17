import { useState } from "react";
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";
import { bookings as initialBookings } from "./Data/mockData";

function App() {
  // STATE (memory of the app)
  const [bookings, setBookings] = useState(initialBookings);

  // Add new booking
  function addBooking(newBooking) {
    setBookings((prev) => [...prev, newBooking]); // immutable update
  }

  return (
    <div className="container">
      <h1>Conference Booking Dashboard</h1>

      {/* Derived state */}
      <h2>Total Bookings: {bookings.length}</h2>

      {/* Form */}
      <BookingForm onAddBooking={addBooking} />

      {/* List */}
      <BookingList bookings={bookings} />
    </div>
  );
}

export default App;