import React, { useState, useEffect }  from 'react';
import UserService from "../../../services/UserService";
import CompanyService from "../../../services/CompanyServices";
import RoleService from "../../../services/RoleServices";

const AdminUsersAdd = () => {
    const initialUserState = {
      id: null,
      name: "",
      email: "",
      company_id: 1,
      status: false
    };
    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);
    const [currentCompany, setcurrentCompany] = useState([]);
    const [currentRole, setcurrentRole] = useState([]);
    const [inputRole, setinputRole] = useState([]);

    useEffect(() => {
        retrieveCompany();
        retrieveRole();
    },[]) ;

    const retrieveCompany = () => {
        CompanyService.getAll().then(
            (response) => {
                const { items } = response.data;
                setcurrentCompany(items);
                console.log(response);
            },
            (error) => {
                const _content =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                setcurrentCompany(_content);
                console.log(`no data ${_content}`);
            }
        )
    }

    const retrieveRole = () => {
      RoleService.getAll().then(
        (response) => {
          setcurrentRole(response.data);
          //console.log(response.data);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setcurrentRole(_content);
        }
      );
    };

    const handleInputChange = (event) => {
      const { name, value, checked } = event.target;
      if (checked) {
          setinputRole({...inputRole, [name]:value});
      } 
     
      setUser({ ...user, [name]: value });
    };

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    }

    const saveUser = () => {
        var rolesArr = Object.values(inputRole).map(function (key) {
          return key;
        });

        var data = {
          name: user.name,
          email: user.email,
          password: user.password,
          company_id: user.company_id,
          roles: rolesArr,
        };
        
        //console.log(rolesArr);
        UserService.create(data).then(
            (response) => {
                setUser({
                  id: response.data.id,
                  name: response.data.name,
                  email: response.data.email,
                  password: response.data.password,
                  company_id: response.data.company_id,
                  roles: response.data.roles
                });
                setSubmitted(true);
                //console.log(response.data);
            },
            (error) => {
                const _content =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                setUser(_content);
                //console.log(_content);
            }
        )
    }

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="submit-form">
            {submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={newUser}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={user.name}
                    onChange={handleInputChange}
                    name="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={user.email}
                    onChange={handleInputChange}
                    name="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    required
                    value={user.password}
                    onChange={handleInputChange}
                    name="password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <select
                    value={user.company_id}
                    className="form-control"
                    id="company_id"
                    name="company_id"
                    onChange={handleInputChange}
                  >
                    {currentCompany &&
                      currentCompany.map((company, i) => (
                        <option value={company.id}>{company.name}</option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  {currentRole &&
                    currentRole.map((v, k) => (
                      <div>
                        <label htmlFor={`roles-${k}`}>
                          <input
                            className=""
                            type="checkbox"
                            name={`roles-${k}`}
                            id={`roles-${k}`}
                            value={v.name}
                            onChange={handleInputChange}
                          />{" "}
                          {v.name}
                        </label>
                      </div>
                    ))}
                </div>

                <button onClick={saveUser} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default AdminUsersAdd;
