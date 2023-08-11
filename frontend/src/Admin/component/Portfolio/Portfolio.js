import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./portfolio.css";
import PortfolioNav from "./PortfolioNav";
import {
  StudioUpload,
  OutdoorUpload,
  ProductUpload,
  MakeupUpload,
} from "./index";

const Portfolio = () => {
  return (
    <Router>
      <PortfolioNav />

      <Switch>
        <Route exact path="/studioupload">
          <StudioUpload />
        </Route>
        <Route exact path="/outdoorupload">
          <OutdoorUpload />
        </Route>
        <Route exact path="/productupload">
          <ProductUpload />
        </Route>
        <Route exact path="/makeupupload">
          <MakeupUpload />
        </Route>
      </Switch>
    </Router>
  );
};

export default Portfolio;
