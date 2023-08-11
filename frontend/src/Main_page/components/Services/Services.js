import { BrowserRouter as Router } from "react-router-dom";
import "./services.css";
import ServiceBody from "./ServiceBody/ServiceBody";
import ServiceHead from "./ServiceHead/ServiceHead";

const Services = () => {
  return (
    <Router>
      <ServiceHead />
      <ServiceBody />
    </Router>
  );
};

export default Services;
