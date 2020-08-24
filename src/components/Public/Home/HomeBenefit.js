import React from 'react';
import { Link } from 'react-router-dom'

function HomeBenefit(props) {
    return (
        <div id="why-us-white">
            <div class="why-us-container why-us-left-bg5">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-5 col-xl-6 col-lg-6">
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-7 col-xl-6 col-lg-6 text-left">
                            <div class="white-box-large">
                                <div class="section-title">
                                    <div>
                                        <h3>BENEFIT OF APRIMI MEMBER</h3>
                                        <div class="bar"></div>
                                    </div>
                                </div>
                                <p>There are several benefits participating in the total rewards survey and becoming APRIMI member :</p>
                                <ul class="themeioan_ul_icon">
                                    <li><i class="fas fa-check-circle"></i> Members could join an annual total rewards survey result discussion especially in the Oil and Gas industry.</li>
                                    <li><i class="fas fa-check-circle"></i> Members get an exclusive price on courses and exam of professional certification i.e. GRP (Global Remuneration Professional), CCP (Certified Compensation Professional) etc.</li>
                                    <li><i class="fas fa-check-circle"></i> Members get exclusive seminars, workshop and training in the field of Human Resources, especially in Remuneration area.</li>
                                    <li><i class="fas fa-check-circle"></i> Members could join APRIMI regular event i.e. best practice sharing session from other member companies in HR and remuneration area.</li>
                                    <li><i class="fas fa-check-circle"></i> Members get an exclusive publication and other materials related to Remuneration in the Oil and Gas industry.</li>
                                </ul>
                                <div class="mt-25 mb-50">
                                    <Link to={"/register"} className="color-two btn-custom">Join Us <i class="fas fa-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HomeBenefit;