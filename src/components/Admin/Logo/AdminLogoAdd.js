import React, { useState, useEffect } from "react"
import AuthService from "../../../services/auth.service"
import LogoService from "../../../services/LogoServices"
import { Container, Row, Col, FormGroup, Label, UncontrolledAlert } from "reactstrap"

const AdminLogoAdd = () => {
    const intialLogoState = {
        id: null,
        title: "",
        url_title: "",
        url_link: "",
        is_publish: false,
        created_user_id: 1,
        updated_user_id: 1
    }

    const [currentLogo, setCurrentLogo] = useState(intialLogoState);
    const [submitted, setSubmitted] = useState(false);
    const [auth, setAuth] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setAuth(user);
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentLogo({ ...currentLogo, [name]: value });
    };

    const newLogo = () => {
        setCurrentLogo(intialLogoState);
        setSubmitted(false);
    };

    const saveLogo = () => {
        setIsLoading(true)
        var data = {
            title: currentLogo.title,
            url_title: currentLogo.url_title,
            url_link: currentLogo.url_link,
            is_publish: currentLogo.is_publish,
            created_user_id: auth.id,
            updated_user_id: auth.id
        };

        LogoService.create(data).then(
            (response) => {
                setCurrentLogo({
                    id: response.data.id,
                    title: response.data.title,
                    url_title: response.data.url_title,
                    url_link: response.data.url_link,
                    is_publish: response.data.is_publish,
                    created_user_id: response.data.created_user_id,
                    updated_user_id: response.data.updated_user_id,
                });
                setSubmitted(true);
                setErrorMsg("");
                setIsLoading(false)
                
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setErrorMsg(_content);
                setIsLoading(false)
            }
        );
    };

    return (
        <Container>
        <Row>
            {auth ? (
                <Col>
                    <h4>Add Logo</h4>
                    <hr/>
                    <div className="submit-form">
                        {errorMsg && (
                            <UncontrolledAlert color="danger">{errorMsg}</UncontrolledAlert>
                        )}
                        {submitted ? (
                            <div>
                                <h4>You submitted successfully!</h4>
                                <button className="btn-custom btn-success" onClick={newLogo}>
                                    Add
                                </button>
                            </div>
                        ) : (
                                <div>
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
                                    <button onClick={saveLogo} className="btn-custom btn-success" disabled={isLoading}>
                                        {isLoading ? (
                                            <span>Please wait</span>
                                        ) : (
                                            <span>Submit</span>
                                        )}
                                    </button>
                                        </FormGroup>
                                </div>
                            )}
                    </div>
                </Col>
            ) : (
                    <Col>
                        <h4>UnAuthorized!</h4>
                        </Col>
                )}
        </Row>
        </Container>
    )
}

export default AdminLogoAdd;