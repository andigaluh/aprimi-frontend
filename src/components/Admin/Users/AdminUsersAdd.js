import React, { useState, useEffect }  from 'react';
import UserService from "../../../services/UserService";
import CompanyService from "../../../services/CompanyServices";
import RoleService from "../../../services/RoleServices";
import { Container, Row, Col, FormGroup, Label, UncontrolledAlert } from "reactstrap"

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
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
  

    useEffect(() => {
        retrieveCompany();
        retrieveRole();
    },[]) ;

    const retrieveCompany = () => {
        CompanyService.getAll().then(
            (response) => {
                const { items } = response.data;
                setcurrentCompany(items);
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
          console.log(inputRole)
      } else{
        const array = Object.values(inputRole);

        //console.log(array);

        const index = array.indexOf(value);
        if (index > -1) {
          array.splice(index, 1);
        }

        // array = [2, 9]
        console.log(array); 
        /* console.log(Object.values(inputRole).indexOf(name));
        setinputRole({...inputRole, [name]:value}); */
        
      } 
     
      
      setUser({ ...user, [name]: value });
      
    };

    const handleCheckboxChange = (event) => {
      const { name, value, checked } = event.target;
      if (checked) {
        setinputRole({ ...inputRole, [name]: value });
      } else {
        const array = Object.values(inputRole);
        const index = array.indexOf(value);
        if (index > -1) {
          array.splice(index, 1);
        }
        setinputRole(array)
      } 
    }

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    }

    const saveUser = () => {
        setIsLoading(true)
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
        
        UserService.create(data).then(
            (response) => {
              setTimeout(() => {
                setUser({
                  id: response.data.id,
                  name: response.data.name,
                  email: response.data.email,
                  password: response.data.password,
                  company_id: response.data.company_id,
                  roles: response.data.roles
                });
                setSubmitted(true);
                setIsLoading(false);
                setMessage("");
              }, 1000);
                
            },
            (error) => {
                const _content =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setIsLoading(false);
                setMessage(_content);
            }
        ).catch((error) => {
          console.log(error)
        })
    }

    return (
      <Container>
        <Row>
          <Col>
            <h4>Add new user</h4>
          </Col>
        </Row>
        <hr />
        {message && (
          <UncontrolledAlert color="danger">{message}</UncontrolledAlert>
        )}
        {submitted ? (
          <Row>
            <Col>
              <h4>Your data successfully submitted</h4>
              <button onClick={newUser}>
                <i className="fas fa-plus"> ADD</i>
              </button>
            </Col>
          </Row>
        ) : (
            <Row>
              <Col>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      value={user.name}
                      onChange={handleInputChange}
                      name="name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      required
                      value={user.email}
                      onChange={handleInputChange}
                      name="email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="password"
                      required
                      value={user.password}
                      onChange={handleInputChange}
                      name="password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="company">Company</Label>
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
                  </FormGroup>
                  <FormGroup>
                    <Label>Roles</Label>
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
                              onChange={handleCheckboxChange}
                            />{" "}
                            {v.name}
                          </label>
                        </div>
                      ))}
                  </FormGroup>
                  <FormGroup className="text-right">
                    <button onClick={saveUser} disabled={isLoading}>
                      {isLoading ? (
                        <span>Please Wait</span>
                      ) : (<span>Submit</span> )} 
                    </button>
                  </FormGroup>
              </Col>
            </Row>
            
          
        )}
      </Container>
    );
}

export default AdminUsersAdd;
