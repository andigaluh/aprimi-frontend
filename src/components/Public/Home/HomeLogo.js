import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoService from "../../../services/LogoServices"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../App.css";


const HomeLogo = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        adaptiveHeight: false,
        centerMode: false,
    };

    const [logo, setLogo] = useState([])

    useEffect(() => {
        retrieveLogo();
    }, []);

    const retrieveLogo = () => {
        LogoService.getAll().then(
            (response) => {
                setLogo(response.data);
            }
        )
    }

    return (
        <div id="logo-partner" className="wrap-bg">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-12">
                        <Slider {...settings}>
                            {logo &&
                                logo.map((item, i) => (
                                    <div className="slide">
                                        <Link to={item.url_link}>
                                            <img
                                                src={
                                                    process.env.REACT_APP_API + "/uploads/logo/" + item.image
                                                }
                                                className="img-logo"
                                                alt={item.title}
                                            />
                                        </Link>
                                    </div>
                                ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLogo;