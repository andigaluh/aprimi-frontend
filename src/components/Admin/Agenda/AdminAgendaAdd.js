import React, { useState, useEffect, useRef } from "react";
import AuthService from "../../../services/auth.service";
import AgendaServices from "../../../services/AgendaServices";
import JoditEditor from "jodit-react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  UncontrolledAlert,
} from "reactstrap";


const AdminAgendaAdd = (props) => {
    const initialAgendaState = {
      id: null,
      title: "",
      start_date: "",
      end_date: "",
      content: "",
      is_publish: false,
      is_featured: false,
      created_user_id: "",
      updated_user_id: "",
      roles: ["user", "komite"],
    };

    const [currentAgenda, setCurrentAgenda] = useState(initialAgendaState);
    const [submitted, setSubmitted] = useState(false);
    const [auth, setAuth] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const editor = useRef(null);
    const [content, setContent] = useState("");

    useEffect(() => {
      const user = AuthService.getCurrentUser();

      if (user) {
        setAuth(user);
      }
    }, []);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setCurrentAgenda({ ...currentAgenda, [name]: value });
    };

    const newAgenda = () => {
      setCurrentAgenda(initialAgendaState);
      setSubmitted(false);
    };

    const saveAgenda = () => {
      setIsLoading(true);
      var data = {
        title: currentAgenda.title,
        start_date: currentAgenda.start_date,
        end_date: currentAgenda.end_date,
        content: content,
        created_user_id: auth.id,
        updated_user_id: auth.id,
        is_publish: false,
        is_featured: false,
        roles: ["user", "komite"]
      };

      AgendaServices.create(data).then(
        (response) => {
          setCurrentAgenda({
            id: response.data.id,
            title: response.data.title,
            start_date: response.data.start_date,
            end_date: response.data.end_date,
            content: response.data.content,
            created_user_id: response.data.created_user_id,
            updated_user_id: response.data.updated_user_id,
          });
          setSubmitted(true);
          setIsLoading(false);
          window.scrollTo(0,500)
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setCurrentAgenda(_content);
          setErrorMsg(_content);
          setIsLoading(false);
        }
      );
    };

    return (
      <Container>
        <Row>
          {auth ? (
            <Col>
              <h4>Add Agenda</h4>
              <hr />
              <div className="submit-form">
                {submitted ? (
                  <div>
                    <h4>You submitted successfully!</h4>
                    <button
                      className="btn-custom btn-success"
                      onClick={newAgenda}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <div>
                    {errorMsg && (
                      <UncontrolledAlert color="danger">
                        {errorMsg}
                      </UncontrolledAlert>
                    )}
                    <FormGroup>
                      <Label for="title">Title</Label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={currentAgenda.title}
                        onChange={handleInputChange}
                        name="title"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="start_date">Start Date</Label>
                      <input
                        type="date"
                        className="form-control"
                        id="start_date"
                        required
                        value={currentAgenda.start_date}
                        onChange={handleInputChange}
                        name="start_date"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="end_date">End Date</Label>
                      <input
                        type="date"
                        className="form-control"
                        id="end_date"
                        required
                        value={currentAgenda.end_date}
                        onChange={handleInputChange}
                        name="end_date"
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
                      <button
                        onClick={saveAgenda}
                        className="btn-custom btn-success"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span>Please Wait</span>
                        ) : (
                          <span>Submit</span>
                        )}
                      </button>
                    </FormGroup>
                  </div>
                )}
              </div>
            </Col>
          ) : (
            <Col>
              <h4>UnAuthorized!</h4>
            </Col>
          )}
        </Row>
      </Container>
    );
}

export default AdminAgendaAdd;