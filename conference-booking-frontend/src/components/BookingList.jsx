import BookingCard from "./Temp3"

function BookingList({bookings,onDelete}) {
  return (
    <div className="booking-grid">
      {bookings.map((b) => (
        <BookingCard
          key={b.id}
          id={b.id}
          roomName={b.roomName}
          date={b.date}
          user={b.user}
          onDelete={onDelete}

        />
      ))}
    </div>
  );
}

export default BookingList;