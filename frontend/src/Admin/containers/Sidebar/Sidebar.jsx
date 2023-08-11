import React from "react";

import { Link } from "react-router-dom";
import "./sidebar.css";
const Sidebar = () => {
  return (
    <>
      <div className="sidebar__con">
        <div>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <Link to="/dashboard" className="link-style">
                DASHBOARD
              </Link>
            </li>
            <li>
              <Link to="/background" className="link-style">
                BACKGROUND IMAGE
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="link-style">
                GALLERY IMAGE
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="link-style">
                PORTFOLIO IMAGE
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
