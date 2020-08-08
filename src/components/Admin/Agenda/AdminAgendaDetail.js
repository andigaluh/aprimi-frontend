import React, { useState, useEffect, useRef } from "react";
import AuthService from "../../../services/auth.service";
import JoditEditor from "jodit-react";
import { Container, Row, Col, FormGroup, Label, Alert } from "reactstrap";
import AgendaServices from "../../../services/AgendaServices";
import moment from "moment"

const AdminAgendaDetail = (props) => {
    const [auth, setAuth] = useState(undefined);
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
    const [message, setMessage] = useState("");
   
    const editor = useRef(null);
    const [content, setContent] = useState("");

    useEffect(() => {
      const user = AuthService.getCurrentUser();

      if (user) {
        Agenda(props.match.params.id);
        setAuth(user);
      }
    }, [props.match.params.id]);

    const Agenda = (id) => {
      AgendaServices.AdminGet(id).then(
        (response) => {
          setCurrentAgenda(response.data);
          setContent(response.data.content);
          console.log(response.data)
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setCurrentAgenda(_content);
          setMessage(_content);
        }
      );
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;

      setCurrentAgenda({ ...currentAgenda, [name]: value });
    };

    const update = () => {
      var data = {
        title: currentAgenda.title,
        start_date: currentAgenda.start_date,
        end_date: currentAgenda.end_date,
        content: content,
        updated_user_id: auth.id,
      };
      AgendaServices.update(currentAgenda.id, data)
        .then(
          (response) => {
            window.scrollTo(0, 500);
            setMessage("The Agenda was updated successfully!");
          },
          (error) => {
            console.log(`error ${error}`);
          }
        )
        .catch((e) => {
          console.log(e);
        });
    };

    const updateStatus = (status) => {
      var data = {
        is_publish: status,
      };

      AgendaServices.update(currentAgenda.id, data)
        .then(() => {
          setCurrentAgenda({ ...currentAgenda, is_publish: status });
          setMessage("");
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const updateFeatured = (status) => {
      var data = {
        is_featured: status,
      };

      AgendaServices.update(currentAgenda.id, data)
        .then(() => {
          setCurrentAgenda({ ...currentAgenda, is_featured: status });
          setMessage("");
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const hapus = () => {
      AgendaServices.remove(currentAgenda.id)
        .then(() => {
            window.scrollTo(0,500)
          props.history.push("/admin/agenda");
        })
        .catch((e) => {
          console.log(e);
        });
    };



    return (
      <Container>
        <Row>
          {auth ? (
            <Col>
              <div className="edit-user">
                <h4>Detail Agenda</h4>
                <hr />
                {message && <Alert color="success">{message}</Alert>}

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
                    value={moment(currentAgenda.start_date).format(
                      "YYYY-MM-DD"
                    )}
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
                    value={moment(currentAgenda.end_date).format("YYYY-MM-DD")}
                    onChange={handleInputChange}
                    name="end_date"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="date_event">Content</Label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={1}
                    onBlur={(ContentBaru) => setContent(ContentBaru)}
                  />
                </FormGroup>
                <FormGroup>
                  <button
                    type="submit"
                    className="btn-custom btn-success mr-2"
                    onClick={update}
                  >
                    Update
                  </button>
                  {currentAgenda.is_publish ? (
                    <button
                      className="btn-custom btn-primary mr-2"
                      onClick={() => updateStatus(false)}
                    >
                      UnPublish
                    </button>
                  ) : (
                    <button
                      className="btn-custom btn-primary mr-2"
                      onClick={() => updateStatus(true)}
                    >
                      Publish
                    </button>
                  )}

                  {currentAgenda.is_featured ? (
                    <button
                      className="btn-custom btn-primary mr-2"
                      onClick={() => updateFeatured(false)}
                    >
                      Non-featured
                    </button>
                  ) : (
                    <button
                      className="btn-custom btn-primary mr-2"
                      onClick={() => updateFeatured(true)}
                    >
                      Featured
                    </button>
                  )}

                  <button
                    className="btn-custom btn-danger mr-2"
                    onClick={hapus}
                  >
                    Delete
                  </button>
                </FormGroup>
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

export default AdminAgendaDetail;