import Button from "./Button";

function BookingCard({ id , roomName, date, user, onDelete}) {
  return (
    <div className="card">
      <h3>{roomName}</h3>
      <p>Date: {date}</p>
      <p>Booked by: {user}</p>

      <Button label="Edit" />
      <Button label="Cancel" onClick={() => onDelete(id)}/>
    </div>
  );
}

export default BookingCard;