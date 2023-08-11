import React from "react";
import { Link } from "react-router-dom";

const BackgroundNav = () => {
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        <li>
          <Link to="/homebackground" className="link-style">
            HOMEBACKGROUND
          </Link>
        </li>
        <li>
          <Link to="/gallerybackground" className="link-style">
            GALLERYBACKGROUND
          </Link>
        </li>
        <li>
          <Link to="/portfoliobackground" className="link-style">
            PORTFOLIOBACKGROUND
          </Link>
        </li>
        <li>
          <Link to="/servicebackground" className="link-style">
            SERVICEBACKGROUND
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BackgroundNav;
