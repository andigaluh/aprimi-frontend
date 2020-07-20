import React, { useState, useEffect, useRef } from "react"
import AuthService from "../../../services/auth.service"
import EventService from "../../../services/EventServices"
import EventCategoryService from "../../../services/EventCategoryServices"
import JoditEditor from "jodit-react";


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
          console.log(response.data);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setCurrentEvent(_content);
          console.log(`aneh : ${_content}`);
        }
      );
    };

    return (
      <div className="list row">
        {auth ? (
          <div className="col-md-12">
            <h4>Add Event</h4>
            <div className="submit-form">
              {submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={newEvent}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="event_category_id">Event Category</label>
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      required
                      value={currentEvent.title}
                      onChange={handleInputChange}
                      name="title"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date_event">Date event</label>
                    <input
                      type="text"
                      className="form-control"
                      id="date_event"
                      required
                      value={currentEvent.date_event}
                      onChange={handleInputChange}
                      name="date_event"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      required
                      value={currentEvent.location}
                      onChange={handleInputChange}
                      name="location"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="headline">Headline</label>
                    <input
                      type="text"
                      className="form-control"
                      id="headline"
                      required
                      value={currentEvent.headline}
                      onChange={handleInputChange}
                      name="headline"
                    />
                  </div>
                  <div className="form-group ">
                    <label htmlFor="content">Content</label>

                    <JoditEditor
                      ref={editor}
                      value={content}
                      onChange={(ContentBaru) => setContent(ContentBaru)}
                      name="content"
                    />
                  </div>
                  <div className="form-group mt-20">
                    <label htmlFor="content_member_fee">Content Member</label>
                    {/* <textarea
                      className="form-control"
                      id="content_member_fee"
                      name="content_member_fee"
                      onChange={handleInputChange}
                    >
                      {currentEvent.content_member_fee}
                    </textarea> */}
                    <JoditEditor
                      ref={editor}
                      value={contentMember}
                      onChange={(ContentBaru) => setContentMember(ContentBaru)}
                      name="content_member_fee"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="content_nonmember_fee">
                      Content NonMember
                    </label>
                    {/*  <textarea
                      className="form-control"
                      id="content_nonmember_fee"
                      name="content_nonmember_fee"
                      onChange={handleInputChange}
                    >
                      {currentEvent.content_nonmember_fee}
                    </textarea> */}
                    <JoditEditor
                      ref={editor}
                      value={contentNonMember}
                      onChange={(ContentBaru) =>
                        setContentNonMember(ContentBaru)
                      }
                      name="content_nonmember_fee"
                    />
                  </div>

                  <button onClick={saveEvent} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h4>UnAuthorized!</h4>
          </div>
        )}
      </div>
    );
}

export default AdminEventAdd;