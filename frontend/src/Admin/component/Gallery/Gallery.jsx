import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import "./gallery.css";

const Gallery = () => {
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

  const handleDeleteImage = async (imageId) => {
    try {
      // Delete the image from the server's file system
      await axios.delete(
        `http://localhost:4000/gallerys-delete-image/${imageId}`
      );

      // After successfully deleting the image, update the allImage state
      const updatedImageIds = allImage.filter((id) => id !== imageId);
      setAllImage(updatedImageIds);

      // Store the updated image IDs in localStorage
      localStorage.setItem("allImage", JSON.stringify(updatedImageIds));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Upload each selected image one by one
      for (const selectedImage of images) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        if (allImage.length >= 20) {
          // If there are already 10 images, delete the oldest image
          const oldestImageId = allImage[0];
          await handleDeleteImage(oldestImageId);
        }

        const response = await axios.post(
          "http://localhost:4000/gallerys-upload-image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const imageId = response.data.data;
        console.log("Image ID:", imageId);
      }

      // Fetch the updated list of images after successful upload
      getImage();

      setLoading(false);
      setImages([]); // Reset the selected images after successful upload
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const onInputChange = (e) => {
    const selectedFiles = e.target.files;
    const newImages = Array.from(selectedFiles); // Convert the selectedFiles to an array

    // Update the state with the selected images
    setImages(newImages);
  };

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
        // Set the image IDs retrieved from the server
        setAllImage(response.data.data.slice(-20)); // Keep only the last 1 image
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
    <div className="gallery__con">
      <div className="gallery__con2">
        <form className="gallery__upload" onSubmit={submitImage}>
          <div className="gallery__upload__input">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onInputChange}
            />

            <button type="submit">Submit</button>
          </div>
          {images.length > 0 && (
            <div className="portfliodiv__display__preview">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                />
              ))}
            </div>
          )}
        </form>

        <div className="gallery_display">
          {loading ? (
            <p>Loading...</p>
          ) : hasLoaded ? (
            allImage.length > 0 ? (
              allImage.map((imageId, index) => {
                // Use imageId instead of imageObj
                const imageUrl = `${baseURL}${imageId}`; // Construct the image URL using imageId
                console.log(`Image URL ${index + 1}: ${imageUrl}`);
                return (
                  <div className="gallery__display_img" key={index}>
                    <LazyLoadImage
                      src={imageUrl}
                      height={150}
                      width={150}
                      alt={`Image ${index + 1}`}
                      className="scale-in-center"
                    />
                    <button onClick={() => handleDeleteImage(imageId)}>
                      {" "}
                      {/* Pass imageId directly */}
                      Delete
                    </button>
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
};

export default Gallery;
