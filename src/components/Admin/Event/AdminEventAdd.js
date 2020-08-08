import React, { useState, useEffect, useRef } from "react"
import AuthService from "../../../services/auth.service"
import EventService from "../../../services/EventServices"
import EventCategoryService from "../../../services/EventCategoryServices"
import JoditEditor from "jodit-react";
import { Container, Row, Col, FormGroup, Label, UncontrolledAlert } from "reactstrap"


const AdminEventAdd = () => {
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
      event_category_id: 1,
      created_user_id: "",
      updated_user_id: "",
    };

    const [currentEvent, setCurrentEvent] = useState(initialEventState);
    const [submitted, setSubmitted] = useState(false);
    const [auth, setAuth] = useState(undefined);
    const [currentEventCategory, setCurrentEventCategory] = useState([]);

    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [contentMember, setContentMember] = useState("");
    const [contentNonMember, setContentNonMember] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    
    useEffect(() => {
      const user = AuthService.getCurrentUser();

      if (user) {
        setAuth(user);
        retrieveEventCategory();
      }
    }, []);

    const retrieveEventCategory = () => {
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

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setCurrentEvent({ ...currentEvent, [name]: value });
    };

    const newEvent = () => {
      setCurrentEvent(initialEventState);
      setSubmitted(false);
    };

    const saveEvent = () => {
      setIsLoading(true)
      var data = {
        title: currentEvent.title,
        date_event: currentEvent.date_event,
        location: currentEvent.location,
        headline: currentEvent.headline,
        content: content,
        content_member_fee: contentMember,
        content_nonmember_fee: contentNonMember,
        event_category_id: currentEvent.event_category_id,
        created_user_id: auth.id,
        updated_user_id: auth.id,
      };

      EventService.create(data).then(
        (response) => {
          setCurrentEvent({
            id: response.data.id,
            title: response.data.title,
            date_event: response.data.date_event,
            location: response.data.location,
            headline: response.data.headline,
            content: response.data.content,
            content_member_fee: response.data.content_member_fee,
            content_nonmember_fee: response.data.content_nonmember_fee,
            event_category_id: response.data.event_category_id,
            created_user_id: response.data.created_user_id,
            updated_user_id: response.data.updated_user_id,
          });
          setSubmitted(true);
          setIsLoading(false)
          window.scrollTo(0,500)
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            window.scrollTo(0, 500)
          setMessage(_content);
          setIsLoading(false)
        }
      );
    };

    return (
      <Container>
      <Row>
        {auth ? (
          <Col>
            <h4>Add Event</h4>
            <hr/>
            <div className="submit-form">
              {submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn-custom btn-success" onClick={newEvent}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  {message && (
                    <UncontrolledAlert color="danger">{message}</UncontrolledAlert>
                  )}
                  <FormGroup>
                    <Label for="event_category_id">Event Category</Label>
                    <select
                      name="event_category_id"
                      id="event_category_id"
                      value={currentEvent.event_category_id}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      {currentEventCategory &&
                        currentEventCategory.map((v, i) => (
                          <option value={v.id}>{v.title}</option>
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
                      value={currentEvent.date_event}
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
                    <Label for="content">Content</Label>

                    <JoditEditor
                      ref={editor}
                      value={content}
                      onChange={(ContentBaru) => setContent(ContentBaru)}
                      name="content"
                    />
                      </FormGroup>
                  <FormGroup className="mt-20">
                    <Label for="content_member_fee">Content Member</Label>
                    <JoditEditor
                      ref={editor}
                      value={contentMember}
                      onChange={(ContentBaru) => setContentMember(ContentBaru)}
                      name="content_member_fee"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="content_nonmember_fee">
                      Content NonMember
                    </Label>
                    <JoditEditor
                      ref={editor}
                      value={contentNonMember}
                      onChange={(ContentBaru) =>
                        setContentNonMember(ContentBaru)
                      }
                      name="content_nonmember_fee"
                    />
                    </FormGroup>
                  <FormGroup>
                        <button onClick={saveEvent} className="btn-custom btn-success" disabled={isLoading}>
                          {isLoading ? (<span>Please Wait</span>) : (<span>Submit</span>)}
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

export default AdminEventAdd;