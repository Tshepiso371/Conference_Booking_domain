import Button from "./Button";

type BookingCardProps = {
  id: number;
  roomName: string;
  date: string;
  user: string;
  onDelete: (id: number) => void;
};

function BookingCard({ id, roomName, date, user, onDelete }: BookingCardProps) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transition: "transform 0.2s ease",
      }}
    >
      <h3 style={{ color: "#4f46e5", marginBottom: "5px" }}>
        {roomName}
      </h3>

      <p style={{ color: "#444", fontSize: "14px" }}>
        <strong>Date:</strong> {date}
      </p>

      <p style={{ color: "#444", fontSize: "14px" }}>
        <strong>Booked by:</strong> {user}
      </p>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "10px"
        }}
      >
        <Button label="Edit" />

        <Button
          label="Cancel"
          onClick={() => onDelete(id)}
          style={{
            backgroundColor: "#ef4444",
            color: "white"
          }}
        />
      </div>
    </div>
  );
}

export default BookingCard;