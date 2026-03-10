"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#6366f1,#9333ea)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Conference Booking System</h2>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "white",
            color: "#6366f1",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          Welcome to the Dashboard
        </h1>

        <p style={{ fontSize: "18px", opacity: 0.9 }}>
          Select an option below
        </p>

        
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <button
            onClick={() => router.push("/dashboard/create")}
            style={{
              padding: "16px 30px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "white",
              color: "#6366f1",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            Create Booking
          </button>

          <button
            onClick={() => router.push("/dashboard/bookings")}
            style={{
              padding: "16px 30px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#22c55e",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            Existing Bookings
          </button>
        </div>
      </div>
    </div>
  );
}