import React, { useRef, useState, useContext } from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import { isEmail } from "validator";
import { UserContext } from '../../../UserContext'
import ContactServices from '../../../services/ContactServices';

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

const Contact = (props) => {
    const { userLogin } = useContext(UserContext);
    const form = useRef();
    const checkBtn = useRef();
    const [inputName, setInputName] = useState(userLogin.name)
    const [inputEmail, setInputEmail] = useState(userLogin.email)
    const [inputSubject, setInputSubject] = useState("")
    const [inputMessage, setInputMessage] = useState("")
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    

    const onChangeName = (e) => {
        const v = e.target.value
        setInputName(v)
    }
    
    const onChangeEmail = (e) => {
        const v = e.target.value
        setInputEmail(v)
    }

    const onChangeSubject = (e) => {
        const v = e.target.value
        setInputSubject(v)
    }

    const onChangeMessage = (e) => {
        const v = e.target.value
        setInputMessage(v)
    }

    const handleContact = (e) => {
        e.preventDefault()

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            console.log("process")
            var data = {
                name: inputName,
                email: inputEmail,
                subject: inputSubject,
                message: inputMessage,
                is_read: 0
            }
            ContactServices.createMsg(data).then(
                (response) => {
                    console.log(response.data)
                    setMessage("Your data successfully submit");
                    setSuccessful(true);
                    console.log(`response: ${response.data}`)
                },
                (error) => {
                    const _content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    //setCurrentContent(_content);
                    setSuccessful(false)
                    setMessage(_content);
                    console.log(_content);
                }
            )
        } else {
            console.log("no process")
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Contact Form</h4>
                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <Form onSubmit={handleContact} ref={form}>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={inputName}
                                        onChange={onChangeName}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={inputEmail}
                                        onChange={onChangeEmail}
                                        validations={[required, validEmail]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        value={inputSubject}
                                        onChange={onChangeSubject}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Subject</label>
                                    <Textarea 
                                        className="form-control"
                                        name="message"
                                        value={inputMessage}
                                        onChange={onChangeMessage}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="color-two button">Submit</button>
                                </div>
                            </div>
                        )}


                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;