import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo1 from "../Regassets/logo1.png";
import "./login.css";

const Login = ({ onLogin }) => {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const history = useHistory();

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    // Perform client-side validation if needed (e.g., check if fields are empty)
    if (!email) {
      setEmailError("Email Is Empty");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password too short, must be 6 or more characters");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      console.log("Response data:", response.data);
      if (response.status === 200) {
        alert("Login successful");
        onLogin();
        history.push("/home");
        window.localStorage.setItem("token", response.data.token);
      } else {
        setLoginError("Login failed");
      }
    } catch (error) {
      console.error(error);
      setLoginError("Login failed");
    }
  };

  return (
    <div className="login__con">
      <div className="login__logo">
        <img src={logo1} alt="logo" />
        <p>LOGIN</p>
      </div>
      <div className="login__parent">
        <div className="login__background">
          <form onSubmit={handleSubmit} className="login__con2">
            <label>EMAIL:</label>
            <input
              className="logininput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span className="error-key">{emailError}</span>}
            <label>PASSWORD:</label>
            <div className="password-field">
              <input
                className="logininput"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <span className="password-error">{passwordError}</span>
              )}
              <span
                className="login-toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
            </div>
            <button type="submit" className="loginsubmit">
              Submit
            </button>
            {loginError && <span className="password-error">{loginError}</span>}
            <div className="create-an-account">
              <p>Create an account</p>
              <li>
                <Link to="/signup">SIGNUP</Link>
              </li>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
