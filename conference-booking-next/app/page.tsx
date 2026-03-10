"use client";

import Link from "next/link"; // Import Link from next/link for client-side navigation

export default function HomePage() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #d846e5, #06b6d4)",
        color: "white",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
          Conference Booking System
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "40px" }}>
          Welcome! Book conference rooms quickly and easily.
        </p>

        <Link
          href="/login"
          style={{
            padding: "12px 25px",
            backgroundColor: "white",
            color: "#4649e5",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}