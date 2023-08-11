import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import "./navbar.css";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav className={`${visible ? "" : "navbar-scroll"}`}>
      <div className="navhead">
        <div className="navcon">
          <div className="logo">
            <img
              src={logo}
              alt="logo"
              className={`${visible ? "" : "logo-scroll"}`}
            />
          </div>

          <ul style={{ listStyleType: "none" }}>
            <li className="navbar">
              <Link to="/">HOME</Link>
              <Link to="/main-gallery">GALLERY</Link>
              <Link to="/main-portfolio">PORTFOLIO</Link>
              <Link to="/main-rates">RATES</Link>
              <Link to="/main-service">BOOKING</Link>
              <Link to="/main-about">ABOUT US</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
