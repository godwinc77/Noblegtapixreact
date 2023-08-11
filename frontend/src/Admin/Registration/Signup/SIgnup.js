import React, {useState} from 'react'
import axios from "axios"
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"
import logo1 from "../Regassets/logo1.png"
import './signup.css'


const SIgnup = () => {
 
  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [userError, setUserError] = useState("");
  const [secretkey, setSecretkey] = useState("");
  const [secretkeyError, setSecretkeyError] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (secretkey !== "Noblegrapixc77") {
      setSecretkeyError("Invalid Admin");
      return;
    } else {
      setSecretkeyError("");
      console.log(email + " | " + username);

      if (!username) {
        setUserError("Username Is Empty");
      } else {
        setUserError("");
      }

      if (!email) {
        setEmailError("Email Is Empty");
      } else {
        setEmailError("");
      }

      if (password.length < 6) {
        setPasswordError("Password too short, must be 6 or more characters");
      } else {
        setPasswordError("");
        axiosPostData();
        history.push("/login");
      }
    }
  };

  const axiosPostData = async () => {
    const postData = {
      email: email,
      username: username,
      password: password,
    };

    await axios
      .post("http://localhost:4000/register", postData)
      .then((res) => setError(<p className="success">(Signup successful)</p>));
  };

  return (
    <div className="signup">
      <div className='signup__logo'>
        <img src={logo1} alt="logo" />
        <p>SIGN UP</p>
      </div>
      
      <div className="signup_con">
        <form className="signup__con2">
          <label>SECRET KEY</label>
          <input
            className={`signupInput ${error ? "invalid" : ""}`}
            type="text"
            name="secretkey"
            autoComplete="off"
            value={secretkey}
            onChange={(e) => setSecretkey(e.target.value)}
            placeholder={secretkey === "Noblegrapixc77" ? "" : "Invalid Admin"}
            
          />
          {error && <span className="error-key">{secretkeyError}</span>}

          <label>USERNAME</label>
          <input
            className="signupInput"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="error-key">{userError}</span>

          <label>EMAIL</label>
          <input
            className="signupInput"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="error-key">{emailError}</span>
          <label>PASSWORD</label>
          <div className="password-field">
            <input
              className="signupInput"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <span className="password-error">{passwordError}</span>
            )}
           <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>
           

          {error}
          <button type="submit" onClick={handleSubmit} className="signup-submit">
            SIGN-UP
          </button>
          <div className="already-have-account">
            <p>Already have an account</p>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
          </div>
        </form>


        
      </div>
     
    </div>
  );
};

export default SIgnup