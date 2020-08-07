import React from "react"

const AboutTopic = (props) => {
    
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