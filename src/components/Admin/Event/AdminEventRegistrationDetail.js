import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Row, Col, FormGroup, Label } from 'reactstrap'
import AuthService from '../../../services/auth.service'
import EventServices from '../../../services/EventServices';
import moment from 'moment'

const AdminEventRegistrationDetail = (props) => {
    const { id } = useParams()
    const [registrant, setRegistrant] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [auth, setAuth] = useState({})
    const [message, setMessage] = useState("")

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setIsLoading(true)
        if (user) {
            setAuth(user);
            retrieveRegistration(id)
            setIsLoading(false)
            console.log(props)
        } 
    },[id])

    const retrieveRegistration = (id) => {
        EventServices.AdminGetRegistrationById(id).then(
            (response) => {
                console.log(response.data)
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

    const goBack = () => {
        props.history.goBack()
    }

    return (
        <Container>
            {auth ? (
                <div>
                    <Row>
                        <Col>
                            <h4>Event Registration Detail</h4>
                        </Col>
                    </Row>
                    <hr/>
                    {registrant && registrant.map((value, key) => (
                        <div>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="eventName">Event</Label>
                                        <input type="text" name="eventName" id="eventName" value={value.event.title} className="form-control" disabled="true"/>
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="eventPublish">Publish</Label>
                                        <input type="text" name="eventPublish" id="eventPublish" value={value.event.is_publish ? "Publish" : "Not Publish"} className="form-control" disabled="true" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="userName">Name</Label>
                                        <input type="text" name="userName" id="userName" value={value.user.name} className="form-control" disabled="true" />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="userEmail">Email</Label>
                                        <input type="text" name="userEmail" id="userEmail" value={value.user.email} className="form-control" disabled="true" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="wwId">WW ID</Label>
                                        <input type="text" name="wwId" id="wwId" value={value.ww_id} className="form-control" disabled="true" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col>
                                    <legend>Report To</legend>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="reportName">Name</Label>
                                                <input type="text" name="reportName" id="reportName" value={value.report_name} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="reportEmail">Email</Label>
                                                <input type="text" name="reportEmail" id="reportEmail" value={value.report_email} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="invoiceJob">Job</Label>
                                                <input type="text" name="invoiceJob" id="invoiceJob" value={value.report_job} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="reportFax">Fax</Label>
                                                <input type="text" name="reportFax" id="reportFax" value={value.report_fax} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="invoiceAddress">Address</Label>
                                                <input type="text" name="invoiceAddress" id="invoiceAddress" value={value.report_address} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="reportDate">Date</Label>
                                                <input type="text" name="reportDate" id="reportDate" value={moment(value.report_date).format("DD-MM-YYYY")} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col>
                                    <legend>Invoice</legend>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="invoiceName">Name</Label>
                                                <input type="text" name="invoiceName" id="invoiceName" value={value.invoice_name} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="invoiceEmail">Email</Label>
                                                <input type="text" name="invoiceEmail" id="invoiceEmail" value={value.invoice_email} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                        
                                    </Row>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="invoicePhone">Phone</Label>
                                                <input type="text" name="invoicePhone" id="invoicePhone" value={value.invoice_phone} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="invoiceFax">Fax</Label>
                                                <input type="text" name="invoiceFax" id="invoiceFax" value={value.invoice_fax} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="invoiceNotes">Notes</Label>
                                                <textarea name="invoiceNotes" id="invoiceNotes" value={value.invoice_notes} className="form-control" disabled="true" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="confirmation">Confirmation</Label>
                                        <input type="text" name="confirmation" id="confirmation" value={value.is_confirmation ? "Confirm" : "Not Confirm"} className="form-control" disabled="true" />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="confirmation_date">Date Confirmation</Label>
                                        <input type="text" name="confirmation_date" id="confirmation_date" value={moment(value.confirmation_date).format("DD-MM-YYYY")} className="form-control" disabled="true" />
                                    </FormGroup>
                                </Col>
                                {value.confirmation_image && (
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label for="confirmation_image">Image confirmation</Label>
                                            <br/>
                                            <img
                                                src={
                                                    process.env.REACT_APP_API + "/uploads/confirmation/thumbnail/" +
                                                    value.confirmation_image
                                                }
                                                alt={value.confirmation_image} className="img img-responsive"
                                            />
                                        </FormGroup>
                                    </Col>
                                )}
                            </Row>
                            <Row>
                                <Col className="text-right">
                                    <button className="button color" onClick={goBack}> Back </button>
                                </Col>
                            </Row>
                        </div>
                    ))}
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

export default AdminEventRegistrationDetail;