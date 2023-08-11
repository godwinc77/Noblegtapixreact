
import React, {useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import Login from './Admin/Registration/Login/Login';
import Home from './Admin/containers/Home/Home';
import ErrorPage from './Admin/containers/ErrorPage';
import SIgnup from './Admin/Registration/Signup/SIgnup';
import PrivateRoute from './Admin/PrivateRoute/PrivateRoute';
import MainPage from './Main_page/MainPage';




const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    // Perform authentication logic and verify the user
    // Once the user is authenticated, call setIsAuthenticated(true)

    setIsAuthenticated(true);
  };
  return (
    <Router>
      <div className="App">
        <Switch>
          
          <Route exact path="/signup" component={SIgnup} />
          <Route exact path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <PrivateRoute exact path="/home" isAuthenticated={isAuthenticated} component={Home} />
          <Route exact path="/main" component={MainPage} />
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>
          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
