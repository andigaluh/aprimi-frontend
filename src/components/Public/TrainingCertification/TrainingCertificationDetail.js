import React, { useState, useEffect, useContext }from "react"
import {
    useParams,
    
} from "react-router-dom";
import EventService from "../../../services/EventServices"
import AuthService from "../../../services/auth.service"
import ItemRegistration from "./TrainingCertificationRegistration"
import TrainingCertificationDetailItem from "./TrainingCertificationDetailItem";
import TrainingCertificationBanner from "./TrainingCertificationBanner";

const TrainingCertificationDetail = () => {
    let { eventId, eventType } = useParams();
    const [itemDetail, setItemDetail] = useState({})
    const [createdUser, setCreatedUser] = useState({})
    const [currentAuth, setCurrentAuth] = useState({})

    useEffect(() => {
        const auth = AuthService.getCurrentUser()
        if(auth){
            setCurrentAuth(auth)
        }
        retriveEvent(eventId)
        window.scrollTo(0, 0)
        console.log(eventType)
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
                            {((eventType == "registration") && (currentAuth.id)) ? (
                                
                                <ItemRegistration 
                                    headline={itemDetail.headline}
                                    createdUser={createdUser.name}
                                    date_event={itemDetail.date_event}
                                    location={itemDetail.location}
                                    id={itemDetail.id}
                                />

                            ):(
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
                                        <a href="services-detail.html" class="color-one btn-custom">Get in Touch <i class="fas fa-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="detail-widgets widget-category">
                                <h4 class="title">Categories</h4>
                                <ul>
                                    <li><a href="#">Coaching <span>04</span></a></li>
                                    <li><a href="#">Building <span>13</span></a></li>
                                    <li><a href="#">House <span>22</span></a>
                                    </li><li><a href="#">Interior <span>19</span></a></li>
                                    <li><a href="#">Architect <span>14</span></a></li>
                                </ul>
                            </div>

                            <div class="detail-widgets widget-tag">
                                <h4 class="title">Tags Cloud</h4>
                                <ul>
                                    <li><a href="#">Doctor</a></li>
                                    <li><a href="#">House</a></li>
                                    <li><a href="#">Interior</a></li>
                                    <li><a href="#">Coaching</a></li>
                                    <li><a href="#">Architect</a></li>
                                    <li><a href="#">Medical</a></li>
                                    <li><a href="#">Services</a></li>
                                </ul>
                            </div>

                        </div>

            



                    </div>
                </div>
            </div>
       </div>
   ) 
}

export default TrainingCertificationDetail