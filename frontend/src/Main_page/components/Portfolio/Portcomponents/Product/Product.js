import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./product.css";

const Product = () => {
  const baseURL = "http://localhost:4000/productimages/";

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
        "http://localhost:4000/product-get-image"
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
  const numberOfRows = Math.ceil(allImage.length / 3);

  // Function to handle the automatic deletion of images if the total number of images exceeds 15
  useEffect(() => {
    if (allImage.length > 12) {
      const deleteCount = allImage.length - 12;
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
      <div className="port-box ">
        <div className="port-body-bg">
          {Array.from({ length: numberOfRows }, (_, rowIdx) => (
            <div key={rowIdx} className="port-row">
              {allImage
                .slice(rowIdx * 3, (rowIdx + 1) * 3)
                .map((imageId, idx) => (
                  <div
                    key={idx}
                    className="port-body-con"
                    onClick={() => openModal(rowIdx * 3 + idx)}
                  >
                    <img
                      src={`${baseURL}${imageId}`}
                      alt={`Image ${rowIdx * 3 + idx + 1}`}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {showModal && currentSlideIndex !== null && (
        <div className="portmodal">
          <span className="portmodal-exit" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </span>

          <div className="portmodal-slideshow">
            {currentSlideIndex > 0 && (
              <div
                className={`porticon-div portmodal-arrow-left left slide-in-left${
                  slideDirection === "slide-out-left" ? "slide-out-left" : ""
                }`}
                onClick={goToPrevious}
              >
                &#8249;
              </div>
            )}
            {currentSlideIndex === 0 && allImage.length > 1 && (
              <div
                className={`porticon-div portmodal-arrow-left slide-in-left ${
                  slideDirection === "slide-in-right" ? "slide-in-left" : ""
                }`}
                onClick={goToPrevious}
              >
                &#8249;
              </div>
            )}
            <div
              className={`portmodal-image ${
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
                className={`porticon-div portmodal-arrow-right ${
                  slideDirection === "slide-out-right" ? "slide-out-right" : ""
                }`}
                onClick={goToNext}
              >
                &#8250;
              </div>
            )}
            {currentSlideIndex === allImage.length - 1 && (
              <div
                className={`porticon-div portmodal-arrow-right slide-in-right ${
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

export default Product;
