import BookingCard from "./BookingCard";

type Booking = {
  bookingId: number;
  roomName: string;
  start: string;
  createdBy: string;
};

type BookingListProps = {
  bookings: Booking[];
  onDelete: (id: number) => void;
};

function BookingList({ bookings, onDelete }: BookingListProps) {

  if (!bookings || bookings.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginTop: "20px",
          fontSize: "16px"
        }}
      >
        No bookings found.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {bookings.map((b) => (
        <BookingCard
          key={b.bookingId}
          id={b.bookingId}
          roomName={b.roomName}
          date={new Date(b.start).toLocaleString()}
          user={b.createdBy}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BookingList;