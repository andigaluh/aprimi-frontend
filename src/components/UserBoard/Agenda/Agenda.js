import React, {  useState, useEffect } from 'react';
import {
    Container, Row, Col
} from 'reactstrap'
import AgendaItem from './AgendaItem';
import AgendaServices from '../../../services/AgendaServices'

const Agenda = () => {
    const [currentAgenda, setCurrentAgenda] = useState([])

    useEffect(() => {
        retrieveAgenda()
    },[])

    const retrieveAgenda = () => {
        AgendaServices.getAgendaUser().then(
            (response) => {
                console.log(response.data)
                setCurrentAgenda(response.data)
            }
        )
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Agenda</h4>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col>  
                    {currentAgenda && currentAgenda.map((v,k) => (
                        <AgendaItem
                            iKey={k}
                            id={v.id}
                            title={v.title}
                            start_date={v.start_date}
                            end_date={v.end_date}
                            content={v.content}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default Agenda;