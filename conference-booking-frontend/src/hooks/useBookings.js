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

  // -----------------------------
  // FETCH BOOKINGS
  // -----------------------------
  // useCallback ensures stable function reference
  // (prevents unnecessary re-renders / effect triggers)
  const fetchBookings = useCallback(async (signal) => {
    try {
      setLoading(true);   // Start loading
      setError("");       // Clear previous errors

      // Send GET request with optional AbortController signal
      const data = await apiClient.get("/bookings", {
        signal,
      });
      
      // Support both paginated and non-paginated responses
      // If API returns { items: [...] } use items
      // Otherwise assume response is already an array
      setBookings(data.items || data);

    } catch (err) {
      // Ignore canceled requests (component unmounted)
      if (err.name === "CanceledError") return;

      // Timeout error (Axios-specific)
      if (err.code === "ECONNABORTED") {
        setError("The server took too long to respond (timeout).");

      // Network error (server offline / unreachable)
      } else if (err.message === "Network Error") {
        setError("Cannot reach server. Is the backend running?");

      // Server responded with error status (4xx / 5xx)
      } else if (err.response) {
        setError(
          `Server error ${err.response.status}: ${err.response.statusText}`
        );

      // Any other unexpected error
      } else {
        setError("Unexpected error occurred.");
      }

    } finally {
      // Always stop loading
      setLoading(false);
    }
  }, []);

  // -----------------------------
  // CANCEL BOOKING
  // -----------------------------
  const cancelBooking = async (id) => {
    try {
      setError(""); // Clear previous errors

      // Call cancel endpoint
      await apiClient.post(`/bookings/${id}/cancel`);

      // Refresh bookings list after successful cancellation
      await fetchBookings();

    } catch (err) {
      // Handle API errors
      if (err.response) {
        setError(
          `Cancel failed: ${err.response.status} ${err.response.statusText}`
        );
      } else {
        setError("Failed to cancel booking.");
      }
    }
  };

  // -----------------------------
  // INITIAL LOAD
  // -----------------------------
  useEffect(() => {
    // Create AbortController to cancel request if component unmounts
    const controller = new AbortController();

    // Fetch bookings on mount
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
    refetch: fetchBookings, // Allow manual refresh
    cancelBooking,          // Allow cancellation
  };
}