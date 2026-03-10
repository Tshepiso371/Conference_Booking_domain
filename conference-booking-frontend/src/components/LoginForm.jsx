"use client";

import { useState } from "react";
import apiClient from "../api/apiClient";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleSubmit(e) {
  e.preventDefault();

  console.log("Sending login request:", username, password);

  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });

    console.log("API response:", response);

    const token = response.token;

    localStorage.setItem("token", token);

    console.log("Login success");
    router.push("/dashboard/create");

  } catch (err) {
    console.log("LOGIN ERROR:", err.response);
    setError("Invalid credentials");
  }
}

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "12px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      {error && (
        <p
          style={{
            color: "red",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}

export default LoginForm;