import { BrowserRouter as Router } from "react-router-dom";
import MainHomeHead from "./MainHomehead/MainHomeHead";
import MainhomeGallery from "./MainhomeGallery/MainhomeGallery";
import Training from "./Training/Training";
import Reviews from "./Reviews/Reviews";
import Homelink from "./MainHomeLink/Homelink";
import "./home.css";
const MainHome = () => {
  return (
    <Router>
      <div className="mainhome_con">
        <MainHomeHead />
        <MainhomeGallery />
        <Training />
        <Homelink />
        <Reviews />
      </div>
    </Router>
  );
};

export default MainHome;
