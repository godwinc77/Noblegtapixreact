import { BrowserRouter as Router } from "react-router-dom";
import RateBody from "./RateBody/RateBody";
import RateHead from "./RateHead/RateHead";

const Rates = () => {
  return (
    <Router>
      <RateHead />
      <RateBody />
    </Router>
  );
};

export default Rates;
