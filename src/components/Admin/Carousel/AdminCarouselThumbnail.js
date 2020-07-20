import React, { useState, useEffect } from "react";
import CarouselService from "../../../services/CarouselServices";
import AuthService from "../../../services/auth.service";

const AdminCarouselThumbnail = props => {
    //const [auth, setAuth] = useState(undefined);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    //const [fileInfos, setFileInfos] = useState([]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            //setAuth(user);
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
                console.log(response.data);
                props.history.push("/admin/carousel");
                //return EventService.get(id);
            })
            .then((files) => {
                //setFileInfos(files.data);
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
        <div>
            <h4>Upload Image</h4>
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
                <input type="file" onChange={selectFile} name="image" id="image" />
            </label>

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

export default AdminCarouselThumbnail;