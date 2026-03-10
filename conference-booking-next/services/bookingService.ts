const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5167/api";

type BookingRequest = {
  roomId: number;
  start: string;
  end: string;
};

export async function fetchAllBookings(): Promise<any[]> {

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

    return data.items;

  } catch (error: any) {
    throw error.message || "Server error";
  }
}


export async function createBooking(booking: BookingRequest) {

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

  } catch (error: any) {
    throw error.message || "Server error";
  }
}


export async function cancelBooking(id: number) {

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

  } catch (error: any) {
    throw error.message || "Server error";
  }
}