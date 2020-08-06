import React, { useState, useEffect } from "react";
import CompanyService from "../../../services/CompanyServices";
import AuthService from "../../../services/auth.service";
import { Container, Row, Col, FormGroup, Label, UncontrolledAlert } from "reactstrap"

const AdminMembershipAdd = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

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
    };

    const [currentCompany,setCurrentCompany] = useState(initialCompanyState);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
      const user = AuthService.getCurrentUser();

      if (user) {
        setCurrentUser(user);
      }
    }, []);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setCurrentCompany({ ...currentCompany, [name]: value });
    };

    const newCompany = () => {
      setCurrentCompany(initialCompanyState);
      setSubmitted(false);
    };

    const saveCompany = () => {
      setIsLoading(true)
      var data = {
        name: currentCompany.name,
        address: currentCompany.address,
        phone: currentCompany.phone,
        fax: currentCompany.fax,
        contact_person_name: currentCompany.contact_person_name,
        contact_person_title: currentCompany.contact_person_title,
        contact_person_phone: currentCompany.contact_person_phone,
        contact_person_email: currentCompany.contact_person_email,
        authorized_name: currentCompany.authorized_name,
        authorized_title: currentCompany.authorized_title,
        year_registered: currentCompany.year_registered,
        created_user_id: currentUser.id,
        updated_user_id: currentUser.id,
      };

      //console.log(rolesArr);
      CompanyService.create(data).then(
        (response) => {
          setCurrentCompany({
            id: response.data.id,
            name: response.data.name,
            address: response.data.address,
            phone: response.data.phone,
            fax: response.data.fax,
            contact_person_name: response.data.contact_person_name,
            contact_person_title: response.data.contact_person_title,
            contact_person_phone: response.data.contact_person_phone,
            contact_person_email: response.data.contact_person_email,
            authorized_name: response.data.authorized_name,
            authorized_title: response.data.authorized_title,
            year_registered: response.data.year_registered,
            created_user_id: response.data.created_user_id,
            updated_user_id: response.data.updated_user_id,
          });
          setSubmitted(true);
          setIsLoading(false)
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(_content);
          setIsLoading(false)
          window.scrollTo(0, 500)
        }
      );
    };
    
    return (
      <Container>
      <Row>
        <Col>
          <div className="submit-form">
            {submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn-custom btn-success" onClick={newCompany}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <h4>Add Membership</h4>
                <hr/>
                {message && (
                  <UncontrolledAlert color="danger">{message}</UncontrolledAlert>
                )}
                <FormGroup>
                  <Label for="name">Name</Label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={currentCompany.name}
                    onChange={handleInputChange}
                    name="name"
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
                  <Label for="contact_person_name">
                    Contact Person Name
                  </Label>
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
                <FormGroup>
                  <button onClick={saveCompany} className="btn-custom btn-success" disabled={isLoading}>
                    {isLoading ? ( <span>Please Wait</span> ) : (<span>Submit</span>)} 
                  </button>
                </FormGroup>

                
              </div>
            )}
          </div>
          </Col>
        </Row>
      </Container>
    );
}

export default AdminMembershipAdd
