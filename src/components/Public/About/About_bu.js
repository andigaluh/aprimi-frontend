import React, { useState, useEffect } from "react"
import ContenService from "../../../services/ContentServices"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

const About = () => {
    const [aboutContent, setAboutContent] = useState({})

    let { path, url } = useRouteMatch();

    //console.log(url)
    console.log()
    
    useEffect(() => {
        retrieveContentAbout();
    },[]);

    const retrieveContentAbout = () => {
        var id_content = 1
        
        ContenService.get(id_content).then(
            (response) => {
                setAboutContent(response.data)
            }
        )
    }

    return(
        <main>
            <div className="lernen_banner large bg-about">
                <div className="container">
                    <div className="row">
                        <div className="lernen_banner_title">
                            <h1>About Company</h1>
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
                                <div>
                                    <div className="about-title">
                                        <h4>{aboutContent.title}</h4>
                                    </div>
                                    <div className="about-content">
                                        <p>{aboutContent.content}</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
    )

}

export default About;