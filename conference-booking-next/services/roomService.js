const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchRooms() {
  const response = await fetch(`${BASE_URL}/rooms`);

  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }

  return await response.json();
}