import React from "react";
import { NavLink } from "react-router-dom";
import "./portfolio.css"; // Import your CSS file

const PortfolioNav = () => {
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        <li>
          <NavLink
            to="/studioupload"
            className="link-style"
            activeClassName="active"
          >
            STUDIO
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/outdoorupload"
            className="link-style"
            activeClassName="active"
          >
            OUTDOOR
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/productupload"
            className="link-style"
            activeClassName="active"
          >
            PRODUCT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/makeupupload"
            className="link-style"
            activeClassName="active"
          >
            MAKE-UP
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PortfolioNav;
