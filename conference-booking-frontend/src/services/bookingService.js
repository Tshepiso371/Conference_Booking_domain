const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5167/api";


// -----------------------------
// FETCH ALL BOOKINGS
// -----------------------------
export async function fetchAllBookings() {
  try {
    const response = await fetch(`${BASE_URL}/bookings?page=1&pageSize=50`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();

    // Backend returns { items, totalCount }
    return data.items;

  } catch (error) {
    throw error.message || "Server error";
  }
}


// -----------------------------
// CREATE BOOKING
// -----------------------------
export async function createBooking(booking) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.title || "Failed to create booking");
    }

    return await response.json();

  } catch (error) {
    throw error.message || "Server error";
  }
}


// -----------------------------
// CANCEL BOOKING
// -----------------------------
export async function cancelBooking(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/bookings/${id}/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to cancel booking");
    }

    return true;

  } catch (error) {
    throw error.message || "Server error";
  }
}