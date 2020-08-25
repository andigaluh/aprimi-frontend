import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoService from "../../../services/LogoServices"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../App.css";


const HomeLogo = () => {


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
        < div className="sponsor wrap-bg-small wrap-bg-dark" >
            <div className="container">

                <div className="text-center">
                    <span>PARTNER COMPANIES</span>
                </div>

                <div className=" carousel-slider sponsor-slider">

                    <div className="item">
                        <img src="/assets/images/content/students/1.svg" alt="Logo" />
                    </div>

                    <div className="item">
                        <img src="/assets/images/content/students/2.svg" alt="Logo" />
                    </div>

                    <div className="item">
                        <img src="/assets/images/content/students/3.svg" alt="Logo" />
                    </div>

                    <div className="item">
                        <img src="/assets/images/content/students/4.svg" alt="Logo" />
                    </div>

                    <div className="item">
                        <img src="/assets/images/content/students/5.svg" alt="Logo" />
                    </div>

                    <div className="item">
                        <img src="/assets/images/content/students/6.svg" alt="Logo" />
                    </div>

                    <div className="item">
                        <img src="/assets/images/content/students/4.svg" alt="Logo" />
                    </div>

                    <div className="item">
                        <img src="/assets/images/content/students/5.svg" alt="Logo" />
                    </div>

                    <div className="item">
                        <img src="/assets/images/content/students/6.svg" alt="Logo" />
                    </div>

                </div>
            </div>
        </div>

    );
}

export default HomeLogo;