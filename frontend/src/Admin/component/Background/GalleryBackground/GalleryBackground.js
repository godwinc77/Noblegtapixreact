import React, { useEffect, useState } from "react";
import axios from "axios";
import "./gallerybackround.css";

const GalleryBackground = () => {
  const baseURL = "http://localhost:4000/gallery-background-images/";

  const [image, setImage] = useState(null);
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

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    try {
      setLoading(true);

      if (allImage.length >= 1) {
        // If there is an existing image, delete it
        const existingImageId = allImage[0];
        await axios.delete(
          `http://localhost:4000/delete-image/${existingImageId}`
        );
      }

      const response = await axios.post(
        "http://localhost:4000/gallery-background-upoad-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const imageId = response.data.data;
      console.log("Image ID:", imageId);

      // Fetch the updated list of images after successful upload
      getImage();

      setLoading(false);
      setImage(null); // Reset the selected image after successful upload
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/gallery-background-get-image"
      );
      console.log("Server Response:", response.data);

      if (
        response.data &&
        response.data.status === "ok" &&
        Array.isArray(response.data.data)
      ) {
        // Set the image IDs retrieved from the server
        setAllImage(response.data.data.slice(-1)); // Keep only the last 1 image
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
    <div className="gallerybackground__con">
      <div className="gallerybackground__con2">
        <form className="gallerybackground__upload" onSubmit={submitImage}>
          <div className="gallerybackground__upload__input">
            <input type="file" accept="image/*" onChange={onInputChange} />
            <button type="submit">Submit</button>
          </div>

          {image && (
            <div className="gallerybackground__display__preview">
              <img src={URL.createObjectURL(image)} alt="Preview" />
            </div>
          )}
        </form>

        <div className="gallerybackground__display">
          {loading ? (
            <p>Loading...</p>
          ) : hasLoaded && allImage.length > 0 ? (
            allImage.map((imageId, index) => {
              // Use imageId instead of imageObj
              const imageUrl = `${baseURL}${imageId}`; // Construct the image URL using imageId
              console.log(`Image URL ${index + 1}: ${imageUrl}`);
              return (
                <div className="gallerybackground__display_img" key={index}>
                  <img
                    src={imageUrl}
                    className="scale-in-center"
                    alt={`Image ${index + 1}`}
                  />
                </div>
              );
            })
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryBackground;
