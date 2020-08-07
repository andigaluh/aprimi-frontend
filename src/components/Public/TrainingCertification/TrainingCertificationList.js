import React, { useState, useEffect } from "react"
import Item from "./TrainingCertificationItem"
import EventService from "../../../services/EventServices"
import {
    //BrowserRouter as Router,
    Switch,
    Route,
    Link,
    //useParams,
    useRouteMatch
} from "react-router-dom";
import ItemDetail from "./TrainingCertificationDetail"

const TrainingCertificationList = () => {

    const [event, setEvent] = useState([])
    let { path } = useRouteMatch();

    useEffect(() => {
        retrieveEvent();
    },[])

    const retrieveEvent = () => {
        EventService.getAllPublished().then(
            (response) => {
                setEvent(response.data)
                //console.log(response.data)
            }
        )
    }

    return (
      <main>
        <Switch>
          <Route exact path={path}>
            <div className="lernen_banner large bg-events">
              <div className="container">
                <div className="row">
                  <div className="lernen_banner_title">
                    <h1>Training Certification</h1>
                    <div className="lernen_breadcrumb">
                      <div className="breadcrumbs">
                        <span className="first-item">
                          <Link to={"/"}>Homepage</Link>
                        </span>
                        <span className="separator">&gt;</span>
                        <span className="last-item">
                          Training Certification
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="events" className="wrap-bg">
              <div className="container">
                <div className="row">
                  {event &&
                    event.map((v, i) => (
                      <Item
                        key={i}
                        title={v.title}
                        date_event={v.date_event}
                        thumbnail={v.thumbnail}
                        location={v.location}
                        headline={v.headline}
                        id={v.id}
                      />
                    ))}
                </div>
              </div>
            </div>
          </Route>
          <Route path={`${path}/:eventType/:eventId/:eventTitle`}>
            <ItemDetail />
          </Route>
        </Switch>
      </main>
    );
}

export default TrainingCertificationList