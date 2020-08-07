import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import AuthService from "../services/auth.service"
import { UserContext } from "../UserContext";

const Header = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);
    const { userLogin } = useContext(UserContext)

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setShowUserBoard(user.roles.includes("ROLE_USER"));
        }
    },[])

    const logOut = () => {
        AuthService.logout();
    };

    return (
      <header id="header" className="transparent-header">
        <div className="topheader top_header_light hidemobile">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-right">
                <div className="custom-page-top">
                  {showUserBoard && (
                    <span>
                      <Link to={"/user"}>User Board</Link>
                    </span>
                  )}
                  {showAdminBoard && (
                    <span>
                      <Link to={"/admin"}>Admin Board</Link>
                    </span>
                  )}
                  {currentUser ? (
                    <span>
                      <Link to={"/membership"}>Membership</Link>
                      <Link to={"/user"}>{userLogin.name}</Link>
                      <a href="/login" onClick={logOut}>
                        LogOut
                      </a>
                    </span>
                  ) : (
                    <div>
                      <Link to={"/membership"}>Membership</Link>
                      <Link to={"/register"}>Register</Link>
                      <Link to={"/login"}>Login</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </header>
    );
}

export default Header;