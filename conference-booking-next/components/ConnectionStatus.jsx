"use client";

// Import React hooks
import { useEffect, useState } from "react";

// Get API base URL from Vite environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function ConnectionStatus() {
  // State to track whether the backend is reachable
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Variable to store interval reference for cleanup
    let interval;

    // Function to check backend health endpoint
    async function checkConnection() {
      try {
        // Remove "/api" from base URL and append "/health"
        // so we can call the backend health check endpoint
        const healthUrl = BASE_URL.replace("/api", "") + "/health";

        // Send request to backend
        const res = await fetch(healthUrl);

        // If response is OK (status 200–299), set connected to true
        setConnected(res.ok);
      } catch {
        // If fetch fails (network error, server down, etc.)
        // mark backend as offline
        setConnected(false);
      }
    }

    // Run immediately when component mounts
    checkConnection();

    // Re-check connection every 5 seconds
    interval = setInterval(checkConnection, 5000);

    // Cleanup function:
    // Clears interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Display connection status with dynamic color
    <span style={{ color: connected ? "green" : "red" }}>
      {connected ? "Connected" : "Backend Offline"}
    </span>
  );
}

// Export component for use in other parts of the app
export default ConnectionStatus;