import React, { useState, useEffect, useRef } from "react";
import ContentService from "../../../services/ContentServices";
import AuthService from "../../../services/auth.service";
import JoditEditor from "jodit-react";
import { Container, Row, Col, FormGroup, Label, UncontrolledAlert } from "reactstrap"

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
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    
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
        setIsLoading(true)

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
                setIsLoading(false)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(_content);
                setIsLoading(false)
                window.scrollTo(0, 500)
            }
        )
    }

    return (
      <Container>
        <Row>
          <Col>
        {auth ? (
          <div>
            <div className="submit-form">
              {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn-custom btn-success" onClick={newContent}>
                      Add
                    </button>
                </div>
              ) : (
                <div>
                  <h4>Add Content</h4>
                  <hr />
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
                      value={currentContent.title}
                      onChange={handleInputChange}
                      name="title"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="url_title">URL Title</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="url_title"
                      required
                      value={currentContent.url_title}
                      onChange={handleInputChange}
                      name="url_title"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="content">Content</Label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1}
                      onBlur={(ContentBaru) => setContent(ContentBaru)}
                      name="content"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <button onClick={saveContent} className="btn-custom btn-success" disabled={isLoading}>
                            {isLoading ? (<span>Please Wait</span>) : (<span>Submit</span>)} 
                    </button>
                  </FormGroup>
                  
                </div>
              )}
            </div>
          </div>
        ) : (
          
              <h4>unAuthorized!</h4>
            
        )}
          </Col>
        </Row>
      </Container>
    );
}

export default AdminContentAdd;