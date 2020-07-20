import React from "react"

const FooterSubscriber = () => {
    return (
        <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="f-widget-title">
                <h4>Subscribe</h4>
            </div>

            <div className="footer-newsletter sigle-address subscribe-form-pt">
                <p>Subscribe to our newsletter!
                            Stay always in touch!</p>

                <form className="themeioan-form-newsletter form" action="#">
                    <div className="newslleter-call">
                        <input className="input-text required-field" type="text" placeholder="Your email"
                            title="Your email" />
                        <div className="footer-submit">
                            <input className="newsletter-submit" type="submit" value="Send" />
                        </div>
                    </div>
                </form>

                <span>* Don't worry, we don't spam.</span>
            </div>

        </div>
    )
}

export default FooterSubscriber