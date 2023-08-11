import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mainhomehead.css";

const MainHomeHead = () => {
  const baseURL = "http://localhost:4000/images/";

  const [allImage, setAllImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Fetch the images from the server
    getImage();

    // Set up the slideshow interval
    const interval = setInterval(() => {
      if (allImage.length > 0) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === allImage.length - 1 ? 0 : prevIndex + 1
        );
        setImageLoaded(false); // Reset the imageLoaded state to false when the image changes
      }
    }, 10000); // Change the image every 10 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [allImage.length]); // Add allImage.length as a dependency to the useEffect to update the interval when images change

  const getImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/get-image");
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

  return (
    <div className="mainhead">
      <div className="mainhead_con">
        {loading ? (
          <p>Loading...</p>
        ) : allImage.length > 0 ? (
          <div>
            {allImage.map((imageId, index) => (
              <img
                key={index}
                src={`${baseURL}${imageId}`}
                alt={`Image ${index + 1}`}
                style={{
                  transform:
                    currentImageIndex === index
                      ? "translateX(0)"
                      : currentImageIndex > index
                      ? "translateX(-100%)"
                      : "translateX(100%)",
                  zIndex: currentImageIndex === index ? 1 : 0,
                }}
                onLoad={() => setImageLoaded(true)}
              />
            ))}
          </div>
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default MainHomeHead;
