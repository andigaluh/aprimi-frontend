import React, { useState, useEffect } from "react";
import CompanyService from "../../../services/CompanyServices";
import AuthService from "../../../services/auth.service";

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
      is_active: false
    };
    const [currentCompany, setCurrentCompany] = useState(initialCompanyState);
    const [message, setMessage] = useState("");

    const company = id => {
        CompanyService.get(id).then(
            (response) => {
                setCurrentCompany(response.data);
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
        )
    };

    useEffect(() => {
        const userLogin = AuthService.getCurrentUser();

        if (userLogin) {
            setAuth(userLogin);
            company(props.match.params.id);
        }
    },[props.match.params.id]);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setCurrentCompany({ ...currentCompany, [name]: value });
    };

    const Update = () => {
      CompanyService.update(currentCompany.id, currentCompany)
        .then(
          (response) => {
            console.log(response.data);
            setMessage("The Member was updated successfully!");
          },
          (error) => {
            console.log(`error disini ${error}`);
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
      <div className="col-md-12">
        {auth ? (
          <div>
            <h4>Detail Membership</h4>
            <p>{message}</p>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={currentCompany.name}
                  onChange={handleInputChange}
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
                <label htmlFor="contact_person_name">Contact Person Name</label>
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
            </form>
            <button
              type="submit"
              className="badge badge-success mr-2"
              onClick={Update}
            >
              Update
            </button>
            {currentCompany.is_active ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => UpdateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => UpdateStatus(true)}
              >
                Publish
              </button>
            )}

            <button className="badge badge-danger mr-2" onClick={Delete}>
              Delete
            </button>
          </div>
        ) : (
          <div>
            <h4>Unauthorized</h4>
          </div>
        )}
      </div>
    );
} 

export default AdminMembershipDetail;

