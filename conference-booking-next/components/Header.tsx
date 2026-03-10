"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";

export default function Header() {

  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header
      style={{
        padding: "15px 30px",
        background: "#1e293b",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Conference Booking</h2>

      <div style={{ display: "flex", gap: "15px" }}>

        {!user && (
          <Link href="/login">Login</Link>
        )}

        {user && (
          <>
            <span>Welcome {user.username}</span>

            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </header>
  );
}