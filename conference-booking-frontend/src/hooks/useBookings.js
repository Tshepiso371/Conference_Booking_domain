import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function useBookings() {
  const [bookings, setBookings] = useState([]); // MUST start empty
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBookings() {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/bookings`);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setBookings(data.items || data);
    } catch (err) {
      setError(err.message || "Backend offline");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, refetch: fetchBookings };
}