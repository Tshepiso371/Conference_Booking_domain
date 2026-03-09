"use client";

import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "10px", color: "#4f46e5" }}>
          Login
        </h1>

        <p style={{ marginBottom: "25px", color: "#555" }}>
          Please enter your username and password
        </p>

        <LoginForm />
      </div>
    </main>
  );
}