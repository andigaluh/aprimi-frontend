import React, { useState, useEffect } from "react";
import LogoService from "../../../services/LogoServices";
import AuthService from "../../../services/auth.service";

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
                (response) => {
                    console.log(response.data);
                    setMessage("The Logo was updated successfully!");
                },
                (error) => {
                    setMessage(error);
                    console.log(`error disini ${error}`);
                }
            )
            .catch((e) => {
                setMessage(e);
                console.log(e);
            });
    };

    const updateStatus = (status) => {
        var data = {
            is_publish: status,
        };

        LogoService.update(currentLogo.id, data)
            .then((response) => {
                setCurrentLogo({ ...currentLogo, is_publish: status });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const hapus = () => {
        LogoService.remove(currentLogo.id)
            .then((response) => {
                console.log(response.data);
                props.history.push("/admin/logo");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="col-md-12">
            {auth ? (
                <div className="edit-user">
                    <h4>Detail Logo</h4>
                    <p>{message}</p>
                    <form>
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
                        
                    </form>
                    <button
                        type="submit"
                        className="badge badge-success mr-2"
                        onClick={update}
                    >
                        Update
                    </button>
                    {currentLogo.is_publish ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => updateStatus(true)}
                            >
                                Publish
                            </button>
                        )}

                    <button className="badge badge-danger mr-2" onClick={hapus}>
                        Delete
                    </button>
                </div>
            ) : (
                    <div>
                        <h4>UnAuthorized!</h4>
                    </div>
                )}
        </div>
    );




}

export default AdminLogoDetail;