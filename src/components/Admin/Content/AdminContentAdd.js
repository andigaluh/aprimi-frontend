import React, { useState, useEffect, useRef } from "react";
import ContentService from "../../../services/ContentServices";
import AuthService from "../../../services/auth.service";
import JoditEditor from "jodit-react";

const AdminContentAdd = () => {
    const initialContentState = {
        id: null,
        title: "",
        url_title: "",
        content: "",
        is_publish: true,
        created_user_id: "",
        updated_user_id: "",
    };

    const [currentContent, setCurrentContent] = useState(initialContentState);
    const [submitted, setSubmitted] = useState(false);
    const [auth, setAuth] = useState(undefined);
    
    const editor = useRef(null);
    const [content, setContent] = useState("");
    
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setAuth(user);
        }
    },[])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentContent({ ...currentContent, [name]: value });
    };

    const newContent = () => {
        setCurrentContent(initialContentState);
        setSubmitted(false);
    };

    const saveContent = () => {
        var data = {
          title: currentContent.title,
          url_title: currentContent.url_title,
          content: content,
          created_user_id: auth.id,
          updated_user_id: auth.id,
        };

        ContentService.create(data).then(
            (response) => {
                setCurrentContent({
                    id: response.data.id,
                    title: response.data.title,
                    url_title: response.data.url_title,
                    content: response.data.content,
                    is_publish: false,
                    created_user_id: response.data.created_user_id,
                    updated_user_id: response.data.updated_user_id
                });
                setSubmitted(true);
                console.log(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                //setCurrentContent(_content);
                console.log(_content);
            }
        )
    }

    return (
      <div className="list row">
        {auth ? (
          <div className="col-md-12">
            <h4>Add Content</h4>
            <div className="submit-form">
              {submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={newContent}>
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
                      value={currentContent.title}
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
                      value={currentContent.url_title}
                      onChange={handleInputChange}
                      name="url_title"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1}
                      onBlur={(ContentBaru) => setContent(ContentBaru)}
                      name="content"
                    />
                  </div>

                  <button onClick={saveContent} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="col-md-12">
            <h4>unAuthorized!</h4>
          </div>
        )}
      </div>
    );
}

export default AdminContentAdd;