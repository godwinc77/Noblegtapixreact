import React, { useEffect, useState } from "react";
import axios from "axios";
import "./about.css";

const About = () => {
  const baseURL = "http://localhost:4000/images/";
  const slidesToShow = 3; // Number of images to show at a time
  const scrollDuration = 5; // Duration of one scroll cycle in seconds
  const pauseDuration = 2; // Pause duration after each cycle in seconds

  const [allImage, setAllImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
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

    getImage();
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImage.length);
    }, (scrollDuration + pauseDuration) * 1000);

    return () => clearInterval(scrollInterval);
  }, [allImage]);

  const transitionDuration = `${scrollDuration}s`;
  const transitionDelay = `${pauseDuration}s`;

  return (
    <div className="abouthead">
      <div className="abouthead_con">
        {loading ? (
          <p>Loading...</p>
        ) : allImage.length > 0 ? (
          <div className="aboutslider">
            <div
              className="aboutslide-container"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / slidesToShow)
                }%)`,
                transition: `transform ${transitionDuration} linear ${transitionDelay}`,
              }}
            >
              {allImage
                .slice(currentIndex, currentIndex + slidesToShow)
                .map((imageId, index) => (
                  <div key={index} className="aboutslide">
                    <img
                      src={`${baseURL}${imageId}`}
                      alt={`Image ${index + 1}`}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default About;
