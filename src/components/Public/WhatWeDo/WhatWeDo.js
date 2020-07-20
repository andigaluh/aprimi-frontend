import React, { useEffect, useState } from "react"
/* import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom"; */
import ContentService from "../../../services/ContentServices"
import WhatWeDoList from "./WhatWeDoList"

const WhatWeDo = () => {
    const [content, setContent] = useState([])
    const [contentWhatWeDo, setContentWhatWeDo] = useState([])

    useEffect(() => {
        retrieveContent()
        retrieveContentSummary()
    },[])

    const retrieveContent = () => {
        ContentService.getAllWhatWeDo().then(
            (response) => {
                setContent(response.data)
                
            }
        )
    }

    const retrieveContentSummary = () => {
        ContentService.getSumWhatWeDo().then(
            (response) => {
                setContentWhatWeDo(response.data[0])
            }
        )
    }

    return (
        <main>
            <div className="lernen_banner large bg-services">
                <div className="container">
                    <div className="row">
                        <div className="lernen_banner_title">
                            <h1>What We Do</h1>

                            <div className="lernen_breadcrumb">
                                <div className="breadcrumbs">
                                    <span className="first-item">
                                        <a href="index.html">Homepage</a></span>
                                    <span className="separator">&gt;</span>
                                    <span className="last-item">What We Do</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="projects" className="wrap-bg">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <div className="section-title with-p">
                                <h2>{contentWhatWeDo.title}</h2>
                                <div className="bar"></div>
                                    <div dangerouslySetInnerHTML={{ __html: contentWhatWeDo.content }}></div>
                                </div>
                            </div>
                        </div>
                    
                    <div className="row">
                        {content && content.map((v,k) => (
                            (k < 3) ? (
                                <WhatWeDoList title={v.title} content={v.content} /> 
                            ) : ( "" )
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default WhatWeDo;