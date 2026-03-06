import { useState, useEffect } from "react";
import Button from "./Button";
import { fetchRooms } from "../services/roomService";
import { createBooking } from "../services/bookingService";

function BookingForm({ onBookingCreated }) {

  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (err) {
        console.error("Failed to load rooms");
      }
    }

    loadRooms();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!roomId || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const start = new Date(date);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      await createBooking(
        roomId,
        start.toISOString(),
        end.toISOString()
      );

      onBookingCreated();

      setRoomId("");
      setDate("");

    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="booking-form">

      <select
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      >
        <option value="">Select Room</option>

        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}

      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">Add booking</button>

      <Button
        label="Clear"
        type="button"
        onClick={() => {
          setRoomId("");
          setDate("");
        }}
      />

    </form>
  );
}

export default BookingForm;