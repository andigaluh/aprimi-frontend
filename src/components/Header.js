import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import AuthService from "../services/auth.service"
import BoardAdmin from "../components/BoardAdmin";

const Header = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
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
                                {showAdminBoard && (
                                    <span>
                                        <Link to={"/admin"}>
                                            Admin Board
                                        </Link>
                                    </span>
                                )}
                                {currentUser ? (
                                    <span>
                                        <Link to={"/profile"}>
                                            {currentUser.name}
                                        </Link>
                                        <a href="/login" onClick={logOut}>
                                            LogOut
                                        </a>
                                    </span>
                                ) : (
                                    <div>
                                    <Link to={"/login"}>
                                        Login
                                    </Link>
                                    <Link to={"/register"} >
                                        Register
                                    </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar />
            
        </header>
    )
}

export default Header;