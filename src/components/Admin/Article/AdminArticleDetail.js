import React, { useState, useEffect, useRef } from "react";
import ArticleService from "../../../services/ArticleServices";
import ArticleCategoryService from "../../../services/ArticleCategoryServices";
import AuthService from "../../../services/auth.service";
import JoditEditor from "jodit-react";
import { Container, Row, Col, FormGroup, Label, Alert } from 'reactstrap'

const AdminArticleDetail = props => {
    const [auth, setAuth] = useState(undefined);
    const initialArticleState = {
        id: null,
        title: "",
        headline: "",
        content: "",
        is_publish: false,
        is_featured: false,
        news_category_id: 1,
        created_user_id: "",
        updated_user_id: "",
    };
    const [currentArticle, setCurrentArticle] = useState(initialArticleState);
    const [message, setMessage] = useState("");
    const [currentArticleCategory, setCurrentArticleCategory] = useState([]);

    const editor = useRef(null);
    const [content, setContent] = useState("");

    const Article = (id) => {
        ArticleService.get(id).then(
            (response) => {
                setCurrentArticle(response.data)
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

                setCurrentArticle(_content);
                setMessage(_content);
                console.log(_content);
            }
        )
    }

    const ArticleCategory = () => {
        ArticleCategoryService.AdminGetAll().then(
            (response) => {
                setCurrentArticleCategory(response.data);
                console.log(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentArticleCategory(_content);
                console.log(_content);
            }
        )
    }

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            Article(props.match.params.id);
            ArticleCategory();
            setAuth(user);
        }
    }, [props.match.params.id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCurrentArticle({ ...currentArticle, [name]: value });
    };

    const update = () => {
        var data = {
          title: currentArticle.title,
          headline: currentArticle.headline,
          content: content,
          news_category_id: currentArticle.news_category_id,
          updated_user_id: auth.id,
        };
        ArticleService.update(currentArticle.id, data)
          .then(
            (response) => {
              window.scrollTo(0, 500)
              setMessage("The Article was updated successfully!");
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

        ArticleService.update(currentArticle.id, data)
            .then(() => {
                setCurrentArticle({ ...currentArticle, is_publish: status });
                setMessage("")
            })
            .catch((e) => {
                console.log(e);
            });
    };

  const updateFeatured = (status) => {
    var data = {
      is_featured: status,
    };

    ArticleService.update(currentArticle.id, data)
      .then(() => {
        setCurrentArticle({ ...currentArticle, is_featured: status });
        setMessage("")
      })
      .catch((e) => {
        console.log(e);
      });
  };

    const hapus = () => {
        ArticleService.remove(currentArticle.id)
            .then(() => {
                
                props.history.push("/admin/article");
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
            <h4>Detail Article</h4>
            <hr/>
            {message && (
              <Alert color="success">
                {message}
              </Alert>
                )}
                
              <FormGroup>
                <Label for="news_category_id">Article Category</Label>
                <select
                  value={currentArticle.news_category_id}
                  className="form-control"
                  id="news_category_id"
                  name="news_category_id"
                  onChange={handleInputChange}
                >
                  {currentArticleCategory &&
                    currentArticleCategory.map((event_category, i) => (
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
                  value={currentArticle.title}
                  onChange={handleInputChange}
                  name="title"
                />
                </FormGroup>

              <FormGroup>
                <Label for="headline">Headline</Label>
                <input
                  type="text"
                  className="form-control"
                  id="headline"
                  required
                  value={currentArticle.headline}
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
              <FormGroup>
            <button
              type="submit"
              className="btn-custom btn-success mr-2"
              onClick={update}
            >
              Update
            </button>
            {currentArticle.is_publish ? (
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

                  {currentArticle.is_featured ? (
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

            <button className="btn-custom btn-danger mr-2" onClick={hapus}>
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

export default AdminArticleDetail