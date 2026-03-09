// Import required React hooks
import { useEffect, useState, useCallback } from "react";

// Import configured Axios instance
import apiClient from "../api/apiClient";

// Custom hook for managing bookings data
export default function useBookings() {
  // Store bookings list
  const [bookings, setBookings] = useState([]);

  // Track loading state for UI feedback
  const [loading, setLoading] = useState(true);

  // Store error messages
  const [error, setError] = useState("");

  
  const fetchBookings = useCallback(async (signal) => {
  try {
    setLoading(true);
    setError("");

    const data = await apiClient.get("/bookings?page=1&pageSize=50", {
      signal,
    });

    const list = data.items || data;

    // Remove cancelled bookings from UI
    const activeBookings = list.filter(b => !b.cancelledAt);

    setBookings(activeBookings);

  } catch (err) {
    if (err.name === "CanceledError") return;

    if (err.code === "ECONNABORTED") {
      setError("The server took too long to respond (timeout).");
    } else if (err.message === "Network Error") {
      setError("Cannot reach server. Is the backend running?");
    } else if (err.response) {
      setError(
        `Server error ${err.response.status}: ${err.response.statusText}`
      );
    } else {
      setError("Unexpected error occurred.");
    }

  } finally {
    setLoading(false);
  }
}, []);
  // -----------------------------
  // CREATE BOOKING
  // -----------------------------
  const createBooking = async (bookingData) => {
    try {
      setError("");

      await apiClient.post("/bookings", bookingData);

      // Refresh bookings after creating
      await fetchBookings();

    } catch (err) {

      if (err.response) {
        setError(
          `Create failed: ${err.response.status} ${err.response.statusText}`
        );
      } else {
        setError("Failed to create booking.");
      }

      throw err;
    }
  };

  // -----------------------------
  // CANCEL BOOKING
  // -----------------------------
  const cancelBooking = async (id) => {
    try {
      setError(""); // Clear previous errors

      // Call cancel endpoint
      await apiClient.post(`/bookings/${id}/cancel`);

      // Refresh after cancel
      await fetchBookings();

    } catch (err) {
      if (err.response) {
        setError(
          `Cancel failed: ${err.response.status} ${err.response.statusText}`
        );
      } else {
        setError("Failed to cancel booking.");
      }

      throw err;
    }
  };

  
  useEffect(() => {
    const controller = new AbortController();
    fetchBookings(controller.signal);

    // Cleanup: abort request when component unmounts
    return () => {
      controller.abort();
    };

  }, [fetchBookings]);

  // Expose hook API to components
  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
    cancelBooking, 
  };
}