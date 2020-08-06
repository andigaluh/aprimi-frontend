import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../../services/auth.service";
import RegisterHeader from "./RegisterHeader";
import { Container, Row, Col, FormGroup, Label } from 'reactstrap'
import {Link} from 'react-router-dom'

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

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <p className="text-danger">
        The username must be between 3 and 20 characters.
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

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    setIsLoading(true)

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      console.log("process")
      var data = {
        company_id: 1,
        name: username,
        email: email,
        password: password,
        roles: ["user"]
      }
      AuthService.register(data).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setIsLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setIsLoading(false);
          setSuccessful(false);
        }
      ).catch((error) => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <RegisterHeader />
      <div id="register" className="wrap-bg">
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
              <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                    <h4>Please fill in</h4>
                    <hr />
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
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
                          <span>Register</span>
                        )}
                      </button>
                    </FormGroup>
                    <FormGroup className="text-center">
                      <p>
                        Have already an account ?{" "}
                        <Link to={"/login"} className="text-info">
                          LOGIN HERE
                        </Link>
                      </p>
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
};

export default Register;
