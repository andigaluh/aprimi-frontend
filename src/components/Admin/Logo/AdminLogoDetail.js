import React, { useState, useEffect } from "react";
import LogoService from "../../../services/LogoServices";
import AuthService from "../../../services/auth.service";
import { Container, Row, Col, FormGroup, Label, Alert } from 'reactstrap'

const AdminLogoDetail = props => {
    const [auth, setAuth] = useState(undefined);
    const initialLogoState = {
        id: null,
        title: "",
        url_title: "",
        url_link: "",
        is_publish: false,
        created_user_id: 1,
        updated_user_id: 1
    };
    const [currentLogo, setCurrentLogo] = useState(initialLogoState);
    const [message, setMessage] = useState("");

    const Logo = (id) => {
        LogoService.get(id).then(
            (response) => {
                setCurrentLogo(response.data)
                console.log(response.data)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(_content);
                console.log(_content);
            }
        )
    }

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            Logo(props.match.params.id);
            setAuth(user);
        }
    }, [props.match.params.id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCurrentLogo({ ...currentLogo, [name]: value });
    };

    const update = () => {
        LogoService.update(currentLogo.id, currentLogo)
            .then(
                () => {
                    setMessage("The Logo was updated successfully!");
                },
                (error) => {
                    setMessage(error);
                }
            )
            .catch((e) => {
                setMessage(e);
            });
    };

    const updateStatus = (status) => {
        var data = {
            is_publish: status,
        };

        LogoService.update(currentLogo.id, data)
            .then(() => {
                setCurrentLogo({ ...currentLogo, is_publish: status });
                
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const hapus = () => {
        LogoService.remove(currentLogo.id)
            .then(() => {
                props.history.push("/admin/logo");
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
                <div className="edit-user">
                    <h4>Detail Logo</h4>
                    <hr/>
                            {message && (
                                <Alert color="success">{message}</Alert>
                            )}
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={currentLogo.title}
                                onChange={handleInputChange}
                                name="title"
                            />
                            </FormGroup>
                        <FormGroup>
                            <Label for="url_title">URL Title</Label>
                            <input
                                type="text"
                                className="form-control"
                                id="url_title"
                                required
                                value={currentLogo.url_title}
                                onChange={handleInputChange}
                                name="url_title"
                            />
                            </FormGroup>
                        <FormGroup>
                            <Label for="url_link">URL Link</Label>
                            <input
                                type="text"
                                className="form-control"
                                id="url_link"
                                required
                                value={currentLogo.url_link}
                                onChange={handleInputChange}
                                name="url_link"
                            />
                            </FormGroup>
                        
                        <FormGroup>
                    <button
                        type="submit"
                        className="btn-custom btn-success mr-2"
                        onClick={update}
                    >
                        Update
                    </button>
                    {currentLogo.is_publish ? (
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

                    <button className="btn-custom btn-danger mr-2" onClick={hapus}>
                        Delete
                    </button>
                            </FormGroup>
                </div>
            ) : (
                    <div>
                        <h4>UnAuthorized!</h4>
                    </div>
                )}
                </Col>
            </Row>
        </Container>
    );




}

export default AdminLogoDetail;