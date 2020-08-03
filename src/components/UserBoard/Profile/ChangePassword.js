import React, { useRef, useState, useContext } from "react"
import { Col, FormGroup, Label, Container, Row, Alert } from "reactstrap";
import ValidForm from "react-validation/build/form";
import ValidInput from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { UserContext } from "../../../UserContext";
import UserService from "../../../services/UserService"

const required = (value) => {
  if (!value) {
    return (
        <Alert color="danger">
            This field is required!
        </Alert>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
        <Alert color="danger">
            The password must be between 6 and 40 characters.
        </Alert>
    );
  }
};

const password = (value, props, components) => {
  if (value !== components['confirm'][0].value) { 
    return (
      <Alert color="danger">
        The password are not equal.
      </Alert>
    );
  }
}

const ChangePassword = () => {
    const { userLogin } = useContext(UserContext);
    const form = useRef();
    const checkBtn = useRef();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const onChangeOldPassword = (e) => {
        const oldPassword = e.target.value;
        setOldPassword(oldPassword);
    }

    const onChangeNewPassword = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
    };

    const onChangeConfirmNewPassword = (e) => {
      const confirmNewPassword = e.target.value;
      setConfirmNewPassword(confirmNewPassword);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
          var dataOldPassword = {
              oldPassword: oldPassword
          }
          UserService.checkPassword(dataOldPassword).then(
              (response) => {
                if (response.data.status === 1)
                {
                    UserService.updatePasswordByMe({password: newPassword}).then(
                        (response) => {
                            setMessage(response.data.message)
                            setSuccessful(true);
                        },
                        (error) => {
                            const _content =
                              (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                              error.message ||
                              error.toString();
                            setMessage(_content);
                        }
                    )
                }
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
        } else {
          console.log(`no process`);
        }
    };

    return (
      <Container>
        <Row>
          <Col>
            <h4>Change Password</h4>
            {message && (
              <FormGroup>
                <Alert color={successful ? `success` : `danger`}>
                  {message}
                </Alert>
              </FormGroup>
            )}
            <ValidForm onSubmit={handleUpdate} ref={form}>
              {!successful && (
                <div>
                  <FormGroup>
                    <Label for="oldPassword">Current Password</Label>
                    <ValidInput
                      type="password"
                      name="oldPassword"
                      value={oldPassword}
                      className="form-control"
                      onChange={onChangeOldPassword}
                      validations={[required, vpassword]}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="newPassword">New Password</Label>
                    <ValidInput
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      className="form-control"
                      onChange={onChangeNewPassword}
                      validations={[required, vpassword, password]}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirmNewPassword">Confirm New Password</Label>
                    <ValidInput
                      type="password"
                      name="confirm"
                      value={confirmNewPassword}
                      className="form-control"
                      onChange={onChangeConfirmNewPassword}
                      validations={[required, vpassword]}
                    />
                  </FormGroup>
                  <FormGroup className="text-right">
                    <button className="color-two button">Update</button>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  </FormGroup>
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </div>
              )}
            </ValidForm>
          </Col>
        </Row>
      </Container>
    );
}

export default ChangePassword