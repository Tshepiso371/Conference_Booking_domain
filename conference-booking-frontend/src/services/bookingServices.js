export async function fetchAllBookings() {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 2000 + 500; 

    setTimeout(() => {
      const shouldFail = Math.random() < 0.2; 

      if (shouldFail) {
        reject("Server error. Please try again.");
      } else {
        resolve([
          { id: 1, roomName: "Boardroom", user: "John", date: "2026-02-20", category: "Internal" },
          { id: 2, roomName: "Conference Hall", user: "Sarah", date: "2026-02-21", category: "Client" },
          { id: 3, roomName: "Meeting Room", user: "David", date: "2026-02-22", category: "Internal" }
        ]);
      }
    }, delay);
  });
}