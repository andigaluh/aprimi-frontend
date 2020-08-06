import React, { useState, useEffect } from "react";
import CarouselService from "../../../services/CarouselServices";
import AuthService from "../../../services/auth.service";
import { Container, Row, Col, UncontrolledAlert } from "reactstrap"

const AdminCarouselThumbnail = props => {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            CarouselService.get(props.match.params.id).then((response) => {
                console.log(response.data);
            });
        }
    }, [props.match.params.id]);

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };

    const upload = () => {
        let currentFile = selectedFiles[0];

        let id = props.match.params.id;
        console.log(id)

        setProgress(0);
        setCurrentFile(currentFile);

        CarouselService.uploadThumbnail(id, currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data);
                props.history.push("/admin/carousel");
            })
            .catch((error) => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
                console.log(error);
            });

        setSelectedFiles(undefined);
    };

    return (
        <Container>
            <Row>
        <Col>
            <h4>Upload Image</h4>
            <hr/>
            {message && (
                <UncontrolledAlert color="danger">{message}</UncontrolledAlert>
            )}
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

            <label className="btn-custom btn-default mr-2">
                <input type="file" onChange={selectFile} name="image" id="image" />
            </label>

            <button
                className="btn-custom btn-success"
                disabled={!selectedFiles}
                onClick={upload}
            >
                Upload
            </button>
                </Col>
            </Row>
        </Container>
    );


}

export default AdminCarouselThumbnail;