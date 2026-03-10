const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5167/api";

export async function fetchRooms() {
  const response = await fetch(`${BASE_URL}/rooms`);

  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }

  return await response.json();
}