import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";

import Navbar from "./containers/navbar/Navbar";
import Footer from "./containers/footer/Footer";
import {
  MainHome,
  Gallery,
  Portfolio,
  Rates,
  Services,
  About,
} from "./components";
import { Booking, Training } from "./components/contents/conindex";
import "./mainpage.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainPage = () => {
  return (
    <Router>
      <ScrollToTop />
      <>
        <div className="main">
          <Navbar />

          <div>
            <Switch>
              <Redirect exact from="/main" to="/" />
              <Route exact path="/">
                <MainHome />
              </Route>

              <Route exact path="/main-gallery">
                <Gallery />
              </Route>
              <Route exact path="/main-portfolio">
                <Portfolio />
              </Route>
              <Route exact path="/main-rates">
                <Rates />
              </Route>
              <Route exact path="/main-service">
                <Services />
              </Route>
              <Route exact path="/main-about">
                <About />
              </Route>

              <div>
                <Route exact path="/booking">
                  <Booking />
                </Route>
                <Route exact path="/training">
                  <Training />
                </Route>
              </div>
            </Switch>
          </div>
          <Footer />
        </div>
      </>
    </Router>
  );
};

export default MainPage;
