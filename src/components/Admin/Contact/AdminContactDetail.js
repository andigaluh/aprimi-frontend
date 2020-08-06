import React, { useState, useEffect } from "react";
import ContactService from "../../../services/ContactServices";
import AuthService from "../../../services/auth.service";
import { Link } from "react-router-dom";
import { Container, Row, Col, FormGroup, Label, Alert } from 'reactstrap'

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
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        ContactService.remove(currentContact.id)
            .then(() => {
                setIsLoading(false)
                props.history.push("/admin/contact");
            })
            .catch((e) => {
                setIsLoading(false)
                setMessage(e)
            });
    };

    return (
        <Container>
            <Row>
                
                    {auth ? (
                        <Col>
                            <h4>Detail Contact</h4>
                            <hr/>
                            {message && (
                                <Alert color="success">{message}</Alert>
                            )}
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        required
                                        value={currentContact.name}
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
                                        value={currentContact.email}
                                        onChange={handleInputChange}
                                        name="email"
                                    />
                        </FormGroup>
                                <FormGroup>
                                    <Label for="subject">Subject</Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        required
                                        value={currentContact.subject}
                                        onChange={handleInputChange}
                                        name="subject"
                                    />
                        </FormGroup>
                                <FormGroup>
                                    <Label for="date_event">Message</Label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        name="message"
                                        onChange={handleInputChange}
                                        value={currentContact.message}
                                    ></textarea>
                        </FormGroup>
                            <FormGroup>
                            <button className="btn-custom btn-danger mr-2" onClick={hapus} disabled={isLoading}>
                                {isLoading ? (
                                    <span>Please wait</span>
                                ) : (
                                    <span>Delete</span>
                                )}
                            </button>
                            <Link to={"/admin/contact"} className="btn-custom btn-warning">
                                Back
                            </Link>
                        </FormGroup>
                    </Col>
                    ) : (
                    <Col>
                        <h4>UnAuthorized!</h4>
                    </Col>
                )}
                
            </Row>
        </Container>
    );


}

export default AdminContactDetail;