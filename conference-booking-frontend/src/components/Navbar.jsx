"use client";
import ConnectionStatus from "./ConnectionStatus";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Conference Bookings</h2>
      <ConnectionStatus/>
      <div>
        <a href="#">Home</a>
        <a href="#">Bookings</a>
      </div>
    </nav>
  );
}

export default Navbar;