import { useEffect, useState, useCallback } from "react";
import apiClient from "../api/apiClient";

type Booking = {
  bookingId: number;
  roomName: string;
  start: string;
  createdBy: string;
  cancelledAt?: string;

};

type BookingResponse = {
  items: Booking[];
  totalCount: number;
  
};

export default function useBookings() {

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchBookings = useCallback(async (signal?: AbortSignal) => {

    try {
      setLoading(true);
      setError("");

      const data : BookingResponse = await apiClient.get("/bookings? page=1&pageSize=50", { signal });

      const list = data.items;

      const activeBookings = list.filter((b: Booking) => !b.cancelledAt);

      setBookings(activeBookings);

    } catch (err: any) {

      if (err.name === "CanceledError") return;

      if (err.code === "ECONNABORTED") {
        setError("The server took too long to respond (timeout).");
      } else if (err.message === "Network Error") {
        setError("Cannot reach server. Is the backend running?");
      } else if (err.response) {
        setError(`Server error ${err.response.status}: ${err.response.statusText}`);
      } else {
        setError("Unexpected error occurred.");
      }

    } finally {
      setLoading(false);
    }

  }, []);

  const createBooking = async (bookingData: any) => {

    try {
      setError("");

      await apiClient.post("/bookings", bookingData);

      await fetchBookings();

    } catch (err: any) {

      if (err.response) {
        setError(`Create failed: ${err.response.status} ${err.response.statusText}`);
      } else {
        setError("Failed to create booking.");
      }

      throw err;
    }
  };

  const cancelBooking = async (id: number) => {

    try {
      setError("");

      await apiClient.post(`/bookings/${id}/cancel`);

      await fetchBookings();

    } catch (err: any) {

      if (err.response) {
        setError(`Cancel failed: ${err.response.status} ${err.response.statusText}`);
      } else {
        setError("Failed to cancel booking.");
      }

      throw err;
    }
  };

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
    cancelBooking,
  };
}