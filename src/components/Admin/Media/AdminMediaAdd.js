import React, { useState, useEffect } from "react";
import MediaService from "../../../services/MediaServices";
import AuthService from "../../../services/auth.service";

const AdminMediaAdd = props => {
    const InitialMediaState = {
        title: "",
        name: ""
    }
    const [auth, setAuth] = useState(undefined);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [currentMedia, setCurrentMedia] = useState(InitialMediaState);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setAuth(user);
            MediaService.get().then((response) => {
                setFileInfos(response.data);
            });
        }
    }, []);

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleInputChange = (event) => {
        const { name, value,files } = event.target;
        if (files) {
            setSelectedFiles(files);
        }
        setCurrentMedia({ ...currentMedia, [name]: value });
    };

    const upload = () => {
        let currentFile = selectedFiles[0];
        

        setProgress(0);
        setCurrentFile(currentFile);
        let title = currentMedia.title
        
        MediaService.create(title,currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data);
                props.history.push("/admin/media");
            })
            .catch((error) => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
                console.log(error);
            });

        setSelectedFiles(undefined);
        setCurrentMedia(InitialMediaState)
    };

    return (
        <div className="col-md-12">
            <h4>Upload Media</h4>
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

            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={currentMedia.title}
                    onChange={handleInputChange}
                    name="title"
                />
            </div>
                            
            <div className="form-group">                
                <label className="btn btn-default">
                    <input type="file" onChange={handleInputChange} name="name" id="name" />
                </label>
            </div>

            <button
                className="btn btn-success"
                disabled={!selectedFiles}
                onClick={upload}
            >
                Upload
        </button>

            <div className="alert alert-light" role="alert">
                {message}
            </div>


        </div>
    );
}

export default AdminMediaAdd;