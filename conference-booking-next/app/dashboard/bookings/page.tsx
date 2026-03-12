"use client";

import RoleGuard from "@/components/RoleGuard";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import BookingList from "../../../components/BookingList";
import useBookings from "../../../hooks/useBookings";

export default function BookingsPage() {

  const router = useRouter();

  const { bookings, loading, error, cancelBooking } = useBookings();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Debounce search (400ms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  // Filter + Sort bookings with useMemo (performance optimization)
  const filteredAndSortedBookings = useMemo(() => {

    if (!bookings) return [];

    let filtered = bookings;

    // Search filter
    if (debouncedSearch) {
      filtered = bookings.filter((b) =>
        b.roomName.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "date") {
      return [...filtered].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      );
    }

    if (sortBy === "room") {
      return [...filtered].sort((a, b) =>
        a.roomName.localeCompare(b.roomName)
      );
    }

    return filtered;

  }, [bookings, debouncedSearch, sortBy]);


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

          {/* Search + Sorting Controls */}

          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              gap: "10px",
            }}
          >

            <input
              type="text"
              placeholder="Search by room name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "250px",
              }}
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="date">Sort by Date</option>
              <option value="room">Sort by Room</option>
            </select>

          </div>


          <BookingList
            bookings={filteredAndSortedBookings}
            onDelete={cancelBooking}
          />

        </div>

      </div>

    </RoleGuard>
  );
}