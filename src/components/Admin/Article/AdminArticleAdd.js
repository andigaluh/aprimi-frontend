import React, { useState, useEffect, useRef } from "react";
import AuthService from "../../../services/auth.service"
import ArticleService from "../../../services/ArticleServices"
import ArticleCategoryService from "../../../services/ArticleCategoryServices"
import JoditEditor from "jodit-react";

const AdminArticleAdd = () => {
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
    const [submitted, setSubmitted] = useState(false);
    const [auth, setAuth] = useState(undefined);
    const [currentArticleCategory, setCurrentArticleCategory] = useState([]);
    const [errorMsg, setErrorMsg] = useState("")
    
    const editor = useRef(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setAuth(user);
            retrieveArticleCategory();
        }
    }, []);

    const retrieveArticleCategory = () => {
        ArticleCategoryService.AdminGetAll().then(
            (response) => {
                setCurrentArticleCategory(response.data);
                //console.log(response.data);
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentArticle({ ...currentArticle, [name]: value });
    };

    const newArticle = () => {
        setCurrentArticle(initialArticleState);
        setSubmitted(false);
    };

    const saveArticle = () => {
        var data = {
            title: currentArticle.title,
            headline: currentArticle.headline,
            content: content,
            news_category_id: currentArticle.news_category_id,
            created_user_id: auth.id,
            updated_user_id: auth.id,
        };

        ArticleService.create(data).then(
            (response) => {
                setCurrentArticle({
                    id: response.data.id,
                    title: response.data.title,
                    headline: response.data.headline,
                    content: response.data.content,
                    news_category_id: response.data.news_category_id,
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

                setCurrentArticle(_content);
                setErrorMsg(_content);
                console.log(`message : ${_content}`);
            }
        );
    };

    return (
      <div className="list row">
        {auth ? (
          <div className="col-md-12">
            <h4>Add Article</h4>
            <div className="submit-form">
              {submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={newArticle}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <p>{errorMsg}</p>
                  <div className="form-group">
                    <label htmlFor="news_category_id">Article Category</label>
                    <select
                      name="news_category_id"
                      id="news_category_id"
                      value={currentArticle.news_category_id}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      {currentArticleCategory &&
                        currentArticleCategory.map((v, i) => (
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
                    <label htmlFor="content">Content</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1}
                      onBlur={(ContentBaru) => setContent(ContentBaru)}
                      name="content"
                    />
                  </div>

                  <button onClick={saveArticle} className="btn btn-success">
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

export default AdminArticleAdd;