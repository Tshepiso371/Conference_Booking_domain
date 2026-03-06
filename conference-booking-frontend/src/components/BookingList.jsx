import BookingCard from "./BookingCard"

function BookingList({ bookings, onDelete , deleteBooking}) {
  return (
    <div className="booking-grid">
      {bookings.map(b => (
  <BookingCard
    key={b.bookingId}
    id={b.bookingId}
    roomName={b.roomName}
    date={new Date(b.start).toLocaleString()}
    user={b.createdBy}
    onDelete={deleteBooking}
  />
))}
    </div>
  );
}

export default BookingList;