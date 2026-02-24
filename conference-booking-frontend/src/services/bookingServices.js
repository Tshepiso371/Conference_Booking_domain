const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchAllBookings() {
  try {
    const response = await fetch(`${BASE_URL}/bookings`);

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();

    return data.items || data;

  } catch (error) {
    throw error.message || "Server error";
  }
}

export async function cancelBooking(id) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/bookings/${id}/cancel`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to cancel booking");
  }

  return true;
}