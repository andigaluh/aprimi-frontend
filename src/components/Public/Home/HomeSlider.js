import React, { useState, useEffect } from "react";
import CarouselService from "../../../services/CarouselServices"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../App.css";


const HomeSlider = () => {
    var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      adaptiveHeight: false,
      centerMode: false,
    };

    const [carousel, setCarousel] = useState("")
    
    useEffect(() => {
        retrieveCarousel();
    }, []);

    const retrieveCarousel = () => {
        CarouselService.getAll().then(
            (response) => {
                const { items, totalPages  } = response.data
                setCarousel(items);
            }
            )
    }
   
    return (
      <Slider {...settings}>
        {carousel &&
          carousel.map((car, i) => (
            <div className="slide">
              <img
                src={
                  process.env.REACT_APP_API + "/uploads/carousel/" + car.image
                }
                className="img-carousel"
              />
              <div className="text-carousel-centered">{car.title}</div>
            </div>
          ))}
      </Slider>
    );
}

export default HomeSlider;