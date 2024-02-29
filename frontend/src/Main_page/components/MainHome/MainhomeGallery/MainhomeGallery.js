import React, { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./mainhomegallery.css";

function MainhomeGallery() {
  const baseURL = "http://localhost:4000/gallerysimages/";

  const [images, setImages] = useState([]);
  const [allImage, setAllImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Load the previously stored image IDs from localStorage
    const storedImageIds = JSON.parse(localStorage.getItem("allImage") || "[]");
    setAllImage(storedImageIds);

    // Fetch the images from the server
    getImage();
  }, []);

  const getImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/gallerys-get-image"
      );
      console.log("Server Response:", response.data);

      if (
        response.data &&
        response.data.status === "ok" &&
        Array.isArray(response.data.data)
      ) {
        // Set the image IDs retrieved from the server and keep only the last 5 images
        const sortedImages = response.data.data.slice().reverse().slice(0, 5);
        setAllImage(sortedImages);
      } else {
        console.log("No images found or invalid data format");
        setAllImage([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching images:", error);
    }

    setHasLoaded(true);
  };

  console.log("All Images:", allImage);
  return (
    <div className="main-home-gallery-body">
      <div className="main-home-gallery-body-bg">
        <div className="main-home-gallery-row ">
          {loading ? (
            <p>Loading...</p>
          ) : hasLoaded ? (
            allImage.length > 0 ? (
              allImage.map((imageId, index) => {
                // Use imageId instead of imageObj
                const imageUrl = `${baseURL}${imageId}`; // Construct the image URL using imageId
                console.log(`Image URL ${index + 1}: ${imageUrl}`);
                return (
                  <div className="main-home-gallery-img" key={index}>
                    <LazyLoadImage
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                      className="scale-in-center"
                    />
                  </div>
                );
              })
            ) : (
              <p>No images available</p>
            )
          ) : (
            <p>Failed to load images.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainhomeGallery;
