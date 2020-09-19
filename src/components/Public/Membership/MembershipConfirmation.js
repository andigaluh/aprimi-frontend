import React, { useState } from 'react'
import MembershipHeader from './MembershipHeader'
import { Container, Row, Col, FormGroup, Label, Alert } from "reactstrap"
import './MembershipConfirmation.css'
import CompanyServices from '../../../services/CompanyServices'
import { Link } from 'react-router-dom'

function MembershipConfirmation(props) {
    const InitialMembershipConfirmation = {
        id: "",
        name: ""
    }
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [currentMembershipConfirmation, setcurrentMembershipConfirmation] = useState(InitialMembershipConfirmation);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("danger");
    const [isLoading, setIsLoading] = useState(false)
    const [isUpload, setIsUpload] = useState(false);
    const [companyName, setCompanyName] = useState("");

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            setSelectedFiles(files);
        }
        setcurrentMembershipConfirmation({ ...currentMembershipConfirmation, [name]: value });
    };

    const upload = () => {
        let currentFile = selectedFiles[0];

        setIsLoading(true)
        setProgress(0);
        setCurrentFile(currentFile);
        let id = currentMembershipConfirmation.id

        CompanyServices.upload(id, currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data);
                setIsLoading(false);
                setIsUpload(false);
                setCurrentFile(undefined);
                setMessageColor("success");
                setProgress(0);
                props.history.push("/membership-confirmation");
                
            })
            .catch((error) => {
                setProgress(0);
                setMessage("Could not upload the file! " + error.message);
                setCurrentFile(undefined);
                setIsLoading(false);
                setMessageColor("danger");
            }); 

        setSelectedFiles(undefined);
        setcurrentMembershipConfirmation(InitialMembershipConfirmation)
    };

    const check = () => {
        let id = currentMembershipConfirmation.id
        CompanyServices.findMembership(id).then(
            (response) => {
                const responseData = response.data;
                if(!responseData) {
                    setMessage(`ID Registration not found, please try again`)
                    setMessageColor("danger");
                    
                } else {
                    setMessage("")
                    setIsUpload(true)
                    setCompanyName(responseData.name);
                }
                
            },
            (error) => {
                setMessageColor("danger");
            }
        )
        
    }

    const batal = () => {
        setMessage("");
        setIsUpload(false);
        setcurrentMembershipConfirmation(InitialMembershipConfirmation);
    }

    return (
        <main>
            <MembershipHeader />
            <div id="membership-confirmation" className="wrap-bg">
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h4>Upload Membership Confirmation</h4>
                            <hr />
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
                                <Alert color={messageColor}>{message}</Alert>
                            )}

                            <FormGroup>
                                <Label for="title">ID Registration</Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    required
                                    value={currentMembershipConfirmation.id}
                                    onChange={handleInputChange}
                                    name="id"
                                />
                            </FormGroup>

                            {!isUpload && (
                                <FormGroup className="formgroup__button">
                                    <button
                                        className="btn-custom btn-success"
                                        disabled={!currentMembershipConfirmation.id}
                                        onClick={check}
                                    >
                                        {isLoading ? (
                                            <span>Please wait</span>
                                        ) : (
                                                <span>Check</span>
                                            )}
                                    </button>
                                </FormGroup>
                            )}
                            

                            {isUpload && (
                                <div>
                                    <FormGroup>
                                        <Label for="company_name">Company Name</Label>
                                        <input 
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={companyName}
                                            disabled="true"
                                            className="form-control"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label className="btn-custom btn-default">
                                            <input type="file" onChange={handleInputChange} name="name" id="name" />
                                        </label>
                                    </FormGroup>

                                    <FormGroup className="formgroup__button">
                                        <button
                                            className="btn-custom btn-success mr-2"
                                            disabled={!selectedFiles}
                                            onClick={upload}
                                        >
                                            {isLoading ? (
                                                <span>Please wait</span>
                                            ) : (
                                                    <span>Upload</span>
                                                )}
                                        </button>
                                        
                                        <button className="btn-custom btn-danger mr-2" onClick={batal}>
                                            Cancel
                                        </button>   
                                    </FormGroup>
                                </div>
                            )}

                        </Col>
                    </Row>
                </Container>

            </div>
        </main>
    )
}

export default MembershipConfirmation
