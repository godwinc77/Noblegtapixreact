import "./background.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BackgroundNav from "./BackgroundNav";
import {
  HomeBackground,
  GalleryBackground,
  PortfolioBackground,
  ServiceBackground,
} from "./index";

const Background = () => {
  return (
    <Router>
      <BackgroundNav />

      <Switch>
        <Route exact path="/homebackground">
          <HomeBackground />
        </Route>
        <Route exact path="/gallerybackground">
          <GalleryBackground />
        </Route>
        <Route exact path="/portfoliobackground">
          <PortfolioBackground />
        </Route>
        <Route exact path="/servicebackground">
          <ServiceBackground />
        </Route>
      </Switch>
    </Router>
  );
};

export default Background;
