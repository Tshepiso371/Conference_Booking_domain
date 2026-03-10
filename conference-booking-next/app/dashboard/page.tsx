"use client";

import { useRouter } from "next/navigation";
import BookingList from "../../components/BookingList";
import BookingForm from "../../components/BookingForm";
import useBookings from "../../hooks/useBookings";

export default function Dashboard() {
  const router = useRouter();

  const { bookings, loading, error, cancelBooking, refetch } = useBookings();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading bookings...</p>
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <p>{error}</p>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER / NAVBAR */}
      <header
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Conference Booking System</h2>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "white",
            color: "#4f46e5",
            border: "none",
            padding: "8px 15px",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      {/* PAGE CONTENT */}
      <div
        style={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <h1 style={{ color: "#333" }}>Dashboard</h1>

        {/* BOOKING FORM CARD */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Create Booking</h2>

          <BookingForm onBookingCreated={refetch} />
        </div>

        {/* BOOKING LIST CARD */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Existing Bookings</h2>

          <BookingList
            bookings={bookings}
            onDelete={cancelBooking}
          />
        </div>
      </div>
    </div>
  );
}