import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Container, Row, Col, FormGroup } from 'reactstrap'
import LoginHeader from './LoginHeader';
import { isEmail } from "validator";
import UserService from "../../../services/UserService";

const required = (value) => {
    if (!value) {
        return (
            <p className="text-danger">
                This field is required!
            </p>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <p className="text-danger">
                This is not a valid email.
            </p>
        );
    }
};

function ForgetPassword(props) {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const onChangeUsername = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);
        setIsLoading(true)

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            console.log("process");
            var data = {
                email: email
            }
            UserService.checkEmail(data).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    setIsLoading(false);
                    console.log(response.data.status)
                }, (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                    setIsLoading(false);
                    setSuccessful(false);
                }).catch((error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                    setIsLoading(false);
                    setSuccessful(false);
                })
        } else {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <LoginHeader />
            <div id="login" className="wrap-bg">
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful
                                                ? "alert alert-success text-center"
                                                : "alert alert-danger text-center"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}

                            <Form onSubmit={handleSubmit} ref={form}>
                                {!successful && (
                                    <div>
                                        <h4>Please input your email, we will send link through your email</h4>
                                        <hr />
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                className="input-text email-field form-control"
                                                name="email"
                                                value={email}
                                                onChange={onChangeUsername}
                                                validations={[required, validEmail]}
                                                placeholder="Email"
                                                title="Your Email"
                                            />
                                        </FormGroup>
                                        <FormGroup className="text-center">
                                            <button
                                                className="color-two button"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <span>
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                        Please wait
                                                    </span>
                                                ) : (
                                                        <span>Submit</span>
                                                    )}
                                            </button>
                                        </FormGroup>
                                    </div>
                                )}
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </main>
    );
}

export default ForgetPassword;