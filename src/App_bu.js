import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Homepage from "./components/Homepage";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/carousel" className="navbar-brand">
            Aprimi-web
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            {
              <li className="nav-item">
                <Link to={"/about"} className="nav-link">
                  About
                </Link>
              </li>
            }
            {
              <li className="nav-item">
                <Link to={"/services"} className="nav-link">
                  Services
                </Link>
              </li>
            }
            {
              <li className="nav-item">
                <Link to={"/certification"} className="nav-link">
                  Event
                </Link>
              </li>
            }
            {
              <li className="nav-item">
                <Link to={"/agenda"} className="nav-link">
                  Agenda
                </Link>
              </li>
            }
            {
              <li className="nav-item">
                <Link to={"/article"} className="nav-link">
                  Article
                </Link>
              </li>
            }
            {
              <li className="nav-item">
                <Link to={"/contact"} className="nav-link">
                  Contact
                </Link>
              </li>
            }
            {
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Sign-in
                </Link>
              </li>
            }
            {
              <li className="nav-item">
                <Link to={"/membership"} className="nav-link">
                  Membership
                </Link>
              </li>
            }
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/carousel"]} component={Homepage} />
            <Route exact path="/login" component={Login} />
            {/*<Route path="/tutorials/:id" component={Tutorial} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
