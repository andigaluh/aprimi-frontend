import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./UserContext"
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
import BoardUser from "./components/UserBoard/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Membership from "./components/Public/Membership/Membership";
import TrainingRegistration from "./components/Public/TrainingCertification/TrainingCertificationRegistration"
import ActivationUser from "./components/Public/Login/ActivationUser";
import ForgetPassword from "./components/Public/Login/ForgetPassword";
import ResetPassword from "./components/Public/Login/ResetPassword";

const App = () => {
    const [userLogin, setUserLogin] = useState({})

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setUserLogin(user)
        }
    }, []);

    const providerValue = useMemo(() => ({ userLogin, setUserLogin }), [userLogin, setUserLogin])

    return (
        <Router>
            <UserContext.Provider value={providerValue}>
            <Header />
            <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route path="/about" component={About} />
                <Route path="/whatwedo" component={WhatWeDo} />
                <Route path="/trainingcertification" component={TrainingCertification} />
                <Route path="/trainingregistration" component={TrainingRegistration} />
                <Route path="/article" component={Article} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/user" component={BoardUser} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} />
                <Route path="/membership" component={Membership} />
                <Route path="/activation-user" component={ActivationUser} />
                <Route path="/forget-password" component={ForgetPassword} />
                <Route path="/reset-password/:id" component={ResetPassword} />
                
            </Switch>
            <Footer />
            </UserContext.Provider>
        </Router>
    );
};

export default App;
