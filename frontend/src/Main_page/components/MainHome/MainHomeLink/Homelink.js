import React from "react";
import "./homelink.css";
import new1 from "../../../containers/assets/new.png";

const Homelink = () => {
  const instagramLink = "https://www.instagram.com/noblegrapix/";

  return (
    <a
      href={instagramLink}
      target="_blank"
      rel="noopener noreferrer"
      className="homelink"
    >
      <img src={new1} alt="logo" />
      <div>
        <h3 className="text">follow us on Instagram</h3>
      </div>
    </a>
  );
};

export default Homelink;
