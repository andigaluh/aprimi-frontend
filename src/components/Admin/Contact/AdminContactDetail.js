import React, { useState, useEffect } from "react";
import ContactService from "../../../services/ContactServices";
import AuthService from "../../../services/auth.service";
import { Link } from "react-router-dom";

const AdminContactDetail = props => {
    const [auth, setAuth] = useState(undefined);
    const initialContactState = {
        id: null,
        name: "",
        email: "",
        subject: "",
        message: "",
        };
    const [currentContact, setCurrentContact] = useState(initialContactState);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            Contact(props.match.params.id);
            setAuth(user);
        }
    },[props.match.params.id]);

    const Contact = (id) => {
        var data_read = {
            is_read: true,
        };

        ContactService.update(id, data_read);

        ContactService.get(id).then(
            (response) => {
                setCurrentContact(response.data);
                console.log(response.data)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentContact(_content);
                console.log(_content);
            }
        )
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCurrentContact({ ...currentContact, [name]: value });
    };

    const hapus = () => {
        ContactService.remove(currentContact.id)
            .then((response) => {
                console.log(response.data);
                props.history.push("/admin/contact");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="col-md-12">
            {auth ? (
                <div className="edit-user">
                    <h4>Detail Contact</h4>
                    <p>{message}</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={currentContact.name}
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
                                value={currentContact.email}
                                onChange={handleInputChange}
                                name="email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject"
                                required
                                value={currentContact.subject}
                                onChange={handleInputChange}
                                name="subject"
                            />
                        </div>
                        <div className="form-group ">
                            <label htmlFor="date_event">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                onChange={handleInputChange}
                                value={currentContact.message}
                            ></textarea>
                        </div>
                        
                    </form>
                    <button className="badge badge-danger mr-2" onClick={hapus}>
                        Delete
                    </button>
                    <Link to={"/admin/contact"} className="badge badge-warning">
                        Back
                    </Link>
                </div>
            ) : (
                    <div>
                        <h4>UnAuthorized!</h4>
                    </div>
                )}
        </div>
    );


}

export default AdminContactDetail;