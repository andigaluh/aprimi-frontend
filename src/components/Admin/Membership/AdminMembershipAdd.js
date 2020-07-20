import React, { useState, useEffect } from "react";
import CompanyService from "../../../services/CompanyServices";
import AuthService from "../../../services/auth.service";

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
          console.log(response.data);
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
    
    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="submit-form">
            {submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={newCompany}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <h4>Add Membership</h4>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={currentCompany.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    required
                    value={currentCompany.address}
                    onChange={handleInputChange}
                    name="address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    required
                    value={currentCompany.phone}
                    onChange={handleInputChange}
                    name="phone"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fax">Fax</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fax"
                    required
                    value={currentCompany.fax}
                    onChange={handleInputChange}
                    name="fax"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_person_name">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact_person_name"
                    required
                    value={currentCompany.contact_person_name}
                    onChange={handleInputChange}
                    name="contact_person_name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_person_title">
                    Contact Person Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact_person_title"
                    required
                    value={currentCompany.contact_person_title}
                    onChange={handleInputChange}
                    name="contact_person_title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_person_phone">
                    Contact Person Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact_person_phone"
                    required
                    value={currentCompany.contact_person_phone}
                    onChange={handleInputChange}
                    name="contact_person_phone"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_person_email">
                    Contact Person Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact_person_email"
                    required
                    value={currentCompany.contact_person_email}
                    onChange={handleInputChange}
                    name="contact_person_email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="authorized_name">Authorized Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="authorized_name"
                    required
                    value={currentCompany.authorized_name}
                    onChange={handleInputChange}
                    name="authorized_name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="authorized_title">Authorized Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="authorized_title"
                    required
                    value={currentCompany.authorized_title}
                    onChange={handleInputChange}
                    name="authorized_title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year_registered">Year of Register</label>
                  <input
                    type="text"
                    className="form-control"
                    id="year_registered"
                    required
                    value={currentCompany.year_registered}
                    onChange={handleInputChange}
                    name="year_registered"
                  />
                </div>

                <button onClick={saveCompany} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default AdminMembershipAdd
