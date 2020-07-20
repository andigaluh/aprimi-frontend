import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav
        className="navbar navbar-default navbar-expand-md navbar-light"
        id="navigation"
        data-offset-top="1"
      >
        <div className="container">
          <div className="navbar-header">
            <div className="navbar-brand">
              <Link to={"/home"}>
                <img src={"/assets/images/logo.png"} alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="burger-icon">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <div className="collapse navbar-collapse " id="navbarCollapse">
            <ul className="nav navbar-nav ml-auto">
              <li>
                <Link to={"/home"}>Home</Link>
              </li>
              <li className="subnav">
                <Link to={"/about"}>About Us</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to={"/about"} className="nav-link ">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to={"/about/committee"} className="nav-link ">
                      Committee
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to={"/whatwedo"}>What We Do</Link>
              </li>
              <li>
                <Link to={"/trainingcertification"}>
                  Training Certification
                </Link>
              </li>
              <li>
                <Link to={"/article"}>Article</Link>
              </li>
              <li>
                <Link to={"/contact"}>
                  Contact
                </Link>
              </li>
            </ul>
            <div className="header-cta">
              <a href="contact.html" className="btn btn-1c">
                Consulting
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;