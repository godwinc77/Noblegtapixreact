import React, { useState } from "react";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image uploaded successfully:", data);
        // Perform any additional actions after successful upload
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle the error
      });
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default ImageUpload;
