import React from "react"
import {Link} from "react-router-dom"

const FooterWhatWeDo = () => {
    return(
        <div className="col-xl-2 offset-xl-1 col-lg-3 col-sm-6">
            <div className="f-widget-title">
                <h4>What We Do</h4>
            </div>
            <div className="f-widget-link">
                <ul>

                    <li><Link to={"/whatwedo"}>Salary survey</Link></li>
                    <li><Link to={"/whatwedo"}>Knowledge Sharing</Link></li>
                    <li><Link to={"/whatwedo"}>Development Plan</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default FooterWhatWeDo