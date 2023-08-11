import React from "react";
import { Link } from "react-router-dom";
const LoginNav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
      </ul>
    </div>
  );
};

export default LoginNav;
