import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./portfoliobody.css";
import port1 from "../../../assets/studio.jpg";
import port2 from "../../../assets/outdoor.jpg";
import port3 from "../../../assets/makeup.jpg";
import port4 from "../../../assets/product.jpg";

const PortfolioBody = () => {
  const [showAdditionalLinks, setShowAdditionalLinks] = useState(false);

  const handleMainLinkClick = () => {
    setShowAdditionalLinks(true);
  };

  return (
    <div>
      {showAdditionalLinks && (
        <ul className="additional-links" style={{ listStyleType: "none" }}>
          <li>
            <Link to="/studio" className="port-style">
              STUDIO
            </Link>
          </li>
          <li>
            <Link to="/outdoor" className="port-style">
              OUTDOOR
            </Link>
          </li>
          <li>
            <Link to="/makeup" className="port-style">
              JUST KLASSIC MAKE-UP
            </Link>
          </li>
          <li>
            <Link to="/product" className="port-style">
              PRODUCT
            </Link>
          </li>
        </ul>
      )}

      <ul className="portbody-con" style={{ listStyleType: "none" }}>
        <div className="portbody-div">
          <li>
            <Link
              to="/studio"
              className="port-style"
              onClick={handleMainLinkClick}
            >
              <img src={port1} alt="logo" />
              <div className="port-text">
                <p>STUDIO</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/outdoor"
              className="port-style"
              onClick={handleMainLinkClick}
            >
              <img src={port2} alt="logo" />
              <div className="port-text">
                <p>OUTDOOR</p>
              </div>
            </Link>
          </li>
        </div>

        <div className="portbody-div">
          <li>
            <Link
              to="/makeup"
              className="port-style"
              onClick={handleMainLinkClick}
            >
              <img src={port3} alt="logo" />
              <div className="port-text">
                <p>JUST KLASSIC </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className="port-style"
              onClick={handleMainLinkClick}
            >
              <img src={port4} alt="logo" />
              <div className="port-text">
                <p>PRODUCT</p>
              </div>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default PortfolioBody;
