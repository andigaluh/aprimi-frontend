import React from 'react';
import {
    Container, Row, Col, Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, CardColumns, CardGroup
} from 'reactstrap'
import moment from 'moment'


const AgendaItem = (props) => {
    var key = props.iKey
    var styleKey = (key % 2 == 0) ? `primary` : `danger`; 
   
    const momentAgenda = (value) => {
        return moment(value).format('DD MMM YYYY h:mm:ss')
    }
    
    return (
        <Card body inverse color={styleKey}>
            <CardBody >
                <CardTitle>{props.iKey} - {props.title}</CardTitle>
                <CardSubtitle>{momentAgenda(props.start_date)} - {momentAgenda(props.end_date)}</CardSubtitle>
                <CardText>{props.content}</CardText>
            </CardBody>
        </Card>
    );
}

export default AgendaItem;