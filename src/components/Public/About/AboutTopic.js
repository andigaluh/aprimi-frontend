import React, { useState, useEffect } from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";


const AboutTopic = (props) => {
    let { topicId } = useParams();
    
    return(
        <div>
            <div className="about-title">
                <h4>{props.title}</h4>
            </div>
            <div className="about-content">
                <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
            </div>
        </div>
    )
}

export default AboutTopic;