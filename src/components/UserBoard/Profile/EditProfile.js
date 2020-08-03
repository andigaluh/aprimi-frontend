import React, { useState, useEffect, useContext, useRef } from "react"
import { UserContext } from "../../../UserContext"
import UserService from "../../../services/UserService";
import CompanyService from "../../../services/CompanyServices";
import ValidForm from "react-validation/build/form";
import ValidInput from "react-validation/build/input";
import ValidSelect from "react-validation/build/select";
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

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const EditProfile = () => {
    const {userLogin, setUserLogin} = useContext(UserContext)
    const form = useRef();
    const checkBtn = useRef();

    const [currentCompany, setCurrentCompany] = useState([]);
    const [userId, setUserId] = useState(userLogin.id);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [companyId, setCompanyId] = useState(1);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [roles,setRoles] = useState(userLogin.roles)
    const [accessToken, setAccessToken] = useState(userLogin.accessToken)
    
    useEffect(() => {
      User();
      Company();
    }, [userLogin.id]);

    const User = () => {
      UserService.getByMe().then(
        (response) => {
          setUsername(response.data.name)
          setEmail(response.data.email)
          setCompanyId(response.data.company_id);
          setUserId(response.data.id)
          console.log(response.data);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          console.log(_content);
          //window.location.replace("/login");
        }
      );
    };

    const Company = () => {
      CompanyService.getAllForPublic().then(
        (response) => {
          const { items } = response.data;
          setCurrentCompany(items);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setCurrentCompany(_content);
          console.log(_content);
        }
      );
    };

    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };

    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };

    const onChangeCompanyId = (e) => {
      const CompanyId = e.target.value;
      setCompanyId(CompanyId);
    };

    const handleUpdate = (e) => {
      e.preventDefault();

      setMessage("");
      setSuccessful(false);

      form.current.validateAll();

      if (checkBtn.current.context._errors.length === 0) 
      {
        console.log("process");
        
        var data = {
          name: username,
          email,
          company_id: companyId,
        };

        UserService.updateByMe(data)
          .then(
            (response) => {
              setMessage(response.data.message);
              setSuccessful(true);
              setUsername(username)
              setEmail(email)
              setCompanyId(companyId);
              setUserLogin({name: username, email: email, id: userId, roles: roles, accessToken: accessToken})
              localStorage.setItem("user", JSON.stringify({
                id: userId,
                name: username,
                email: email,
                roles: roles,
                accessToken: accessToken
              }));
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
          .catch((error) => {
            console.log(`catch: ${error}`);
          });
      } else {
        console.log("no process");
      }
    };

    return (
      <Container>
        <Row>
          <Col xs="12">
            <h4>Edit Profile</h4>
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
                    <Label for="username">Name</Label>
                    <ValidInput
                      type="text"
                      name="username"
                      value={username}
                      className="form-control"
                      onChange={onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <ValidInput
                      type="text"
                      name="email"
                      value={email}
                      className="form-control"
                      onChange={onChangeEmail}
                      validations={[required, validEmail]}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="company_id">Company</Label>
                    <ValidSelect
                      name="company_id"
                      value={companyId}
                      className="form-control"
                      validation={[required]}
                      onChange={onChangeCompanyId}
                    >
                      {currentCompany ? (
                        currentCompany.map((v, k) => (
                          <option value={v.id}>{v.name}</option>
                        ))
                      ) : (
                        <option value="999">No company available</option>
                      )}
                    </ValidSelect>
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

export default EditProfile