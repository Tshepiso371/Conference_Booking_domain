import { useEffect, useState, useCallback } from "react";
import apiClient from "../api/apiClient";

export default function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------
  // FETCH BOOKINGS
  // -----------------------------
  const fetchBookings = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const data = await apiClient.get("/bookings", {
        signal,
      });

      setBookings(data.items || data);

    } catch (err) {

      if (err.name === "CanceledError") return;

      if (err.code === "ECONNABORTED") {
        setError("The server took too long to respond (timeout).");
      }

      else if (err.message === "Network Error") {
        setError("Cannot reach server. Is the backend running?");
      }

      else if (err.response) {
        setError(
          `Server error ${err.response.status}: ${err.response.statusText}`
        );
      }

      else {
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
      setError("");

      await apiClient.post(`/bookings/${id}/cancel`);

      // Refresh bookings after cancel
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

  // -----------------------------
  // INITIAL FETCH
  // -----------------------------
  useEffect(() => {

    const controller = new AbortController();

    fetchBookings(controller.signal);

    return () => {
      controller.abort();
    };

  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
    createBooking,
    cancelBooking,
  };
}