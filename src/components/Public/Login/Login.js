import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
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
          }, 1000);
          
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

      <div className="lernen_banner large bg-contact">
        <div className="container">
          <div className="row">
            <div className="lernen_banner_title">
              <h1>Login</h1>
            </div>
          </div>
        </div>
      </div>

      <div id="login" className="wrap-bg">
        <div className="container">
          <div className="row">
              <div className="col-md-12 col-lg-12">
              
              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}

              <Form onSubmit={handleLogin} ref={form} className="form" id="login">
                  <div className="form-group">
                    <Input
                      type="text"
                      className="input-text email-field form-control"
                      name="email"
                      value={email}
                      onChange={onChangeUsername}
                      validations={[required]}
                      placeholder="Username" 
                      title="Your Username"
                    />
                  </div>
                  <div className="form-group">
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
                  </div>
                  
                  <button className="color-two button" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>

                
                <CheckButton style={{ display: "none" }} ref={checkBtn} />

                </Form>
              </div>
            </div>
          </div>
        </div>
    
    
    </main>
  );
};

export default Login;
