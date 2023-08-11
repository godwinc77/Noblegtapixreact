import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainHomeHead from "./MainHomehead/MainHomeHead";
import MainHomebody from "./MainHomebody/MainHomebody";
import Gallery from "../Gallery/Gallery";
import "./home.css";
const MainHome = () => {
  return (
    <Router>
      <div className="mainhome_con">
        <MainHomeHead />
        <MainHomebody />
      </div>
      <Switch>
        <Route exact path="/main-gallery">
          <Gallery />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainHome;
