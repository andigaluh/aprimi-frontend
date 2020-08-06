import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Table
} from 'reactstrap'
import EventServices from '../../../services/EventServices';
import moment from 'moment'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../../LoadingSpinner';

const TrainingCertificationHistory = (props) => {
    const [myRegistration, setMyRegistration] = useState()
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            retrieveTrainingByMe()
            setIsLoading(false)
        }, 1000);
    },[])

    const retrieveTrainingByMe = () => {
        EventServices.myRegistration().then(
            (response) => {
                console.log(response.data)
                setMyRegistration(response.data)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                console.log(_content);
            }
        )
    }


    return (
        <Container>
            <Row>
                <Col>
                    <h4>Training Certification History</h4>
                    <hr />
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Event</th>
                                        <th>Date</th>
                                        <th>Conf. status</th>
                                        <th>Conf. date</th>
                                        <th>Conf. Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myRegistration && myRegistration.map((v, k) => (
                                        <tr scope="row">
                                            <th>{k + 1}</th>
                                            <th>{v.event.title}</th>
                                            <th>{moment(v.date_event).format("DD MMM YYYY")}</th>
                                            <th>
                                                {v.is_confirmation ? (
                                                    <span>Yes</span>
                                                ) : (
                                                        <span>No</span>
                                                    )}
                                            </th>
                                            <th>
                                                {v.confirmation_date ? (
                                                    moment(v.confirmation_date).format("DD MMM YYYY")
                                                ) : (
                                                        <span>-</span>
                                                    )}
                                            </th>
                                            <th>
                                                {v.confirmation_image ? (
                                                    <div>

                                                        <img
                                                            src={
                                                                process.env.REACT_APP_API + "/uploads/confirmation/thumbnail/" +
                                                                v.confirmation_image
                                                            }
                                                            width="100"
                                                            alt={v.event.title}
                                                        />

                                                    </div>
                                                ) : (
                                                        <span>No</span>
                                                    )}
                                            </th>
                                            <th>
                                                <Link to={`/user/TrainingCertificationConfirm/${v.id}/${v.event.title.split(/[&\/\\#,+()$~%.'":*?<>{}\s]/g).join('-').toLowerCase()}`}>
                                                    <button className="color button">Confirm</button>
                                                </Link>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                    )}
                    
                    
                </Col>
            </Row>
        </Container>
    );
}

export default TrainingCertificationHistory;