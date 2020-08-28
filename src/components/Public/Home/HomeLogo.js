import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoService from "../../../services/LogoServices"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../App.css";
import {
    Container, Row, Col, Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from "reactstrap"


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
            <Container>
                <Row>
                    <Col>
                        <div className="text-center">
                            <span>PARTNER COMPANIES</span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <CardDeck className="text-center">
                            {logo && logo.map((item) => (
                                <Card className="card-logo">
                                    <CardImg className="card-img-logo" center width="100%" src={process.env.REACT_APP_API + "/uploads/logo/" + item.image} alt={item.title} />
                                </Card>
                            ))}
                        </CardDeck>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default HomeLogo;