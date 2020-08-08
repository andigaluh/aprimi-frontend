import React, { useState, useEffect } from "react"
import EventService from "../../../services/EventServices"
import { Link } from "react-router-dom"
import moment from "moment";
import "../../../App.css"

const HomeEvent = () => {

    const [featuredEvent, setFeaturedEvent] = useState([]);

    useEffect(() => {
        retrieveFeaturedEvent();
    },[]);

    const retrieveFeaturedEvent = () => {
        EventService.getAllFeatured().then(
            (response) => {
                setFeaturedEvent(response.data)
            }
        )
    }

    return (
      <div id="blog" className="wrap-bg wrap-bg-light">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="section-title with-p">
                <h2>See what’s happing in our Event</h2>
                <div className="bar"></div>
                <p>
                  Check out our latest Event. We have articles on a range of
                  topics such as the leaving certificate and career guidance.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {featuredEvent &&
              featuredEvent.map((event, i) => (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 blog-single">
                  <div className="themeioan_blog">
                    <article>
                      <div className="blog-photo">
                        <Link
                          to={
                            "/trainingcertification/detail/" +
                            event.id +
                            "/" +
                            event.title.split(" ").join("-")
                          }
                        >
                          {event.thumbnail ? (
                            <img
                              src={
                                process.env.REACT_APP_API +
                                "/uploads/event/thumbnail/" +
                                event.thumbnail
                              }
                              alt={event.title}
                            />
                          ) : (
                            <img
                              src={
                                process.env.REACT_APP_API +
                                "/uploads/event/thumbnail/default.jpg"
                              }
                              alt={event.title}
                            />
                          )}
                        </Link>
                      </div>
                      <div className="blog-content">
                        <div className="course-viewer">
                          <ul>
                            <li>
                              <i className="fas fa-calendar"></i>
                              {moment(event.date_event).format("DD/MM/YYYY")}
                            </li>
                            <li>
                              <i className="fas fa-search-location"></i>
                              {event.location.substring(0, 18)}
                            </li>
                          </ul>
                        </div>
                        <h5 className="title">
                          <Link
                            to={
                              "/trainingcertification/detail/" +
                              event.id +
                              "/" +
                              event.title.split(" ").join("-")
                            }
                          >
                            {event.title}
                          </Link>
                        </h5>
                        <p>{event.headline}</p>
                      </div>
                    </article>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
}

export default HomeEvent;