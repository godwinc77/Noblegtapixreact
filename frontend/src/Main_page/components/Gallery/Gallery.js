import { BrowserRouter as Router } from "react-router-dom";
import GalleryHead from "./GalleryHead/GalleryHead";
import GalleryBody from "./GalleryBody/GalleryBody";

const Gallery = () => {
  return (
    <Router>
      <GalleryHead />
      <GalleryBody />
    </Router>
  );
};

export default Gallery;
