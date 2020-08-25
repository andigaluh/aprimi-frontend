import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";
import LoginHeader from "./LoginHeader";
import { Container, Row, Col, FormGroup, Label } from "reactstrap"
import {Link} from "react-router-dom"

const required = (value) => {
  if (!value) {
    return (
      <p className="text-danger">
        This field is required!
      </p>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  

  const onChangeUsername = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          setTimeout(() => {
            props.history.push("/user");
            window.location.reload();
          }, 1500);
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
          console.log(resMessage)
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <main>
      <LoginHeader />

      <div id="login" className="wrap-bg">
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h4>Please fill in</h4>
              <hr />
              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}

              <Form
                onSubmit={handleLogin}
                ref={form}
                className="form"
                id="login"
              >
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="text"
                    className="input-text email-field form-control"
                    name="email"
                    value={email}
                    onChange={onChangeUsername}
                    validations={[required]}
                    placeholder="Email"
                    title="Your Email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    className="input-text form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                    placeholder="Password"
                    title="Your Password"
                  />
                </FormGroup>
                <FormGroup className="text-center">
                  <button className="color-two button" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </FormGroup>
                <FormGroup className="text-center">
                  <p>
                    Did not have an account ?{" "}
                    <Link to={"/register"} className="text-info">
                      REGISTER HERE
                    </Link>
                  </p>
                  <p>
                    Forget Password ? {" "}
                    <Link to={"/forget-password"} className="text-info">CLICK HERE</Link>
                  </p>
                </FormGroup>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default Login;
