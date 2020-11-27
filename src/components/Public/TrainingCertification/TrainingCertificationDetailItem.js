import React from 'react';
import {
    Link,
    useParams
} from "react-router-dom";
import moment from "moment"

const TrainingCertificationDetailItem = (props) => {
    let { eventId, eventTitle } = useParams();
    
    return (
        <div className="blog-content">
            <div className="section-title">
                <div>
                    <h3>{props.headline}</h3>
                </div>
                <div className="course-viewer">
                    <ul>
                        <li><i className="fas fa-user"></i> {props.createdUser}</li>
                        <li>
                            <i className="fas fa-calendar"></i>
                            {moment(props.date_event).format("D MMM, YYYY")}
                        </li>
                        <li>
                            <i className="fas fa-search-location"></i> {props.location}
                        </li>
                    </ul>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
            {(props.currentAuthId) ? (
                <div className="text-right">
                    {(props.event_category_id === 3) ? (
                        <Link to={`/trainingcertification/meeting/${eventId}/${eventTitle}`}>
                        <button className="color-two button">Book Ticket</button>
                    </Link>
                    ) : (
                        <Link to={`/trainingcertification/registration/${eventId}/${eventTitle}`}>
                        <button className="color-two button">Book Ticket</button>
                    </Link>
                    )}
                    
                </div>
            ) : (
                <Link to={`/login`}>
                        <button className="color-two button">Login to register</button>
                </Link>
            )}
        </div>
    );
}

export default TrainingCertificationDetailItem;