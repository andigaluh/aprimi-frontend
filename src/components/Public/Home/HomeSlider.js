import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption } from 'reactstrap'
import CarouselService from "../../../services/CarouselServices"


const HomeSlider = (props) => {
  const [carousel, setCarousel] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    retrieveCarousel();
  }, []);

  const retrieveCarousel = () => {
    CarouselService.getAll().then(
      (response) => {
        const { items } = response.data
        setCarousel(items);
      }
    )
  }

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === carousel.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? carousel.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = carousel.map((item) => {
    return (     
      <CarouselItem
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <img src={process.env.REACT_APP_API + "/uploads/carousel/" + item.image} alt={item.title} className="custom-tag"/>
        
        <CarouselCaption className="text-info" captionText={item.promo} captionHeader={item.title} />
        
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {
          `.custom-tag {
              max-width: 100%;
              width: 100%;
            }`
        }
      </style>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={carousel} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}

export default HomeSlider;