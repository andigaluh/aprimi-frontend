import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
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

              {props.showUserBoard && (
                <li className="d-block d-sm-none">
                  <Link to={"/user"}>User Board</Link>
                </li>
              )}
              {props.showAdminBoard && (
                <li className="d-block d-sm-none">
                  <Link to={"/admin"}>Admin Board</Link>
                </li>
              )}
              {props.currentUser ? (
                <li className="d-block d-sm-none">
                  <Link to={"/membership"}>Membership</Link>
                  <Link to={"/user"}>{props.userLogin.name}</Link>
                  <a href="/login" onClick={props.logOut}>
                    LogOut
                  </a>
                </li>
              ) : (
                <li className="d-block d-sm-none">
                  <Link to={"/membership"}>Membership</Link>
                  <Link to={"/register"}>Register</Link>
                  <Link to={"/login"}>Login</Link>
                  </li>
                )}
            </ul>
            <div className="header-cta">
                <Link to={"/contact"} className="btn btn-1c">
                  Consulting
                </Link>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;