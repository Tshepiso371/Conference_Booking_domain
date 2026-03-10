"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import { fetchRooms } from "../services/roomService";
import { createBooking } from "../services/bookingService";

type Room = {
  id: number;
  name: string;
};

type BookingFormProps = {
  onBookingCreated: () => void;
};

function BookingForm({ onBookingCreated }: BookingFormProps) {

  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch {
        console.error("Failed to load rooms");
      }
    }

    loadRooms();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (roomId === null || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const start = new Date(date);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      await createBooking({
        roomId,
        start: start.toISOString(),
        end: end.toISOString(),
      });

      onBookingCreated();

      setRoomId(null);
      setDate("");

    } catch (err: any) {
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

      <select
        value={roomId ?? ""}
        onChange={(e) => setRoomId(Number(e.target.value))}
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

      <div style={{ display: "flex", gap: "10px" }}>

        <button type="submit">
          Add Booking
        </button>

        <Button
          label="Clear"
          type="button"
          onClick={() => {
            setRoomId(null);
            setDate("");
          }}
        />

      </div>

    </form>
  );
}

export default BookingForm;