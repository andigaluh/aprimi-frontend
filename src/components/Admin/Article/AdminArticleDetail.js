import React, { useState, useEffect, useRef } from "react";
import ArticleService from "../../../services/ArticleServices";
import ArticleCategoryService from "../../../services/ArticleCategoryServices";
import AuthService from "../../../services/auth.service";
import JoditEditor from "jodit-react";

const AdminArticleDetail = props => {
    const [auth, setAuth] = useState(undefined);
    const initialArticleState = {
        id: null,
        title: "",
        headline: "",
        content: "",
        is_publish: false,
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
              console.log(response.data);
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
            .then((response) => {
                setCurrentArticle({ ...currentArticle, is_publish: status });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const hapus = () => {
        ArticleService.remove(currentArticle.id)
            .then((response) => {
                console.log(response.data);
                props.history.push("/admin/article");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
      <div className="col-md-12">
        {auth ? (
          <div className="edit-user">
            <h4>Detail Article</h4>
            <p>{message}</p>
            <form>
              <div className="form-group">
                <label htmlFor="news_category_id">Article Category</label>
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
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={currentArticle.title}
                  onChange={handleInputChange}
                  name="title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="headline">Headline</label>
                <input
                  type="text"
                  className="form-control"
                  id="headline"
                  required
                  value={currentArticle.headline}
                  onChange={handleInputChange}
                  name="headline"
                />
              </div>
              <div className="form-group ">
                <label htmlFor="date_event">Content</label>
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
              onClick={update}
            >
              Update
            </button>
            {currentArticle.is_publish ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updateStatus(true)}
              >
                Publish
              </button>
            )}

            <button className="badge badge-danger mr-2" onClick={hapus}>
              Delete
            </button>
          </div>
        ) : (
          <div>
            <h4>UnAuthorized!</h4>
          </div>
        )}
      </div>
    );
}

export default AdminArticleDetail