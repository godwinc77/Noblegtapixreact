import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./servicebody.css";

const ServiceBody = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState([]);
  const [fileChanged, setFileChanged] = useState(false);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    phoneNumber: "",
    time: "",
    date: "",
    text: "",
  });

  const handleChoiceClick = (option) => {
    if (selectedChoice.length >= 3) {
      setSelectedChoice([]);
    } else {
      setSelectedChoice([...selectedChoice, option]);
    }
  };

  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  const handleFileClick = (fileType) => {
    if (selectedFile === fileType) {
      setSelectedFile(null);
      setSelectedOption(null);
      setSelectedChoice([]);
      setFileChanged(false);
    } else {
      setSelectedFile(fileType);
      setFileChanged(true);
      setSelectedOption(null); // Clear selected option when switching files
      setSelectedChoice([]); // Clear selected choices when switching files
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Convert the typed name to uppercase before setting it in the state
    if (name === "name") {
      setUserInput((prevUserInput) => ({
        ...prevUserInput,
        [name]: value.toUpperCase(), // Convert to uppercase
      }));
    } else {
      setUserInput((prevUserInput) => ({
        ...prevUserInput,
        [name]: value,
      }));
    }
  };
  const handlePreviewClick = () => {
    setPreviewVisible(!isPreviewVisible);
  };
  const handleSendClick = () => {
    const phone = "+2348067089851"; // Replace with the recipient's phone number
    const message = encodeURIComponent(
      `NAME: ${userInput.name}\n` +
        `PHONE NUMBER: ${userInput.phoneNumber}\n` +
        `${selectedFile ? "SELECTED PACKAGE: " + selectedFile + "\n" : ""}` +
        `${
          selectedOption ? "SELECTED SESSION: " + selectedOption + "\n" : ""
        }` +
        `${
          selectedChoice.length > 0
            ? "SELECTED SERVICE OPTIONS: " + selectedChoice.join(", ") + "\n"
            : ""
        }` +
        `TIME: ${userInput.time}\n` +
        `DATE: ${userInput.date}\n` +
        `TEXT: ${userInput.text}`
    );

    const whatsappLink = `https://wa.me/${phone}?text=${message}`;

    window.open(whatsappLink, "_blank");
  };
  const handleSendGmailClick = () => {
    const recipient = "noblegrapixonly@gmail.com"; // Replace with the recipient's email address
    const subject = "Service Booking";
    const body = encodeURIComponent(
      `NAME: ${userInput.name}\n` +
        `PHONE NUMBER: ${userInput.phoneNumber}\n` +
        `${selectedFile ? "SELECTED PACKAGE: " + selectedFile + "\n" : ""}` +
        `${
          selectedOption ? "SELECTED SESSION: " + selectedOption + "\n" : ""
        }` +
        `${
          selectedChoice.length > 0
            ? "SELECTED SERVICE OPTIONS: " + selectedChoice.join(", ") + "\n"
            : ""
        }` +
        `TIME: ${userInput.time}\n` +
        `DATE: ${userInput.date}\n` +
        `TEXT: ${userInput.text}`
    );

    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="service_con">
      <form className="service_form ">
        <label>NAME</label>
        <input
          className="serviceinput "
          type="name"
          name="name"
          autoComplete="off"
          onClick={(e) => e.stopPropagation()}
          value={userInput.name}
          onChange={handleInputChange}
        />
        <label>PHONE-NUMBER</label>
        <input
          className="serviceinput "
          type="number"
          name="phoneNumber"
          autoComplete="off"
          onClick={(e) => e.stopPropagation()}
          value={userInput.phoneNumber}
          onChange={handleInputChange}
        />
      </form>

      <div className="service-package">
        <h2 className="service-h2">SELECT PACKAGE</h2>
        <ul className="file-list" style={{ listStyleType: "none" }}>
          <li
            className={selectedFile === "STUDIO" ? "selected" : ""}
            onClick={() => handleFileClick("STUDIO")}
          >
            STUDIO
          </li>
          <li
            className={selectedFile === "OUTDOOR" ? "selected" : ""}
            onClick={() => handleFileClick("OUTDOOR")}
          >
            OUTDOOR
          </li>
        </ul>
      </div>

      {fileChanged && (
        <div
          className="option-choice-wrapper"
          onBlur={() => setFileChanged(false)}
        >
          <h2 className="service-h2 scale-in-center">SELECT SESSION</h2>
          {selectedFile === "STUDIO" && (
            <ul
              className="file-list scale-in-center"
              style={{ listStyleType: "none" }}
            >
              <li
                className={
                  selectedOption === "BASIC SESSION-20K" ? "selected" : ""
                }
                onClick={() => handleOptionClick("BASIC SESSION-20K")}
              >
                <p>BASIC SESSION-20K</p>
              </li>
              <li
                className={
                  selectedOption === "STANDARD SESSION-40K" ? "selected" : ""
                }
                onClick={() => handleOptionClick("STANDARD SESSION-40K")}
              >
                <p>STANDARD SESSION-40K</p>
              </li>
              <li
                className={
                  selectedOption === "PREMIUM SESSION-60K" ? "selected" : ""
                }
                onClick={() => handleOptionClick("PREMIUM SESSION-60K")}
              >
                <p>PREMIUM SESSION-60K</p>
              </li>
            </ul>
          )}

          {selectedFile === "OUTDOOR" && (
            <ul
              className="session file-list scale-in-center"
              style={{ listStyleType: "none" }}
            >
              <li
                className={
                  selectedOption === "BASIC SESSION-50K" ? "selected" : ""
                }
                onClick={() => handleOptionClick("BASIC SESSION-50K")}
              >
                <p>BASIC SESSION-50K</p>
              </li>
              <li
                className={
                  selectedOption === "STANDARD SESSION-70K" ? "selected" : ""
                }
                onClick={() => handleOptionClick("STANDARD SESSION-70K")}
              >
                <p>STANDARD SESSION-70K</p>
              </li>
              <li
                className={
                  selectedOption === "PREMIUM SESSION-90K" ? "selected" : ""
                }
                onClick={() => handleOptionClick("PREMIUM SESSION-90K")}
              >
                <p>PREMIUM SESSION-90K</p>
              </li>
            </ul>
          )}

          {selectedOption && (
            <div className="service-option scale-in-center">
              <h2 className="service-h2">SELECT SERVICE OPTIONS</h2>

              <ul
                className=" service-unlist file-list scale-in-center"
                style={{ listStyleType: "none" }}
              >
                <h2 className=" text1 service-h2">
                  SHOULD NONE OF THE SERVICE OPTIONS PRESENTED HERE MATCH YOUR
                  PREFERENCES, PLEASE FEEL FREE TO SKIP THIS SECTION
                </h2>
                <div className="service-list">
                  <li
                    className={
                      selectedChoice.includes("MAKEUP-15K") ? "selected" : ""
                    }
                    onClick={() => handleChoiceClick("MAKEUP-15K")}
                  >
                    MAKEUP-15K
                  </li>
                  <li
                    className={
                      selectedChoice.includes(" HAIR STYLING-10K")
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleChoiceClick(" HAIR STYLING-10K")}
                  >
                    HAIR STYLING-10K
                  </li>
                  <li
                    className={
                      selectedChoice.includes("BIRTHDAY VIDEO SESSION-60K")
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      handleChoiceClick("BIRTHDAY VIDEO SESSION-60K")
                    }
                  >
                    BIRTHDAY VIDEO SESSION-60K
                  </li>
                </div>
              </ul>
            </div>
          )}
        </div>
      )}
      <form className="booking-date">
        <div className="booking-date-con">
          <input
            className="serviceinput"
            type="time"
            name="time"
            value={userInput.time}
            onClick={(e) => e.stopPropagation()}
            onChange={handleInputChange}
          />
          <input
            className="serviceinput"
            type="date"
            name="date"
            value={userInput.date}
            onClick={(e) => e.stopPropagation()}
            onChange={handleInputChange}
          />
        </div>
        <input
          className="serviceinput text"
          type="text"
          name="text"
          autoComplete="off"
          value={userInput.text}
          onClick={(e) => e.stopPropagation()}
          onChange={handleInputChange}
        />
        <p className="servicepreview" onClick={handlePreviewClick}>
          {" "}
          PREVIEW{" "}
        </p>

        {selectedOption ? null : (
          <div className="select-div">SELECT A SESSION FIRST</div>
        )}

        {isPreviewVisible && (
          <div className="pre-view scale-in-center">
            <div className="pre-view-con">
              <span className="exit-button" onClick={handlePreviewClick}>
                <FontAwesomeIcon icon={faTimes} />
              </span>

              <div className="pre-view-con-text">
                <p>NAME: {userInput.name}</p>
                <p>PHONE NUMBER: {userInput.phoneNumber}</p>
                {selectedFile && <p>SELECTED PACKAGE: {selectedFile}</p>}
                {selectedOption && <p>SELECTED SESSION: {selectedOption}</p>}
                {selectedChoice.length > 0 && (
                  <p>SELECTED SERVICE OPTIONS: {selectedChoice.join(", ")}</p>
                )}
                <p>TIME: {userInput.time}</p>
                <p>DATE: {userInput.date}</p>
                <p>TEXT: {userInput.text}</p>
              </div>
              <div className="pre-view-send">
                <button className="send-button what" onClick={handleSendClick}>
                  WHATSAPP
                </button>
                <button
                  className="send-button mail"
                  onClick={handleSendGmailClick}
                >
                  GMAIL
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ServiceBody;
