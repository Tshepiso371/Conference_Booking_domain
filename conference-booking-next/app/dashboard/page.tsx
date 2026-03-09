"use client";

import BookingList from "../../components/BookingList";
import BookingForm from "../../components/BookingForm";
import useBookings from "../../hooks/useBookings";

export default function Dashboard() {

  const { bookings, loading, error, cancelBooking, refetch } = useBookings();

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>

      <h1>Dashboard</h1>

      <BookingForm onBookingCreated={refetch} />

      <BookingList
        bookings={bookings}
        onDelete={cancelBooking}
      />

    </div>
  );
}