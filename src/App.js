import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
/* import "bootstrap/dist/css/bootstrap.min.css"; */
/* import "./App.css"; */

import AuthService from "./services/auth.service";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Public/Login/Login";
import Register from "./components/Public/Register/Register";
import Home from "./components/Public/Home/Home";
import About from "./components/Public/About/About";
import WhatWeDo from "./components/Public/WhatWeDo/WhatWeDo";
import TrainingCertification from "./components/Public/TrainingCertification/TrainingCertificationList";
import Article from "./components/Public/Article/ArticleList";
import Contact from "./components/Public/Contact/Contact";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Membership from "./components/Public/Membership/Membership";

const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route path="/about" component={About} />
                <Route path="/whatwedo" component={WhatWeDo} />
                <Route path="/trainingcertification" component={TrainingCertification} />
                <Route path="/article" component={Article} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/user" component={BoardUser} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} />
                <Route path="/membership" component={Membership} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
