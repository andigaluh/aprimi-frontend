import React, { useState, useEffect } from "react"
import moment from "moment"
import {
    Link
} from "react-router-dom";
import "../../../App.css"
import AuthService from "../../../services/auth.service"

const TrainingCertificationItem = (props) => {
    const [currentAuth, setCurrentAuth] = useState({})
    
    useEffect(()=> {
        const auth = AuthService.getCurrentUser()
        if (auth) {
            setCurrentAuth(auth)
        }
    },[props])

    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 course-single mb25">
            <div className="themeioan_event">
                <article>
                    <div className="event-photo">
                        <div className="date">
                            <h4><span>{moment(props.date_event).format("DD")}</span>{moment(props.date_event).format("MMM, YYYY")}</h4>
                        </div>
                        <Link to={"/trainingcertification/detail/" + props.id + "/" + props.title.split(/[&\\#,+()$~%.'":*?<>{}\s]/g).join('-').toLowerCase()}>
                            {(props.thumbnail) ? (
                                <img src={
                                    process.env.REACT_APP_API +
                                    "/uploads/event/thumbnail/" + props.thumbnail
                                } alt={props.title} className="event-photo-item"/>
                            ) : (
                                <img src = {
                                    process.env.REACT_APP_API +
                                    "/uploads/event/thumbnail/default.jpg"
                                } alt={props.title} />
                            )}
                        </Link>
                    </div>
                    <div className="event-content">
                        <h5 className="title">
                            <Link to={"/trainingcertification/detail/" + props.id + "/" + props.title.split(/[&\\#,+()$~%.'":*?<>{}\s]/g).join('-').toLowerCase()}>
                                {props.title}
                            </Link>
                        </h5>
                        <div className="course-viewer">
                            <ul>
                            <li><i className="fas fa-calendar-alt"></i> {moment(props.date_event).format("D MMM, YYYY")}</li>
                            <li><i className="fas fa-search-location"></i> {props.location}</li>
                            </ul>
                            <p>{props.headline}</p>
                        </div>
                        <div className="btn-section">
                            {currentAuth.id && (
                                <Link to={"/trainingcertification/registration/" + props.id + "/" + props.title.split(/[&\\#,+()$~%.'":*?<>{}\s]/g).join('-').toLowerCase()} className="button-light">
                                    <i className="fas fa-arrow-right"></i>Book Ticket
                                </Link>
                            )}
                                
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default TrainingCertificationItem;