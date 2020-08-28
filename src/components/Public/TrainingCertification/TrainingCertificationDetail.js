import React, { useState, useEffect } from "react"
import {
    useParams,

} from "react-router-dom";
import EventService from "../../../services/EventServices"
import AuthService from "../../../services/auth.service"
import ItemRegistration from "./TrainingCertificationRegistration"
import TrainingCertificationDetailItem from "./TrainingCertificationDetailItem";
import TrainingCertificationBanner from "./TrainingCertificationBanner";
import { Link } from "react-router-dom" 

const TrainingCertificationDetail = () => {
    let { eventId, eventType } = useParams();
    const [itemDetail, setItemDetail] = useState({})
    const [createdUser, setCreatedUser] = useState({})
    const [currentAuth, setCurrentAuth] = useState({})

    useEffect(() => {
        const auth = AuthService.getCurrentUser()
        if (auth) {
            setCurrentAuth(auth)
        }
        retriveEvent(eventId)
        window.scrollTo(0, 0)
    }, [eventId])

    const retriveEvent = (id) => {
        EventService.get(id).then(
            (response) => {
                setItemDetail(response.data)
                setCreatedUser(response.data.created_user)
                //console.log(response.data)
            }
        )
    }

    return (
        <div>
            <TrainingCertificationBanner
                title={itemDetail.title}
            />

            <div id="blog-detail" className="wrap-bg wrap-bg ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            {((eventType === "registration") && (currentAuth.id)) ? (

                                <ItemRegistration
                                    headline={itemDetail.headline}
                                    createdUser={createdUser.name}
                                    date_event={itemDetail.date_event}
                                    location={itemDetail.location}
                                    id={itemDetail.id}
                                />

                            ) : (
                                    <TrainingCertificationDetailItem
                                        headline={itemDetail.headline}
                                        createdUser={createdUser.name}
                                        date_event={itemDetail.date_event}
                                        location={itemDetail.location}
                                        content={itemDetail.content}
                                        id={itemDetail.id}
                                        currentAuthId={currentAuth.id}
                                    />
                                )}

                        </div>
                        <div class="col-md-12 col-lg-4">
                            <div class="relative sidebar-services mt-25">
                                <div class="services_image services_bg3 hoverblack">
                                    <div class="opac">
                                        <h3>Coaching Courses</h3>
                                        <p>Open a beautiful store & increase your conversion rates. Deploy a conversion rate optimization.</p>
                                        <Link to={"/contact"} className="color-one btn-custom">
                                            Get in Touch <i class="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainingCertificationDetail