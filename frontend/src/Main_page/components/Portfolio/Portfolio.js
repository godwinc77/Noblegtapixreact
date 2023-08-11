import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PortfolioBody from "./PortfolioBody/PortfolioBody";
import PortfolioHead from "./PortfolioHead/PortfolioHead";
import { Studio, Outdoor, Makeup, Product } from "./Portcomponents/index";
import "./portfolio.css";

const Portfolio = () => {
  return (
    <Router>
      <PortfolioHead />
      <PortfolioBody />
      <div>
        <Switch>
          <Route exact path="/studio">
            <Studio />
          </Route>
          <Route exact path="/outdoor">
            <Outdoor />
          </Route>
          <Route exact path="/makeup">
            <Makeup />
          </Route>
          <Route exact path="/product">
            <Product />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Portfolio;
