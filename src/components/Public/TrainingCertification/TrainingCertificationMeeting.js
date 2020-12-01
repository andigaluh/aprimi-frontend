import React, { useState, useEffect, useRef } from "react"
import {
    Link,
    useParams,
} from "react-router-dom";
import moment from "moment"
import ValidForm from "react-validation/build/form";
import ValidInput from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import {
    Col,
    FormGroup,
    Label,
    Container,
    Row,
    Alert,
    UncontrolledAlert
} from "reactstrap";
import EventServices from "../../../services/EventServices";
import AuthService from "../../../services/auth.service"

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const TrainingCertificationMeeting = (props) => {
    let { eventId, eventTitle } = useParams();
    const form = useRef();
    const checkBtn = useRef();

    const [reportName, setReportName] = useState("");
    const [reportJob, setReportJob] = useState("");
    const [reportEmail, setReportEmail] = useState("");
    const [reportPhone, setReportPhone] = useState("");
    const [reportAddress, setReportAddress] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const element = document.getElementById("top-container");
    const [currentAuth, setCurrentAuth] = useState({})
    
    useEffect(() => {
        const auth = AuthService.getCurrentUser()
        if (auth) {
            setCurrentAuth(auth)
        }
        window.scrollTo(0, 500)
    },[eventId])

    
    const onChangeReportName = (e) => {
        const v = e.target.value
        setReportName(v)
    }

    const onChangeReportEmail = (e) => {
        const v = e.target.value
        setReportEmail(v)
    }

    const onChangeReportPhone = (e) => {
        const v = e.target.value
        setReportPhone(v)
    }

    const onChangeReportJob = (e) => {
        const v = e.target.value
        setReportJob(v)
    }

    const onChangeReportAddress = (e) => {
        const v = e.target.value
        setReportAddress(v)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        EventServices.myRegistrationByEventUser(eventId).then(
            (response) => {
                const countRow = response.data.count;
                if (countRow > 0) {
                    element.scrollIntoView()
                    setMessage(`Your account already register for this event!!`);
                } else {
                    form.current.validateAll();
                    if (checkBtn.current.context._errors.length === 0) {
                        console.log("process");
                        var data = {
                            invoiced_to: 1,
                            ww_id: 9999,
                            report_name: currentAuth.name,
                            report_job: currentAuth.title,
                            report_email: currentAuth.email,
                            report_phone: currentAuth.phone,
                            report_address: reportAddress,
                            invoice_name: "empty",
                            invoice_email: "empty@aprimi.org",
                            invoice_phone: "999999",
                            invoice_fax: "999999",
                            invoice_notes: "empty"
                        }
                        EventServices.register(eventId, data).then(
                            (response) => {
                                element.scrollIntoView()
                                setMessage("Your data has been successfully submited. Thank You");
                                setSuccessful(true);
                            },
                            (error) => {
                                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                                element.scrollIntoView()
                                setMessage(resMessage);
                                setSuccessful(false);
                            }
                        )
                    } 
                }
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
            }
        )

        
    }
    
    return (
        <div className="blog-content" id="top-container">
                <div className="section-title">
                    <div>
                        <h3><div dangerouslySetInnerHTML={{ __html: props.headline }}></div></h3>
                    </div>
                    <div className="course-viewer">
                        <ul>
                            <li><i className="fas fa-user"></i> {props.createdUser}</li>
                            <li>
                                <i className="fas fa-calendar"></i>
                                {moment(props.date_event).format("D MMM, YYYY")}
                            </li>
                            <li>
                                <i className="fas fa-search-location"></i> {props.location}
                            </li>
                        </ul>
                    </div>
                </div>
            <Container>
                    <Row>
                        <Col xs="12" >
                            <h4>FORM REGISTRATION</h4>
                            {message && (
                                <FormGroup>
                                    <UncontrolledAlert color={successful ? `success` : `danger`}>
                                        {message}
                                    </UncontrolledAlert>
                                    {successful && (
                                        <div>
                                            <hr />
                                            <div className="text-right">
                                                {/* <Link to={`/trainingcertification/detail/${eventId}/${eventTitle}`}>
                                                    <button className="color button">Go to training certification</button>
                                                </Link>
                                                <Link to={`/user/trainingCertificationHistory`}>
                                                    <button className="color button">Go to payment confirmation</button>
                                                </Link> */}
                                            </div>
                                        </div>
                                    )}
                                </FormGroup>
                            )}
                            <ValidForm onSubmit={handleRegister} ref={form}>
                                {!successful && (
                                    <div>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                        <Label>Name : </Label>
                                                        <ValidInput
                                                            type="text"
                                                            name="reportName"
                                                            value={currentAuth.name}
                                                            className="form-control"
                                                            onChange={onChangeReportName}
                                                            validations={[required]}
                                                            placeholder="Name"
                                                            readonly="true"
                                                        />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label>Title / Position : </Label>
                                                    <ValidInput
                                                        type="text"
                                                        name="reportJob"
                                                        value={currentAuth.title}
                                                        className="form-control"
                                                        onChange={onChangeReportJob}
                                                        validations={[required]}
                                                        placeholder="Title / position"
                                                        readonly="true"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label>Email : </Label>
                                                    <ValidInput
                                                        type="email"
                                                        name="reportEmail"
                                                        value={currentAuth.email}
                                                        className="form-control"
                                                        onChange={onChangeReportEmail}
                                                        validations={[required, validEmail]}
                                                        placeholder="Email"
                                                        readonly="true"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label>Mobile / Phone : </Label>
                                                    <ValidInput
                                                        type="text"
                                                        name="reportPhone"
                                                        value={currentAuth.phone}
                                                        className="form-control"
                                                        onChange={onChangeReportPhone}
                                                        validations={[required]}
                                                        placeholder="Phone"
                                                        readonly="true"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label>Company : </Label>
                                                    <ValidInput
                                                        type="text"
                                                        name="reportAddress"
                                                        value={reportAddress}
                                                        className="form-control"
                                                        onChange={onChangeReportAddress}
                                                        validations={[required]}
                                                        placeholder="Your company"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        
                                        <FormGroup className="text-right">
                                            <Link to={`/trainingcertification/detail/${eventId}/${eventTitle}`}>
                                                <button className="color button">Back</button>
                                            </Link>&nbsp;
                                            <button className="color-two button">Submit</button>
                                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                        </FormGroup>
                                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                    </div>
                                )}
                            </ValidForm>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}

export default TrainingCertificationMeeting