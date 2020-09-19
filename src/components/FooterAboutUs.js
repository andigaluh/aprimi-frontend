import React from "react" 
import { Link } from "react-router-dom"

const FooterAboutUs = () => {
    return (
        <div className="col-xl-2 offset-xl-1 col-lg-2 col-sm-6">
            <div className="f-widget-title">
                <h4>About Us</h4>
            </div>
            <div className="f-widget-link">
                <ul>
                    <li><Link to={"/about"}>About us</Link></li>
                    <li><Link to={"/about/committee"}>Committee</Link></li>
                    <li><Link to={"/membership-confirmation"}>Membership Confirmation</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default FooterAboutUs