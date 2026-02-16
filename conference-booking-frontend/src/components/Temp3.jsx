import Button from "./Temp4";

function BookingCard({ roomName, date, user }) {
  return (
    <div className="card">
      <h3>{roomName}</h3>
      <p>Date: {date}</p>
      <p>Booked by: {user}</p>

      <Button label="Edit" />
      <Button label="Cancel" />
    </div>
  );
}

export default BookingCard;