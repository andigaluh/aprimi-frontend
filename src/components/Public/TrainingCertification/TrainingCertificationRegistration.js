import React, { useState, useEffect, useRef } from "react"
import {
    Link,
    useParams,
} from "react-router-dom";
import moment from "moment"
import ValidForm from "react-validation/build/form";
import ValidInput from "react-validation/build/input";
import ValidTextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import {
    Col,
    FormGroup,
    Label,
    Container,
    Row,
    Alert
} from "reactstrap";
import EventServices from "../../../services/EventServices";

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

const TrainingCertificationRegistration = (props) => {
    let { eventId, eventTitle } = useParams();
    const form = useRef();
    const checkBtn = useRef();

    const [invoicedTo, setInvoicedTo] = useState("");
    const [wwId, setWwId] = useState("");
    const [reportName, setReportName] = useState("");
    const [reportDate, setReportDate] = useState("");
    const [reportJob, setReportJob] = useState("");
    const [reportEmail, setReportEmail] = useState("");
    const [reportFax, setReportFax] = useState("");
    const [reportAddress, setReportAddress] = useState("");
    const [invoiceName, setInvoiceName] = useState("");
    const [invoiceEmail, setInvoiceEmail] = useState("");
    const [invoicePhone, setInvoicePhone] = useState("");
    const [invoiceFax, setInvoiceFax] = useState("");
    const [invoiceNotes, setInvoiceNotes] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        window.scrollTo(0, 450)
    },[eventId])

    const onChangeWwId = (e) => {
        const wwId = e.target.value
        setWwId(wwId)
    }

    const onChangeReportName = (e) => {
        const v = e.target.value
        setReportName(v)
    }

    const onChangeReportEmail = (e) => {
        const v = e.target.value
        setReportEmail(v)
    }

    const onChangeReportJob = (e) => {
        const v = e.target.value
        setReportJob(v)
    }

    const onChangeReportDate = (e) => {
        const v = e.target.value
        setReportDate(v)
    }

    const onChangeReportFax = (e) => {
        const v = e.target.value
        setReportFax(v)
    }

    const onChangeReportAddress = (e) => {
        const v = e.target.value
        setReportAddress(v)
    }

    const onChangeInvoiceName = (e) => {
        const v = e.target.value
        setInvoiceName(v)
    }

    const onChangeInvoiceEmail = (e) => {
        const v = e.target.value
        setInvoiceEmail(v)
    }

    const onChangeInvoicePhone = (e) => {
        const v = e.target.value
        setInvoicePhone(v)
    }

    const onChangeInvoiceFax = (e) => {
        const v = e.target.value
        setInvoiceFax(v)
    }

    const onChangeInvoiceNotes = (e) => {
        const v = e.target.value
        setInvoiceNotes(v)
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            console.log("process");
            var data = {
                invoiced_to: 1,
                ww_id: wwId,
                report_name: reportName,
                report_date: reportDate,
                report_job: reportJob,
                report_email: reportEmail,
                report_fax: reportFax,
                report_address: reportAddress,
                invoice_name: invoiceName,
                invoice_email: invoiceEmail,
                invoice_phone: invoicePhone,
                invoice_fax: invoiceFax,
                invoice_notes: invoiceNotes
            }
            console.log(data)
            EventServices.register(eventId, data).then(
                (response) => {
                    console.log(response.data)
                    setMessage("Your data has been successfully submited. Please go to your page to confirm payment. Thank You");
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    console.log(`error: ${resMessage}`);
                    setSuccessful(false);
                }
            )
        } else {
            console.log("no process");
        }
    }
    
    return (
            <div className="blog-content ">
                <div className="section-title">
                    <div>
                        <h3>{props.headline}</h3>
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
                        <Col xs="12">
                            <h4>FORM REGISTRATION</h4>
                            {message && (
                                <FormGroup>
                                    <Alert color={successful ? `success` : `danger`}>
                                        {message}
                                    </Alert>
                                    {successful && (
                                        <div>
                                            <hr />
                                            <div className="text-right">
                                                <Link to={`/trainingcertification/detail/${eventId}/${eventTitle}`}>
                                                    <button className="color button">Go to training certification</button>
                                                </Link>
                                                <Link to={`/trainingcertification/detail/${eventId}/${eventTitle}`}>
                                                    <button className="color button">Go to payment confirmation</button>
                                                </Link>
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
                                                    <Label for="wwId">WW ID</Label>
                                                    <ValidInput
                                                        type="text"
                                                        name="wwId"
                                                        value={wwId}
                                                        className="form-control"
                                                        onChange={onChangeWwId}
                                                        validations={[required]}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label>REPORT TO :</Label>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                        <ValidInput
                                                            type="text"
                                                            name="reportName"
                                                            value={reportName}
                                                            className="form-control"
                                                            onChange={onChangeReportName}
                                                            validations={[required]}
                                                            placeholder="Name"
                                                        />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ValidInput
                                                        type="email"
                                                        name="reportEmail"
                                                        value={reportEmail}
                                                        className="form-control"
                                                        onChange={onChangeReportEmail}
                                                        validations={[required, validEmail]}
                                                        placeholder="Email"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ValidInput
                                                        type="text"
                                                        name="reportJob"
                                                        value={reportJob}
                                                        className="form-control"
                                                        onChange={onChangeReportJob}
                                                        validations={[required]}
                                                        placeholder="Job position"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ValidInput
                                                        type="date"
                                                        name="reportDate"
                                                        value={reportDate}
                                                        className="form-control"
                                                        onChange={onChangeReportDate}
                                                        validations={[required]}
                                                        placeholder="Date"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ValidInput
                                                        type="text"
                                                        name="reportFax"
                                                        value={reportFax}
                                                        className="form-control"
                                                        onChange={onChangeReportFax}
                                                        validations={[required]}
                                                        placeholder="Fax"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ValidInput
                                                        type="text"
                                                        name="reportAddress"
                                                        value={reportAddress}
                                                        className="form-control"
                                                        onChange={onChangeReportAddress}
                                                        validations={[required]}
                                                        placeholder="Address"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label>Invoice To :</Label>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ValidInput
                                                        type="text"
                                                        name="invoiceName"
                                                        value={invoiceName}
                                                        className="form-control"
                                                        onChange={onChangeInvoiceName}
                                                        validations={[required]}
                                                        placeholder="Name"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ValidInput
                                                        type="email"
                                                        name="invoiceEmail"
                                                        value={invoiceEmail}
                                                        className="form-control"
                                                        onChange={onChangeInvoiceEmail}
                                                        validations={[required, validEmail]}
                                                        placeholder="Email"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ValidInput
                                                        type="text"
                                                        name="invoicePhone"
                                                        value={invoicePhone}
                                                        className="form-control"
                                                        onChange={onChangeInvoicePhone}
                                                        validations={[required]}
                                                        placeholder="Phone"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <ValidInput
                                                        type="text"
                                                        name="invoiceFax"
                                                        value={invoiceFax}
                                                        className="form-control"
                                                        onChange={onChangeInvoiceFax}
                                                        validations={[required]}
                                                        placeholder="Fax"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <ValidTextArea 
                                                        name="invoiceNotes"
                                                        value={invoiceNotes}
                                                        className="form-control"
                                                        onChange={onChangeInvoiceNotes}
                                                        validations={[required]}
                                                        placeholder="Notes"
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

export default TrainingCertificationRegistration