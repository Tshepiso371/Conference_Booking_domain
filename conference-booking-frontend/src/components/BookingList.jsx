import BookingCard from "./BookingCard"

function BookingList({ bookings, onDelete }) {
  return (
    <div className="booking-grid">
      {bookings.map((b) => (
        <BookingCard
          key={b.id}
          id={b.id}
          roomName={b.roomName}
          date={b.date}
          user={b.user}
          onDelete={() => onDelete(b.id)}
        />
      ))}
    </div>
  );
}

export default BookingList;