import React from "react";
import { Link } from "react-router-dom";

const Booking = () => {
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        <li>
          <Link to="/training">TRAINING</Link>
        </li>
      </ul>
      Booking
    </div>
  );
};

export default Booking;
