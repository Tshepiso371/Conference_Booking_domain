import { useState, useEffect } from "react";

function Heartbeat() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // CLEANUP 
    return () => {
      clearInterval(interval);
      console.log("Heartbeat stopped");
    };
  }, []);

  return (
    <div>
      <h3>System time: {time.toLocaleTimeString()}</h3>
    </div>
  );
}

export default Heartbeat;