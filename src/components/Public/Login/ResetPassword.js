import React, { useState, useRef } from "react";
import LoginHeader from './LoginHeader';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Container, Row, Col, FormGroup, Label } from 'reactstrap'
import { useParams, Link } from 'react-router-dom'
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

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <p className="text-danger">
                The password must be between 6 and 40 characters.
            </p>
        );
    }
};

const password = (value, props, components) => {
    if (value !== components['confirm'][0].value) {
        return (
            <p className="text-danger">
                The password are not equal.
            </p>
        );
    }
}

const ResetPassword = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()

    const onChangeNewPassword = (e) => {
        const password = e.target.value;
        setNewPassword(password);
    };

    const onChangeConfirmNewPassword = (e) => {
        const password = e.target.value;
        setConfirmNewPassword(password);
    };

    const handleReset = (e) => {
        e.preventDefault()
        const encEmail = id
        setMessage("");
        setSuccessful(false);
        setIsLoading(true)
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            UserService.checkEmailEnc(encEmail).then(
                (response) => {
                    const emailValid = response.data.content.email
                    var data = {
                        password: newPassword,
                        email: emailValid
                    }
                    UserService.updatePasswordByEmail(data).then(
                        (response) => {
                            setMessage(response.data.message)
                            setSuccessful(true)
                            setIsLoading(false)
                            setNewPassword("")
                            setConfirmNewPassword("")
                        }, (error) => {
                            const resMessage =
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString();
                            setMessage(resMessage)
                            setSuccessful(false)
                            setIsLoading(false)
                            setNewPassword("")
                            setConfirmNewPassword("")
                        })
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage)
                    setSuccessful(false)
                    setIsLoading(false)
                    setNewPassword("")
                    setConfirmNewPassword("")
                }
            )
        } else {
            setSuccessful(false)
            setIsLoading(false)
            setNewPassword("")
            setConfirmNewPassword("")
        }
    }

    return (
        <main>
            <LoginHeader />
            <div id="reset-password" className="wrap-bg">
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Form onSubmit={handleReset} ref={form}>
                                {message && (
                                    <FormGroup>
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
                                        {successful && (
                                            <div className="text-center">
                                                <Link to={"/login"}>
                                                    <button className="color-two button">
                                                        <span>Login</span>
                                                    </button>
                                                </Link>
                                            </div>
                                        )}
                                    </FormGroup>
                                )}
                                {!successful && (
                                    <div>
                                        <h4>Please input your new password</h4>
                                        <hr />
                                        <FormGroup>
                                            <Label for="newPassword">New Password</Label>
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="newPassword"
                                                value={newPassword}
                                                onChange={onChangeNewPassword}
                                                validations={[required, vpassword, password]}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="confirmPassword">Confirm New Password</Label>
                                            <Input
                                                type="password"
                                                name="confirm"
                                                value={confirmNewPassword}
                                                className="form-control"
                                                onChange={onChangeConfirmNewPassword}
                                                validations={[required, vpassword]}
                                            />
                                        </FormGroup>
                                        <FormGroup className="text-center">
                                            <button
                                                type="submit"
                                                className="color-two button"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <span>
                                                        <span className="spinner-border spinner-border-sm"></span>
                                            Please wait
                                                    </span>
                                                ) : (
                                                        <span>Change Password</span>
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

export default ResetPassword;