import React from "react";
import { Link } from "react-router-dom";

const Homenav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">HOME</Link>
        </li>
      </ul>
    </div>
  );
};

export default Homenav;
