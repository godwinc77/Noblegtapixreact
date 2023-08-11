import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import "./servicehead.css";

const ServiceHead = () => {
  const baseURL = "http://localhost:4000/service-background-images/";

  const [allImage, setAllImage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the images from the server
    getImage();
  }, []);

  const getImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/service-background-get-image"
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

  return (
    <>
      <div className="gallery-head-bg">
        <div>
          <div className="gallery-head-con slide-in-fwd-center">
            {loading ? (
              <p>Loading...</p>
            ) : allImage.length > 0 ? (
              <LazyLoadImage
                src={`${baseURL}${allImage[allImage.length - 1]}`} // Display the last image from the array
                alt="Image"
              />
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceHead;
