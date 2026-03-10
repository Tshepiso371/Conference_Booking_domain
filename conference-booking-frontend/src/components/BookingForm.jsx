"use client";
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
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
      }}
    >

      {/* ROOM SELECT */}
      <select
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px"
        }}
      >
        <option value="">Select Room</option>

        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>

      {/* DATE INPUT */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px"
        }}
      />

      {/* BUTTON ROW */}
      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Add Booking
        </button>

        <Button
          label="Clear"
          type="button"
          onClick={() => {
            setRoomId("");
            setDate("");
          }}
        />

      </div>

    </form>
  );
}

export default BookingForm;