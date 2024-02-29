import React, { useEffect, useState } from "react";
import axios from "axios";
import "./gallerybody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const GalleryBody = () => {
  const baseURL = "http://localhost:4000/gallerysimages/";

  const [allImage, setAllImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState(null);

  useEffect(() => {
    // Fetch the images from the server
    getImage();
  }, []);

  const getImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/gallerys-get-image"
      );
      console.log("Server Response:", response);

      if (
        response.data &&
        response.data.status === "ok" &&
        Array.isArray(response.data.data)
      ) {
        // Filter out any undefined or null values from the image IDs retrieved from the server
        const availableImageIds = response.data.data.filter(
          (imageId) => !!imageId
        );
        setAllImage(availableImageIds);
      } else {
        console.log("No images found or invalid data format");
        setAllImage([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching images:", error);
    }
  };

  // Function to calculate the number of rows needed
  const numberOfRows = Math.ceil(allImage.length / 5);

  // Function to handle the automatic deletion of images if the total number of images exceeds 15
  useEffect(() => {
    if (allImage.length > 20) {
      const deleteCount = allImage.length - 20;
      const updatedImages = allImage.slice(deleteCount);
      setAllImage(updatedImages);
      // Optionally, you can send a request to delete the images from the server too.
      // However, make sure you implement proper backend logic to delete the images.
    }
  }, [allImage]);

  const openModal = (index) => {
    setCurrentSlideIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentSlideIndex(null);
  };

  const goToPrevious = () => {
    const prevIndex =
      currentSlideIndex === 0 ? allImage.length - 1 : currentSlideIndex - 1;
    setSlideDirection("slide-out-right");
    setTimeout(() => {
      setCurrentSlideIndex(prevIndex);
      setSlideDirection("slide-in-left");
    }, 500); // Wait for the slide-out animation to complete before updating the slide-in animation
  };

  const goToNext = () => {
    const nextIndex =
      currentSlideIndex === allImage.length - 1 ? 0 : currentSlideIndex + 1;
    setSlideDirection("slide-out-left");
    setTimeout(() => {
      setCurrentSlideIndex(nextIndex);
      setSlideDirection("slide-in-right");
    }, 500); // Wait for the slide-out animation to complete before updating the slide-in animation
  };
  return (
    <>
      <div className="gallery-body">
        <div className="gallery-body-text">
          <p>Discover the captivating world of Nobegrapix's flawless images.</p>
        </div>
        <div className="gallery-body-bg">
          {Array.from({ length: numberOfRows }, (_, rowIdx) => (
            <div
              key={rowIdx}
              className="gallery-row"
              style={{
                flexDirection: "row-reverse", // Reverse the order of images within each row
              }}
            >
              {allImage
                .slice(rowIdx * 5, (rowIdx + 1) * 5)
                .reverse() // Reverse the order of images within each row
                .map((imageId, idx) => (
                  <div
                    key={idx}
                    className="gallery-body-con"
                    onClick={() => openModal(rowIdx * 5 + idx)}
                  >
                    <img
                      src={`${baseURL}${imageId}`}
                      alt={`Image ${rowIdx * 5 + idx + 1}`}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {showModal && currentSlideIndex !== null && (
        <div className="modal">
          <span className="modal-exit" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </span>

          <div className="modal-slideshow">
            {currentSlideIndex > 0 && (
              <div
                className={`icon-div modal-arrow-left left slide-in-left${
                  slideDirection === "slide-out-left" ? "slide-out-left" : ""
                }`}
                onClick={goToPrevious}
              >
                &#8249;
              </div>
            )}
            {currentSlideIndex === 0 && allImage.length > 1 && (
              <div
                className={`icon-div modal-arrow-left slide-in-left ${
                  slideDirection === "slide-in-right" ? "slide-in-left" : ""
                }`}
                onClick={goToPrevious}
              >
                &#8249;
              </div>
            )}
            <div
              className={`modal-image ${
                slideDirection === "slide-out-left" ? "slide-out-left" : ""
              } ${
                slideDirection === "slide-out-right" ? "slide-out-right" : ""
              } ${slideDirection === "slide-in-left" ? "slide-in-left" : ""} ${
                slideDirection === "slide-in-right" ? "slide-in-right" : ""
              }`}
            >
              <img
                src={`${baseURL}${allImage[currentSlideIndex]}`}
                alt={`Image ${currentSlideIndex + 1}`}
              />
            </div>
            {currentSlideIndex < allImage.length - 1 && (
              <div
                className={`icon-div modal-arrow-right ${
                  slideDirection === "slide-out-right" ? "slide-out-right" : ""
                }`}
                onClick={goToNext}
              >
                &#8250;
              </div>
            )}
            {currentSlideIndex === allImage.length - 1 && (
              <div
                className={`icon-div modal-arrow-right slide-in-right ${
                  slideDirection === "slide-in-left" ? "slide-in-right" : ""
                }`}
                onClick={goToNext}
              >
                &#8250;
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryBody;
