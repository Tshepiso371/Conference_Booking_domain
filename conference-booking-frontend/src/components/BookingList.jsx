// Import the BookingCard component
import BookingCard from "./BookingCard"

function BookingList({ bookings, onDelete }) {
  return (
    // Container div styled as a grid layout
    <div className="booking-grid">
      {
        // Loop through the bookings array
        // and render a BookingCard for each booking
        bookings.map(b => (
          <BookingCard
            // Unique key required by React for list rendering
            key={b.bookingId}

            // Pass booking ID as a prop
            id={b.bookingId}

            // Pass the room name
            roomName={b.roomName}

            // Convert the start date into a readable local date/time string
            date={new Date(b.start).toLocaleString()}

            // Pass the user who created the booking
            user={b.createdBy}

            // Pass down the delete handler function
            onDelete={onDelete}
          />
        ))
      }
    </div>
  );
}

// Export the component so it can be used in other files
export default BookingList;