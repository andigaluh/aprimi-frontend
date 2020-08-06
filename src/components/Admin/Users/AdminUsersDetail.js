import React, { useState, useEffect } from 'react';
import UserService from "../../../services/UserService";
import CompanyService from "../../../services/CompanyServices";
import {Container, Row, Col, FormGroup, Label, Alert} from 'reactstrap'
import RoleServices from '../../../services/RoleServices';

const AdminUsersDetail = props => {
    const initialUserState = {
        id: null,
        name: "",
        email: "",
        status: false,
        company_id: 0
    };
    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");
    const [currentCompany, setCurrentCompany] = useState([]);
    const [currentRole, setcurrentRole] = useState([]);
    const [inputRole, setInputRole] = useState([]);

    const User = (id) => {
        UserService.get(id).then(
            (response) => {
                setCurrentUser(response.data);
                setInputRole(response.data.roles)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentUser(_content);
                console.log(_content);
                //window.location.replace("/login");
            }
        )
    }

    const Company = () => {
        CompanyService.getAll().then(
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
        )
    }

    const retrieveRole = () => {
        RoleServices.getAll().then(
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

    useEffect(() => {
        User(props.match.params.id);
        Company();
        retrieveRole();
        
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value, checked } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const updateUser = () => {
        var rolesArr = Object.values(inputRole).map(function (key) {
            return key;
        });

        var data = {
            name: currentUser.name,
            email: currentUser.email,
            company_id: currentUser.company_id,
            roles: rolesArr,
        }

        UserService.update(currentUser.id, data)
            .then(response => {
                console.log(response.data);
                setMessage("The User was updated successfully!");
            }, error => {
                    console.log(`error disini ${error}`);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateStatus = status => {
        var data = {
            status: status
        };

        UserService.update(currentUser.id, data)
            .then(response => {
                setCurrentUser({ ...currentUser, status: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

  const deleteUser = () => {
      UserService.remove(currentUser.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/admin/users");
      })
      .catch(e => {
        console.log(e);
      });
  };

    return (
        <Container>
            {currentUser ? (
                <Row>
                    <Col>
                    <h4>Detail user</h4>
                    <hr/>
                    {message && (
                        <Alert color="success">{message}</Alert>
                    )}
                    
                    <form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentUser.name}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={currentUser.email}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="company">Company</Label>
                            <select 
                                value={currentUser.company_id} 
                                className="form-control" 
                                id="company_id" 
                                name="company_id" 
                                onChange={handleInputChange}
                            >
                                {currentCompany && currentCompany.map((company, i) => (
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
                                                checked={inputRole.includes(v.name)}
                                                value={v.name}
                                                onChange={handleInputChange}
                                                disabled={true}
                                            />{" "}
                                            {v.name}
                                        </label>
                                    </div>
                                ))}
                        </FormGroup>
                        
                    </form>
                    <button
                        type="submit"
                        className="btn-custom btn-success mr-2"
                        onClick={updateUser}
                    >
                        Update
                        </button>
                    {currentUser.status ? (
                        <button
                            className="btn-custom btn-primary mr-2"
                            onClick={() => updateStatus(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                            <button
                                className="btn-custom btn-primary mr-2"
                                onClick={() => updateStatus(true)}
                            >
                                Publish
                            </button>
                        )}

                    <button className="btn-custom btn-danger mr-2" onClick={deleteUser}>
                        Delete
                    </button>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col>
                        <h4>No Id selected</h4>
                    </Col>
                </Row>
            )}
            
        </Container>
    );
}

export default AdminUsersDetail;