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

const EditProfile = () => {
    const {userLogin, setUserLogin} = useContext(UserContext)
    const form = useRef();
    const checkBtn = useRef();

    const [currentCompany, setCurrentCompany] = useState([]);
    const [userId, setUserId] = useState(userLogin.id);
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
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
          setTitle(response.data.title)
          setEmail(response.data.email)
          setPhone(response.data.phone)
          setCompanyId(response.data.company_id);
          setUserId(response.data.id)
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

    const onChangeTitle = (e) => {
      const title = e.target.value;
      setTitle(title);
    };

    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };

    const onChangePhone = (e) => {
      const phone = e.target.value;
      setPhone(phone);
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
          title,
          email,
          phone,
          company_id: companyId,
        };

        UserService.updateByMe(data)
          .then(
            (response) => {
              setMessage(response.data.message);
              setSuccessful(true);
              setUsername(username)
              setTitle(title)
              setPhone(phone)
              setEmail(email)
              setCompanyId(companyId);
              setUserLogin({name: username, email: email, id: userId, roles: roles, accessToken: accessToken, title: title, phone: phone})
              localStorage.setItem("user", JSON.stringify({
                id: userId,
                name: username,
                email: email,
                title: title,
                phone: phone,
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
                    <Label for="title">Title/Position</Label>
                    <ValidInput
                      type="text"
                      name="title"
                      value={title}
                      className="form-control"
                      onChange={onChangeTitle}
                      validations={[required]}
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
                    <Label for="phone">Mobile/Phone</Label>
                    <ValidInput
                      type="text"
                      name="phone"
                      value={phone}
                      className="form-control"
                      onChange={onChangePhone}
                      validations={[required]}
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

export default EditProfile