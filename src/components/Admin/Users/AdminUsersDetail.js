import React, { useState, useEffect } from 'react';
import UserService from "../../../services/UserService";
import CompanyService from "../../../services/CompanyServices";

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

    const User = (id) => {
        UserService.get(id).then(
            (response) => {
                setCurrentUser(response.data);
                console.log(response.data);
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
                console.log(response);
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

    useEffect(() => {
        User(props.match.params.id);
        Company();
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const updateUser = () => {
        UserService.update(currentUser.id, currentUser)
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
        <div>
            {currentUser ? (
                <div className="edit-user">
                    <h4>Detail user</h4>
                    <p>{message}</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentUser.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={currentUser.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
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
                        </div>
                        
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
                    
                </div>
            ) : (
                <div>
                    <h4>No Id selected</h4>
                </div>
            )}
            
        </div>
    );
}

export default AdminUsersDetail;