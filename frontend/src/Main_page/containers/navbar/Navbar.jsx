import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      // Close the sidebar if it's open and the width increases
      if (sidebarOpen && window.innerWidth > 950) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    // Close the sidebar if it's open
    if (window.innerWidth <= 950) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarOpen(false);
    }
  };

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

          {windowWidth > 950 && (
            <ul style={{ listStyleType: "none" }} className="navbar">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/main-gallery">GALLERY</Link>
              </li>
              <li>
                <Link to="/main-portfolio">PORTFOLIO</Link>
              </li>
              <li>
                <Link to="/main-rates">RATES</Link>
              </li>
              <li>
                <Link to="/main-service">BOOKING</Link>
              </li>
              <li>
                <Link to="/main-about">ABOUT US</Link>
              </li>
            </ul>
          )}

          {windowWidth <= 950 && (
            <div>
              {sidebarOpen ? (
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={toggleSidebar}
                  className="exit-icon"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faBars}
                  onClick={toggleSidebar}
                  className="sidebar-icon"
                />
              )}
            </div>
          )}

          {sidebarOpen && (
            <ul className="sidebar-menu">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/main-gallery">GALLERY</Link>
              </li>
              <li>
                <Link to="/main-portfolio">PORTFOLIO</Link>
              </li>
              <li>
                <Link to="/main-rates">RATES</Link>
              </li>
              <li>
                <Link to="/main-service">BOOKING</Link>
              </li>
              <li>
                <Link to="/main-about">ABOUT US</Link>
              </li>
              <li>
                {/* Add an exit icon to close the sidebar */}
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={toggleSidebar}
                  className="exit-icon-sidebar"
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
