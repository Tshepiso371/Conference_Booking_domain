import BookingCard from "./Temp3"

function BookingList({bookings}) {
  return (
    <div className="booking-grid">
      {bookings.map((b) => (
        <BookingCard
          key={b.id}
          roomName={b.roomName}
          date={b.date}
          user={b.user}
        />
      ))}
    </div>
  );
}

export default BookingList;