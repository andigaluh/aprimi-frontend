import React, { useState, useEffect } from "react";
import ArticleService from "../../../services/ArticleServices";
import moment from "moment";
import { Link } from "react-router-dom"

const HomeArticle = () => {
  const [featuredArticle, setFeaturedArticle] = useState([]);

  useEffect(() => {
    retrieveFeaturedArticle();
  }, []);

  const retrieveFeaturedArticle = () => {
    ArticleService.getAllFeatured().then((response) => {
      setFeaturedArticle(response.data);
    });
  };

  return (
    <div id="blog" className="wrap-bg wrap-bg-light">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <div className="section-title with-p">
              <h2>See what’s happening in our Blog</h2>
              <div className="bar"></div>
              <p>
                Check out our latest blog/article/publication post. We have
                articles on a range of topics such as the leaving certificate
                and career guidance.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {featuredArticle &&
            featuredArticle.map((article, i) => (
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 blog-single">
                <div className="themeioan_blog">
                  <article>
                    <div className="blog-photo">
                      <Link to={"/article/" + article.id + "/" + article.title.split(' ').join('-')}>
                        {article.thumbnail ? (
                          <img
                            src={
                              process.env.REACT_APP_API +
                              "/uploads/news/thumbnail/" +
                              article.thumbnail
                            }
                            alt={article.title}
                          />
                        ) : (
                          <img
                            src={
                              process.env.REACT_APP_API +
                              "/uploads/news/thumbnail/default.jpg"
                            }
                            alt={article.title}
                          />
                        )}
                      </Link>
                    </div>
                    <div className="blog-content">
                      <div className="course-viewer">
                        <ul>
                          <li>
                            <i className="fas fa-calendar"></i>
                            {moment(article.createdAt).format("DD/MM/YYYY")}
                          </li>
                        </ul>
                      </div>
                      <h5 className="title">
                        <Link to={"/article/" + article.id + "/" + article.title.split(' ').join('-')}>{article.title}</Link>
                      </h5>
                      <p>{article.headline}</p>
                    </div>
                  </article>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeArticle;
