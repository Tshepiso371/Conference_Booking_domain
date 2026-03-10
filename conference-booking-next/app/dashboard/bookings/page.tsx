"use client";
import RoleGuard from "@/components/RoleGuard";
import { useRouter } from "next/navigation";
import BookingList from "../../../components/BookingList";
import useBookings from "../../../hooks/useBookings";

export default function BookingsPage() {
  const router = useRouter();

  const { bookings, loading, error, cancelBooking } = useBookings();

  if (loading) return <p style={{ padding: "40px" }}>Loading bookings...</p>;
  if (error) return <p style={{ padding: "40px", color: "red" }}>{error}</p>;

  return (
    <RoleGuard allowedRoles={["Admin"]}>
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
        <h1>View Existing Bookings</h1>

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
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <BookingList bookings={bookings} onDelete={cancelBooking} />
      </div>
    </div>
    </RoleGuard>
  );
}