import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ConnectionStatus() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let interval;

    async function checkConnection() {
      try {
        const healthUrl = BASE_URL.replace("/api", "") + "/health";

        const res = await fetch(healthUrl);

        setConnected(res.ok);
      } catch {
        setConnected(false);
      }
    }

    checkConnection();
    interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ color: connected ? "green" : "red" }}>
      {connected ? "Connected" : "Backend Offline"}
    </span>
  );
}

export default ConnectionStatus;