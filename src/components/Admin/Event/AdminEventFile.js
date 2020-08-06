import React, { useState, useEffect } from "react";
import EventService from "../../../services/EventServices";
import AuthService from "../../../services/auth.service";
import { Container, Row, Col } from "reactstrap"

const AdminEventFile = props => {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            EventService.get(props.match.params.id).then((response) => {
            });
        }
    }, [props.match.params.id]);

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };

    const upload = () => {
        let currentFile = selectedFiles[0];

        let id = props.match.params.id;

        setProgress(0);
        setCurrentFile(currentFile);

        EventService.uploadFiles(id, currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data);
                console.log(response.data);
                props.history.push("/admin/event");
            })
            .then((files) => {
                console.log(files)
            })
            .catch((error) => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
            });

        setSelectedFiles(undefined);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Upload File Attachment</h4>
                    <hr/>
                    {currentFile && (
                        <div className="progress">
                            <div
                                className="progress-bar progress-bar-info progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progress + "%" }}
                            >
                                {progress}%
                    </div>
                        </div>
                    )}

                    <label className="btn-custom btn-default">
                        <input type="file" onChange={selectFile} name="file" id="file" />
                    </label>

                    <button
                        className="btn-custom btn-success"
                        disabled={!selectedFiles}
                        onClick={upload}
                    >
                        Upload
                </button>

                    <div className="alert alert-light" role="alert">
                        {message}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminEventFile;