import React, { useState, useEffect } from "react";
import axios from "axios";
import "./header.css";
import logo1 from "../../assets/logo1.png";

const Header = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage.");
          return;
        }
        console.log("console:", token);

        const requestData = {
          token: token,
        };

        const response = await axios.post(
          "http://localhost:4000/userData",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { status, data } = response?.data || {};

        if (status === "ok") {
          setUserData(data || null);
        } else if (status === "error" && data === "token expired") {
          // Handle token expiration here, e.g., redirect to login page
          console.log("Token expired. Please log in again.");
        } else {
          console.error("Error fetching user data:", data);
        }
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  } else if (userData.error === "token expired") {
    // Handle token expiration here, e.g., redirect to login page
    return <div>Token expired. Please log in again.</div>;
  } else {
    return (
      <div className="header__con">
        <p>WELCOME: {userData.username}</p>
        <div className="header__conImg">
          <img src={logo1} alt="logo" />
        </div>
      </div>
    );
  }
};

export default Header;
