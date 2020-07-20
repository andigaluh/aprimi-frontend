import React from "react"
import WhatWeDo from "./WhatWeDo"
import "../../../App.css"

const WhatWeDoList = (props) => {

    var iconService = "";
    switch (props.title) {
        case "Salary survey":
            iconService = "flaticon-030-test"
            break;
        case "Knowledge Sharing":
            iconService = "flaticon-009-skills"
            break;
        default:
            iconService = "flaticon-028-thinking"
            break;
    }

    return(

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 course-single mb25">
            <div className="themeioan_services">
                <article>
                    <div className="blog-content mh-346">
                        <div className="icon-space">
                            <div className={"glyph-icon " + iconService}></div>
                        </div>
                        <h5 className="title">
                            {props.title}
                        </h5>
                        <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
                        
                    </div>
                </article>
            </div>
        </div>
    )
}

export default WhatWeDoList