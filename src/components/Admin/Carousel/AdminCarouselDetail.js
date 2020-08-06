import React, { useState, useEffect, useRef } from "react";
import CarouselService from "../../../services/CarouselServices";
import AuthService from "../../../services/auth.service";
import JoditEditor from "jodit-react";
import { Container, Row, Col, FormGroup, Label, Alert } from 'reactstrap'

const AdminCarouselDetail = props => {
    const [auth, setAuth] = useState(undefined);
    const initialCarouselState = {
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
    };
    const [currentCarousel, setCurrentCarousel] = useState(initialCarouselState);
    const [message, setMessage] = useState("");

    const editor = useRef(null);
    const [content, setContent] = useState("");

    const Carousel = (id) => {
        CarouselService.get(id).then(
            (response) => {
                setCurrentCarousel(response.data)
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

                setMessage(_content);
                console.log(_content);
            }
        )
    } 

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            Carousel(props.match.params.id);
            setAuth(user);
        }
    }, [props.match.params.id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCurrentCarousel({ ...currentCarousel, [name]: value });
    };

    const update = () => {
        var data = {
          title: currentCarousel.title,
          url_title: currentCarousel.url_title,
          url_link: currentCarousel.url_link,
          content: content,
          promo: currentCarousel.promo,
          promo_link: currentCarousel.promo_link,
          is_publish: currentCarousel.is_publish,
          updated_user_id: auth.id,
        };
        CarouselService.update(currentCarousel.id, data)
          .then(
            (response) => {
              console.log(response.data);
              setMessage("The Carousel was updated successfully!");
            },
            (error) => {
              setMessage(error);
              console.log(`error disini ${error}`);
            }
          )
          .catch((e) => {
            setMessage(e);
            console.log(e);
          });
    };

    const updateStatus = (status) => {
        var data = {
            is_publish: status,
        };

        CarouselService.update(currentCarousel.id, data)
            .then((response) => {
                setCurrentCarousel({ ...currentCarousel, is_publish: status });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const hapus = () => {
        CarouselService.remove(currentCarousel.id)
            .then((response) => {
                console.log(response.data);
                props.history.push("/admin/carousel");
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
            <h4>Detail Carousel</h4>
            <hr/>
            {message && (
              <Alert color="danger">{message}</Alert>
            )}
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
            {currentCarousel.is_publish ? (
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

            <button className="btn-custom btn-danger mr-2" onClick={hapus}>
              Delete
            </button>
                </FormGroup>
          </div>
        ) : (
          <Row>
            <Col>
              <h4>Unauthorized</h4>
            </Col>
          </Row>
        )}
      </Col>
        </Row>
      </Container>
    );




}

export default AdminCarouselDetail;