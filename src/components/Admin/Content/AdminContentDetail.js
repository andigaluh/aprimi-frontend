import React, { useState, useEffect, useRef } from "react";
import ContentService from "../../../services/ContentServices";
import AuthService from "../../../services/auth.service";
import JoditEditor from "jodit-react";

const AdminContentDetail = (props) => {
    const initialContentState = {
        id: null,
        title: "",
        url_title: "",
        content: "",
        is_publish: true,
        created_user_id: "",
        updated_user_id: "",
    };
    const [auth, setAuth] = useState(undefined)
    const [currentContent, setCurrentContent] = useState(initialContentState);
    const [message, setMessage] = useState("");
    

    const editor = useRef(null);
    const [content, setContent] = useState("");

    const konten = id => {
        ContentService.AdminGet(id).then(
            (response) => {
                setCurrentContent(response.data);
                setContent(response.data.content)
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
        const userLogin = AuthService.getCurrentUser();

        if (userLogin) {
            setAuth(userLogin);
            konten(props.match.params.id);
        }
    }, [props.match.params.id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentContent({ ...currentContent, [name]: value });
    };

    const Update = () => {
        var data = {
          title: currentContent.title,
          url_title: currentContent.url_title,
          content: content,
          updated_user_id: auth.id,
        };
        ContentService.update(currentContent.id, data)
          .then(
            (response) => {
              console.log(response.data);
              setMessage("The Content was updated successfully!");
            },
            (error) => {
              console.log(`error disini ${error}`);
            }
          )
          .catch((e) => {
            console.log(e);
          });
    };

    const UpdateStatus = (status) => {
        var data = {
            is_publish: status,
        };

        ContentService.update(currentContent.id, data)
            .then((response) => {
                setCurrentContent({ ...currentContent, is_publish: status });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const Delete = () => {
        ContentService.remove(currentContent.id)
            .then((response) => {
                console.log(response.data);
                props.history.push("/admin/content");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
      <div className="col-md-12">
        {auth ? (
          <div>
            <h4>Detail Content</h4>

            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentContent.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="url_title">URL Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="url_title"
                  name="url_title"
                  value={currentContent.url_title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  tabIndex={1}
                  onBlur={(ContentBaru) => setContent(ContentBaru)}
                />
              </div>
            </form>
            <button
              type="submit"
              className="badge badge-success mr-2"
              onClick={Update}
            >
              Update
            </button>
            {currentContent.is_publish ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => UpdateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => UpdateStatus(true)}
              >
                Publish
              </button>
            )}

            <button className="badge badge-danger mr-2" onClick={Delete}>
              Delete
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
}

export default AdminContentDetail;