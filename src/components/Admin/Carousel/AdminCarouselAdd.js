import React, { useState, useEffect, useRef } from "react";
import AuthService from "../../../services/auth.service"
import CarouselService from "../../../services/CarouselServices"
import JoditEditor from "jodit-react";
import { Container, Row, Col, FormGroup, Label, UncontrolledAlert } from "reactstrap"

const AdminCarouselAdd = () => {
    const intialCarouselState = {
        id: null,
        title: "",
        url_title: "",
        url_link: "",
        content: "",
        promo: "",
        promo_link: "",
        is_publish: false,
        created_user_id: 1,
        updated_user_id: 1
    }

    const [currentCarousel, setCurrentCarousel] = useState(intialCarouselState);
    const [submitted, setSubmitted] = useState(false);
    const [auth, setAuth] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false)

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
        setCurrentCarousel({ ...currentCarousel, [name]: value });
    };

    const newCarousel = () => {
        setCurrentCarousel(intialCarouselState);
        setSubmitted(false);
    };

    const saveCarousel = () => {
        setIsLoading(true)
        var data = {
            title: currentCarousel.title,
            url_title: currentCarousel.url_title,
            url_link: currentCarousel.url_link,
            content: content,
            promo: currentCarousel.promo,
            promo_link: currentCarousel.promo_link,
            is_publish: currentCarousel.is_publish,
            created_user_id: auth.id,
            updated_user_id: auth.id
        };

        CarouselService.create(data).then(
            (response) => {
                setCurrentCarousel({
                    id: response.data.id,
                    title: response.data.title,
                    url_title: response.data.url_title,
                    url_link: response.data.url_link,
                    content: response.data.content,
                    promo: response.data.promo,
                    promo_link: response.data.promo_link,
                    is_publish: response.data.is_publish,
                    created_user_id: response.data.created_user_id,
                    updated_user_id: response.data.updated_user_id,
                });
                setSubmitted(true);
                setErrorMsg("");
                setIsLoading(false)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setErrorMsg(_content);
                setIsLoading(false)
            }
        );
    };



    return (
      <Container>
      <Row>
        {auth ? (
          <Col>
            <h4>Add Carousel</h4>
            <hr/>
            <div className="submit-form">
              {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
              )}
              {submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn-custom btn-success" onClick={newCarousel}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      required
                      value={currentCarousel.title}
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
                      value={currentCarousel.url_title}
                      onChange={handleInputChange}
                      name="url_title"
                    />
                      </FormGroup>
                  <FormGroup>
                    <Label for="url_link">URL Link</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="url_link"
                      required
                      value={currentCarousel.url_link}
                      onChange={handleInputChange}
                      name="url_link"
                    />
                      </FormGroup>
                  <FormGroup>
                    <Label for="promo">Promo</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="promo"
                      required
                      value={currentCarousel.promo}
                      onChange={handleInputChange}
                      name="promo"
                    />
                      </FormGroup>
                  <FormGroup>
                    <Label for="promo_link">Promo Link</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="promo_link"
                      required
                      value={currentCarousel.promo_link}
                      onChange={handleInputChange}
                      name="promo_link"
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
                  <button onClick={saveCarousel} className="btn-custom btn-success" disabled={isLoading}>
                    {isLoading ? (
                      <span>Please wait</span>
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

export default AdminCarouselAdd;