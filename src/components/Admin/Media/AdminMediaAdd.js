import React, { useState, useEffect } from "react";
import MediaService from "../../../services/MediaServices";
import AuthService from "../../../services/auth.service";
import { Container, Row, Col, FormGroup, Label, UncontrolledAlert } from "reactstrap"

const AdminMediaAdd = props => {
    const InitialMediaState = {
        title: "",
        name: ""
    }
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [currentMedia, setCurrentMedia] = useState(InitialMediaState);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            MediaService.get().then((response) => {
                
            });
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value,files } = event.target;
        if (files) {
            setSelectedFiles(files);
        }
        setCurrentMedia({ ...currentMedia, [name]: value });
    };

    const upload = () => {
        let currentFile = selectedFiles[0];
        
        setIsLoading(true)
        setProgress(0);
        setCurrentFile(currentFile);
        let title = currentMedia.title
        
        MediaService.create(title,currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data);
                setIsLoading(false)
                props.history.push("/admin/media");
            })
            .catch((error) => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
                setIsLoading(false)
                console.log(error);
            });

        setSelectedFiles(undefined);
        setCurrentMedia(InitialMediaState)
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Upload Media</h4>
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

                    {message && (
                        <UncontrolledAlert color="danger">{message}</UncontrolledAlert>
                    )}
                    
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={currentMedia.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </FormGroup>
                                    
                    <FormGroup>                
                        <label className="btn-custom btn-default">
                            <input type="file" onChange={handleInputChange} name="name" id="name" />
                        </label>
                    </FormGroup>

                    <FormGroup>
                    <button
                        className="btn-custom btn-success"
                        disabled={!selectedFiles}
                        onClick={upload}
                    >
                        {isLoading ? (
                            <span>Please wait</span>
                        ):(
                            <span>Upload</span>
                        )}
                    </button>
                    </FormGroup>

                    


                </Col>
            </Row>
        </Container>
    );
}

export default AdminMediaAdd;