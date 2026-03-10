"use client";

import { useRouter } from "next/navigation";
import BookingForm from "../../../components/BookingForm";
import useBookings from "../../../hooks/useBookings";

export default function CreateBookingPage() {
  const router = useRouter();
  const { refetch } = useBookings();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6fb",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <h1>Create Booking</h1>

        <button
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#6366f1",
            color: "white",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>

      
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "500px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <BookingForm onBookingCreated={refetch} />
      </div>
    </div>
  );
}