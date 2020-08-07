import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap'
import EventServices from '../../../services/EventServices';


const TrainingCertficationConfirm = (props) => {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [currentConfirmationImage, setCurrentConfirmationImage] = useState("")

    useEffect(() => {
        retrieveConfirmation(props.match.params.id)
    }, [props.match.params.id]);

    const retrieveConfirmation = (id) => {
        EventServices.myRegistrationById(id).then(
            (response) => {
                console.log(response.data[0].confirmation_image)
                setCurrentConfirmationImage(response.data[0].confirmation_image)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                console.log(`error: ${resMessage}`);
            }
        )
    } 

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };

    const upload = () => {
        let currentFile = selectedFiles[0];

        let id = props.match.params.id;

        setProgress(0);
        setCurrentFile(currentFile);

        console.log(currentFile);

        EventServices.uploadConfirmation(id, currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data);
                console.log(response.data);
                props.history.push("/user/TrainingCertificationHistory");
            })
            .then((files) => {
                console.log(files.data);
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
                <Col md="12">
                    <h4>Payment Confirmation</h4>
                    <hr />
                    <p>This payment confirmation for <strong>{props.match.params.title.toUpperCase()}</strong></p>
                    
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
                    <label className="btn btn-default">
                        <input type="file" onChange={selectFile} name="confirmation_image" id="confirmation_image"/>
                    </label>

                    <button
                        className="color button"
                        disabled={!selectedFiles}
                        onClick={upload}
                    >
                        Upload
                    </button>

                    <div className="alert alert-light" role="alert">
                        {message}
                    </div>
                    {currentConfirmationImage && (
                        <div>
                            <p>This is your existing confirmation payment for this training, please upload confirmation above if you want to update</p>
                            <img
                                src={
                                    process.env.REACT_APP_API + "/uploads/confirmation/thumbnail/" +
                                    currentConfirmationImage
                                }
                             alt="confirmation"
                            />
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default TrainingCertficationConfirm;