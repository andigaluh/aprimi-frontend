import React, { useState, useEffect } from "react";
import CarouselDataService from "../services/CarouselServices";
import ContentDataService from "../services/ContentServices";
import EventDataService from "../services/EventServices";
import EventServices from "../services/EventServices";
import NewsServices from "../services/NewsServices";
import LogoServices from "../services/LogoServices";


const Homepage = () => {

    const [carousels, setCarousels] = useState([]);
    //const [currentCarousel, setCurrentCarousel] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [contents, setContents] = useState([]);
    const [currentIndexContent, setCurrentIndexContent] = useState(-1);
    const [events, setEvents] = useState([]);
    const [news, setNews] = useState([]);
    const [logos, setLogos] = useState([]);

    useEffect(() => {
      retrieveCarousel();
      retrieveContent();
      retrieveEvent();
      retrieveNews();
      retrieveLogos();
    }, []);

    const retrieveCarousel = () => {
      CarouselDataService.getAll()
        .then((response) => {
          setCarousels(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const retrieveContent = () => {
        ContentDataService.getWhatWeDo().then((response) => {
            setContents(response.data);
            console.log(response.data)
        }).catch((e) => {
            console.log(e)
        })
    }

    const retrieveEvent = () => {
        EventServices.getAll().then((response) => {
            setEvents(response.data)
            console.log(response.data)
        }).catch((e) => {
            console.log(e)
        })
    }

    const retrieveNews = () => {
      NewsServices.getAll()
        .then((response) => {
          setNews(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const retrieveLogos = () => {
      LogoServices.getAll()
        .then((response) => {
          setLogos(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    /* const refreshList = () => {
      retrieveCarousel();
      setCurrentCarousel(null);
      setCurrentIndex(-1);
    };

    const setActiveCarousel = (carousel, index) => {
      setCurrentCarousel(carousel);
      setCurrentIndex(index);
    }; */



  return (
    <div className="list row">
      <div className="col-md-12">
        <h4>Carousel</h4>

        <ul className="list-group">
          {carousels &&
            carousels.map((carousel, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                /* onClick={() => setActiveCarousel(carousel, index)} */
                key={index}
              >
                {carousel.title}
              </li>
            ))}
        </ul>
      </div>
      {/* <div className="col-md-6">
        {currentCarousel ? (
          <div>
            <h4>Carousel</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentCarousel.title}
            </div>
            <div>
              <label>
                <strong>Content:</strong>
              </label>{" "}
              {currentCarousel.content}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCarousel.is_published ? "Published" : "Pending"}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Carousel...</p>
          </div>
        )}
      </div> */}

      <div className="col-md-12">
        <h4>What We Do</h4>
        <ul className="list-group">
          {contents &&
            contents.map((content, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndexContent ? "active" : "")
                }
                /* onClick={() => setActiveCarousel(carousel, index)} */
                key={index}
              >
                <h4>{content.title}</h4>
                <p>{content.content}</p>
              </li>
            ))}
        </ul>
      </div>

      <div className="col-md-12">
        <h4>Highlight Event</h4>
        <ul className="list-group">
          {events &&
            events.map((event, index) => (
              <li
                className={"list-group-item"}
                /* onClick={() => setActiveCarousel(carousel, index)} */
                key={index}
              >
                <h4>{event.title}</h4>
                <p>
                  {event.date_event} - {event.headline}
                </p>
              </li>
            ))}
        </ul>
      </div>

      <div className="col-md-12">
        <h4>Highlight News</h4>
        <ul className="list-group">
          {news &&
            news.map((berita, index) => (
              <li
                className={"list-group-item"}
                /* onClick={() => setActiveCarousel(carousel, index)} */
                key={index}
              >
                <h4>{berita.title}</h4>
                <p>Category : {berita.news_category.title}</p>
                <p>
                  {berita.createdAt} - {berita.headline}
                </p>
              </li>
            ))}
        </ul>
      </div>

      <div className="col-md-12">
        <h4>Partner</h4>
        <ul className="list-group">
          {logos &&
            logos.map((logo, index) => (
              <li
                className={"list-group-item"}
                /* onClick={() => setActiveCarousel(carousel, index)} */
                key={index}
              >
                <p>
                  {logo.image}
                </p>
              </li>
            ))}
        </ul>
      </div>

    </div>
  );
};

export default Homepage;
