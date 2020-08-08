import React, { useState, useEffect, useRef } from "react";
import EventService from "../../../services/EventServices";
import EventCategoryService from "../../../services/EventCategoryServices";
import AuthService from "../../../services/auth.service";
import JoditEditor from "jodit-react";
import moment from "moment"
import { Container, Row, Col, FormGroup, Label, Alert } from 'reactstrap'

const AdminEventDetail = props => {
    const [auth, setAuth] = useState(undefined);
    const initialEventState = {
      id: null,
      thumbnail: "",
      title: "",
      date_event: "",
      location: "",
      headline: "",
      content: "",
      content_member_fee: "",
      content_nonmember_fee: "",
      file: "",
      is_publish: false,
      is_featured: false,
      event_category_id: 0,
      created_user_id: "",
      updated_user_id: "",
    };
    const [currentEvent, setCurrentEvent] = useState(initialEventState);
    const [message, setMessage] = useState("");
    const [currentEventCategory, setCurrentEventCategory] = useState([]);

    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [contentMember, setContentMember] = useState("");
    const [contentNonMember, setContentNonMember] = useState(""); 
     
    const Event = (id) => {
        EventService.get(id).then(
            (response) => {
                setCurrentEvent(response.data)
                setContent(response.data.content);
                setContentMember(response.data.content_member_fee);
                setContentNonMember(response.data.content_nonmember_fee);
                console.log(response.data)
            },
            (error) => {
                const _content =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                setCurrentEvent(_content);
                console.log(_content);
            }
        )
    } 

    const EventCategory = () => {
        EventCategoryService.AdminGetAll().then(
            (response) => {
                setCurrentEventCategory(response.data);
            },
            (error) => {
                const _content =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                setCurrentEventCategory(_content);
                console.log(_content);
            }
        )
    }

    useEffect(() => {
      const user = AuthService.getCurrentUser();

      if (user) {
        Event(props.match.params.id);
        EventCategory();
        setAuth(user);
      }
    }, [props.match.params.id]);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      
      setCurrentEvent({ ...currentEvent, [name]: value });
    };

    const update = () => {

      var data = {
        thumbnail: "",
        title: currentEvent.title,
        date_event: currentEvent.date_event,
        location: currentEvent.location,
        headline: currentEvent.headline,
        content: content,
        content_member_fee: contentMember,
        content_nonmember_fee: contentNonMember,
        file: "",
        is_publish: false,
        event_category_id: currentEvent.event_category_id,
        updated_user_id: auth.id,
      };

      EventService.update(currentEvent.id, data)
        .then(
          (response) => {
            window.scrollTo(0, 500)
            setMessage(response.data.message);
          },
          (error) => {
            console.log(`error disini ${error}`);
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

      EventService.update(currentEvent.id, data)
        .then((response) => {
          setCurrentEvent({ ...currentEvent, is_publish: status });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const hapus = () => {
      EventService.remove(currentEvent.id)
        .then((response) => {
          props.history.push("/admin/event");
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const updateFeatured = (status) => {
      var data = {
        is_featured: status,
      };

      EventService.update(currentEvent.id, data)
        .then((response) => {
          setCurrentEvent({ ...currentEvent, is_featured: status });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return (
      <Container>
        <Row>
          <Col>
            {auth ? (
              <div className="edit-user">
                <h4>Detail Event</h4>
                <hr />
                {message && <Alert color="success">{message}</Alert>}
                <FormGroup>
                  <Label for="event_category_id">Event Category</Label>
                  <select
                    value={currentEvent.event_category_id}
                    className="form-control"
                    id="event_category_id"
                    name="event_category_id"
                    onChange={handleInputChange}
                  >
                    {currentEventCategory &&
                      currentEventCategory.map((event_category, i) => (
                        <option value={event_category.id}>
                          {event_category.title}
                        </option>
                      ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={currentEvent.title}
                    onChange={handleInputChange}
                    name="title"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="date_event">Date event</Label>
                  <input
                    type="date"
                    className="form-control"
                    id="date_event"
                    required
                    value={moment(currentEvent.date_event).format("YYYY-MM-DD")}
                    onChange={handleInputChange}
                    name="date_event"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="location">Location</Label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    required
                    value={currentEvent.location}
                    onChange={handleInputChange}
                    name="location"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="headline">Headline</Label>
                  <input
                    type="text"
                    className="form-control"
                    id="headline"
                    required
                    value={currentEvent.headline}
                    onChange={handleInputChange}
                    name="headline"
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
                <FormGroup className="mt-20">
                  <Label for="date_event">Content Member</Label>
                  <JoditEditor
                    ref={editor}
                    value={contentMember}
                    tabIndex={1}
                    onBlur={(ContentBaru) => setContentMember(ContentBaru)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="date_event">Content NonMember</Label>
                  <JoditEditor
                    ref={editor}
                    value={contentNonMember}
                    tabIndex={1}
                    onBlur={(ContentBaru) => setContentNonMember(ContentBaru)}
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
                  {currentEvent.is_publish ? (
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

                  {currentEvent.is_featured ? (
                    <button
                      className="btn-custom btn-primary mr-2"
                      onClick={() => updateFeatured(false)}
                    >
                      Non Featured
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
            ) : (
              <div>
                <h4>UnAuthorized!</h4>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
}

export default AdminEventDetail