import React, { useState, useEffect } from "react";
import ContentService from "../../../services/ContentServices"


const HomeServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        retrieveServices();
    },[])

    const retrieveServices = () => {
        ContentService.getWhatWeDo().then(
            (response) => {
                setServices(response.data);
            }
        )
    }

    return (
      <div id="services_image" className="wrap-bg wrap-bg-light">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="section-title with-p">
                <h2>Push Your Life To a New Level</h2>
                <div className="bar"></div>
                <p>
                  We can help you create positive and permanent changes in your
                  life. Let’s Create Something new and awesome Togeather.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {services &&
              services.map((service, i) => (
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 course-single mb25">
                  <div className="themeioan_services">
                    <article>
                      <div className="blog-content mh-346">
                        <div className="icon-space">
                          {service.id === 4 ? (
                            <div className="glyph-icon flaticon-030-test"></div>
                          ) : service.id === 5 ? (
                            <div className="glyph-icon flaticon-009-skills"></div>
                          ) : (
                            <div className="glyph-icon flaticon-028-thinking"></div>
                          )}
                        </div>
                        <h5 className="title">
                          {service.title}
                        </h5>
                        <p>{service.content}</p>
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

export default HomeServices