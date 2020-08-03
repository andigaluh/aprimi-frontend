import React from 'react';
import { Link } from "react-router-dom"

const TrainingCertificationBanner = (props) => {
    return (
        <div className="lernen_banner large bg-events-detail">
            <div className="container">
                <div className="row">
                    <div className="lernen_banner_title">
                        <h1>{props.title}</h1>
                        <div className="lernen_breadcrumb">
                            <div className="breadcrumbs">
                                <span className="first-item">
                                    <Link to={"/"}>
                                        Homepage
                                    </Link>
                                </span>
                                <span className="separator">&gt;</span><span className="first-item">
                                    <Link to={"/trainingcertification"}>
                                        Training Certification
                                    </Link>
                                </span>
                                <span className="separator">&gt;</span>
                                <span className="last-item">{props.title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainingCertificationBanner;