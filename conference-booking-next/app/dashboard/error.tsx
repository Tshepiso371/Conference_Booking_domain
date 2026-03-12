"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {

  return (
    <div style={{ padding: "20px" }}>
      <h2>Something went wrong</h2>

      <p>{error.message}</p>

      <button
        onClick={() => reset()}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Try Again
      </button>
    </div>
  );
}