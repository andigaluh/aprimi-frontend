import React, { useState, useEffect } from "react"
import AuthService from "../../../services/auth.service"
import LogoService from "../../../services/LogoServices"

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
                console.log(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setErrorMsg(_content);
                console.log(_content);
            }
        );
    };

    return (
        <div className="list row">
            {auth ? (
                <div className="col-md-12">
                    <h4>Add Logo</h4>
                    <div className="submit-form">
                        {errorMsg ? (
                            <div className="alert alert-danger">{errorMsg}</div>
                        ) : (
                                <div></div>
                            )}
                        {submitted ? (
                            <div>
                                <h4>You submitted successfully!</h4>
                                <button className="btn btn-success" onClick={newLogo}>
                                    Add
                                </button>
                            </div>
                        ) : (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            required
                                            value={currentLogo.title}
                                            onChange={handleInputChange}
                                            name="title"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="url_title">URL Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="url_title"
                                            required
                                            value={currentLogo.url_title}
                                            onChange={handleInputChange}
                                            name="url_title"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="url_link">URL Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="url_link"
                                            required
                                            value={currentLogo.url_link}
                                            onChange={handleInputChange}
                                            name="url_link"
                                        />
                                    </div>

                                    <button onClick={saveLogo} className="btn btn-success">
                                        Submit
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            ) : (
                    <div>
                        <h4>UnAuthorized!</h4>
                    </div>
                )}
        </div>
    )
}

export default AdminLogoAdd;