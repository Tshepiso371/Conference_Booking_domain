import { useState } from "react";
import Button from "./Temp4";

function BookingForm({ onAddBooking }) {
  const [roomName, setRoomName] = useState("");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!roomName || !user || !date) {
      alert("Please fill all fields");
      return;
    }

    const newBooking = {
      id: Date.now(),
      roomName,
      user,
      date,
    }; 

    onAddBooking(newBooking);

    // Clear inputs
    setRoomName("");
    setUser("");
    setDate("");
  }

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />

      <input
        type="text"
        placeholder="User Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button label="Add Booking" />
    </form>
  );
}

export default BookingForm;