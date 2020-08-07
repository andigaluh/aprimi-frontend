import React, { useState, useEffect } from "react";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Topic from "./AboutTopic"
import ContenService from "../../../services/ContentServices"

const About = () => {
    let { path } = useRouteMatch();
    const [aboutContentCompany, setAboutContentCompany] = useState([])
    const [aboutContentCommittee, setAboutContentCommittee] = useState([])

    useEffect(() => {
        retrieveContentAbout();
    }, []);

    const retrieveContentAbout = () => {

        ContenService.getAllAbout().then(
            (response) => {
                setAboutContentCommittee(response.data[0])
                setAboutContentCompany(response.data[1])
                console.log(response.data[1])
            }
        )
    }
    return(
        <main>
            <div className="lernen_banner large bg-about">
                <div className="container">
                    <div className="row">
                        <div className="lernen_banner_title">
                            <h1>About</h1>
                            <div className="lernen_breadcrumb">
                                <div className="breadcrumbs">
                                    <span className="first-item">
                                        <a href="index.html">Homepage</a></span>
                                    <span className="separator">&gt;</span>
                                    <span className="last-item">About</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="about" className="wrap-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <Switch>
                                <Route exact path={path}>
                                    <Topic id={aboutContentCompany.id} title={aboutContentCompany.title} content={aboutContentCompany.content} />
                                </Route>
                                <Route path={`${path}/:topicId`}>
                                    <Topic id={aboutContentCommittee.id} title={aboutContentCommittee.title} content={aboutContentCommittee.content} />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}


export default About;