import React, { useState, useEffect } from "react";
import CompanyService from "../../../services/CompanyServices";
import AuthService from "../../../services/auth.service";
import { Container, Row, Col, FormGroup, Label, Alert } from 'reactstrap'

const AdminMembershipDetail = (props) => {
  const [auth, setAuth] = useState(undefined)
  const initialCompanyState = {
    id: null,
    name: "",
    address: "",
    phone: "",
    fax: "",
    contact_person_name: "",
    contact_person_title: "",
    contact_person_phone: "",
    authorized_name: "",
    authorized_title: "",
    year_registered: "",
    created_user_id: "",
    updated_user_id: "",
    is_active: false,
    confirmation_date: "",
    confirmation_file: "",
    confirmation_status: false
  };
  const [currentCompany, setCurrentCompany] = useState(initialCompanyState);
  const [message, setMessage] = useState("");

  const company = id => {
    CompanyService.get(id).then(
      (response) => {
        setCurrentCompany(response.data);
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
    )
  };

  useEffect(() => {
    const userLogin = AuthService.getCurrentUser();

    if (userLogin) {
      setAuth(userLogin);
      company(props.match.params.id);
    }
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCompany({ ...currentCompany, [name]: value });
  };

  const Update = () => {
    CompanyService.update(currentCompany.id, currentCompany)
      .then(
        (response) => {
          window.scrollTo(0, 500)
          setMessage(response.data.message);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((e) => {
        console.log(e);
      });
  };

  const UpdateStatus = (status) => {
    var data = {
      is_active: status,
    };

    CompanyService.update(currentCompany.id, data)
      .then((response) => {
        setCurrentCompany({ ...currentCompany, is_active: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Delete = () => {
    CompanyService.remove(currentCompany.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/admin/membership");
      })
      .catch((e) => {
        console.log(e);
      });
  };



  return (
    <Container>
      <Row>
        <Col>
          {auth ? (
            <div>
              <h4>Detail Membership</h4>
              <hr />
              {message && (
                <Alert color="success">{message}</Alert>
              )}
              <FormGroup>
                <Label for="name">Name</Label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={currentCompany.name}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="address">Address</Label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                  value={currentCompany.address}
                  onChange={handleInputChange}
                  name="address"
                />
              </FormGroup>

              <FormGroup>
                <Label for="phone">Phone</Label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  required
                  value={currentCompany.phone}
                  onChange={handleInputChange}
                  name="phone"
                />
              </FormGroup>

              <FormGroup>
                <Label for="fax">Fax</Label>
                <input
                  type="text"
                  className="form-control"
                  id="fax"
                  required
                  value={currentCompany.fax}
                  onChange={handleInputChange}
                  name="fax"
                />
              </FormGroup>

              <FormGroup>
                <Label for="contact_person_name">Contact Person Name</Label>
                <input
                  type="text"
                  className="form-control"
                  id="contact_person_name"
                  required
                  value={currentCompany.contact_person_name}
                  onChange={handleInputChange}
                  name="contact_person_name"
                />
              </FormGroup>

              <FormGroup>
                <Label for="contact_person_title">
                  Contact Person Title
                </Label>
                <input
                  type="text"
                  className="form-control"
                  id="contact_person_title"
                  required
                  value={currentCompany.contact_person_title}
                  onChange={handleInputChange}
                  name="contact_person_title"
                />
              </FormGroup>

              <FormGroup>
                <Label for="contact_person_phone">
                  Contact Person Phone
                </Label>
                <input
                  type="text"
                  className="form-control"
                  id="contact_person_phone"
                  required
                  value={currentCompany.contact_person_phone}
                  onChange={handleInputChange}
                  name="contact_person_phone"
                />
              </FormGroup>

              <FormGroup>
                <Label for="contact_person_email">
                  Contact Person Email
                </Label>
                <input
                  type="text"
                  className="form-control"
                  id="contact_person_email"
                  required
                  value={currentCompany.contact_person_email}
                  onChange={handleInputChange}
                  name="contact_person_email"
                />
              </FormGroup>

              <FormGroup>
                <Label for="authorized_name">Authorized Name</Label>
                <input
                  type="text"
                  className="form-control"
                  id="authorized_name"
                  required
                  value={currentCompany.authorized_name}
                  onChange={handleInputChange}
                  name="authorized_name"
                />
              </FormGroup>

              <FormGroup>
                <Label for="authorized_title">Authorized Title</Label>
                <input
                  type="text"
                  className="form-control"
                  id="authorized_title"
                  required
                  value={currentCompany.authorized_title}
                  onChange={handleInputChange}
                  name="authorized_title"
                />
              </FormGroup>

              <FormGroup>
                <Label for="year_registered">Year of Register</Label>
                <input
                  type="text"
                  className="form-control"
                  id="year_registered"
                  required
                  value={currentCompany.year_registered}
                  onChange={handleInputChange}
                  name="year_registered"
                />
              </FormGroup>

              {currentCompany.confirmation_status && (
              <FormGroup>
                <Label for="year_registered">Date confirmation</Label>
                <input
                  type="text"
                  className="form-control"
                  id="confirmation_date"
                  required
                  value={currentCompany.confirmation_date}
                  onChange={handleInputChange}
                  name="confirmation_date"
                  disabled="true"
                />
              </FormGroup>
              )}

              <FormGroup>
                <button
                  type="submit"
                  className="btn-custom btn-success mr-2"
                  onClick={Update}
                >
                  Update
                    </button>
                {currentCompany.is_active ? (
                  <button
                    className="btn-custom btn-primary mr-2"
                    onClick={() => UpdateStatus(false)}
                  >
                    UnPublish
                  </button>
                ) : (
                    <button
                      className="btn-custom btn-primary mr-2"
                      onClick={() => UpdateStatus(true)}
                    >
                      Publish
                    </button>
                  )}

                <button className="btn-custom btn-danger mr-2" onClick={Delete}>
                  Delete
                  </button>

                {currentCompany.confirmation_status && (
                  <a href={process.env.REACT_APP_API + "/uploads/membership/" + currentCompany.confirmation_file} target="__BLANK">
                    <button className="btn-custom btn-info mr-2">
                      <i className="fas fa-download"></i> Download confirmation
                    </button>
                  </a>

                )}
              </FormGroup>

            </div>
          ) : (
              <Row>
                <Col>
                  <h4>Unauthorized</h4>
                </Col>
              </Row>
            )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminMembershipDetail;

