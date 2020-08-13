import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Badge } from 'reactstrap';
import LoadingSpinner from "../../LoadingSpinner";
import AuthService from "../../../services/auth.service";
import { useParams } from 'react-router-dom';
import EventServices from '../../../services/EventServices';
import moment from 'moment'
import { Link } from 'react-router-dom'

const AdminEventRegistration = (props) => {
    const [auth, setAuth] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [registrant, setRegistrant] = useState([])
    const { id } = useParams();
    let topContainer = document.getElementById("top-container")
    
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setIsLoading(true)
        if (user) {
            setAuth(user);
            retrieveRegistration(id)
            setIsLoading(false)
        }
    }, [id])

    const retrieveRegistration = (id) => {
        EventServices.AdminGetAllByEvent(id).then(
            (response) => {
                console.log(response.data)
                //topContainer.scrollIntoView()
                setRegistrant(response.data)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(_content)
            }
        )
    }
    
    return (
        <Container id="top-container">
            {auth ? (
                <div>
                    <Row>
                        <Col>
                            <h4>Admin Event</h4>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Id</th>
                                        <th>Event</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Confirmation</th>
                                        <th>Date confirmation</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrant && registrant.map((value, key) => (
                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>{value.id}</td>
                                            <td>{value.event.title}</td>
                                            <td>{value.user.name}</td>
                                            <td>{value.user.email}</td>
                                            <td>{value.is_confirmation ? `Yes` : `No`}</td>
                                            <td>{value.confirmation_date ? moment(value.confirmation_date).format('DD-MM-YYYY') : null}</td>
                                            <td>
                                                <Link to={`/admin/registrationEvent/detail/${value.id}`}>
                                                    <Badge color="warning" pill><i className="fas fa-search"></i> Show</Badge>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                        </Col>
                    </Row>
                </div>
            ) : (
                <Row>
                    <Col>
                        <h4>UnAuthorized!</h4>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default AdminEventRegistration;