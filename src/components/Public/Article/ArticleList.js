import React, { useState, useEffect } from "react";
import Item from "./ArticleItem";
import ArticleService from "../../../services/ArticleServices";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import ItemDetail from "./ArticleDetail";

const ArticleList = () => {
  const [article, setArticle] = useState([]);
  let { path } = useRouteMatch();

  useEffect(() => {
    retrieveEvent();
  }, []);

  const retrieveEvent = () => {
    ArticleService.getAllPublished().then((response) => {
      setArticle(response.data);
    });
  };

  return (
    <main>
      <Switch>
        <Route exact path={path}>
          <div className="lernen_banner large bg-blog-detail">
            <div className="container">
              <div className="row">
                <div className="lernen_banner_title">
                  <h1>Latest Article</h1>
                  <div className="lernen_breadcrumb">
                    <div className="breadcrumbs">
                      <span className="first-item">
                        <Link to={"/"}>Homepage</Link>
                      </span>
                      <span className="separator">&gt;</span>
                      <span className="last-item">Article</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="blog" className="wrap-bg">
            <div className="container">
              <div className="row">
                {article &&
                  article.map((v, i) => (
                    <Item
                      key={i}
                      title={v.title}
                      thumbnail={v.thumbnail}
                      headline={v.headline}
                      createdAt={v.createdAt}
                      id={v.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </Route>
        <Route path={`${path}/:articleId/:articleTitle`}>
          <ItemDetail />
        </Route>
      </Switch>
    </main>
  );
};

export default ArticleList;
