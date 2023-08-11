import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Gallery from "../../component/Gallery/Gallery";
import Dashboard from "../Dashboard/Dashboard";
import Portfolio from "../../component/Portfolio/Portfolio";
import Background from "../../component/Background/Background";

import "./home.css";

const Home = () => {
  return (
    <Router>
      <div className="home">
        <Header />
        <div className="home-con">
          <Sidebar />
          <div className="home-con-display">
            <Switch>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>

              <Route exact path="/background">
                <Background />
              </Route>

              <Route exact path="/gallery">
                <Gallery />
              </Route>

              <Route exact path="/portfolio">
                <Portfolio />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Home;
