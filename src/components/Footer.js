import React from "react"
import FooterAddress from "./FooterAddress"
import FooterAboutUs from "./FooterAboutUs"
import FooterWhatWeDo from "./FooterWhatWeDo"
import FooterSubscriber from "./FooterSubscriber"

const Footer = () => {
    return(
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <FooterAddress />
                        <FooterAboutUs />
                        <FooterWhatWeDo />
                        <FooterSubscriber />
                    </div>
                    <div className="cd-top">
                        <i className="fas fa-level-up-alt"></i>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="copyright">
                            <p>©2020 Aprimi. All Rights Reserved. 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="cd-top">Top</div>
                <div className="cursor"></div>
                <div className="cursor2"></div>
            </div>
        </footer>
    )
}

export default Footer