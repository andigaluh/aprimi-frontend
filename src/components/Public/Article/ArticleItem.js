import React from "react";
import moment from "moment";
import {
  //BrowserRouter as Router,
  //Switch,
  //Route,
  Link,
  //useParams,
  //useRouteMatch,
} from "react-router-dom";

const ArticleItem = (props) => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 blog-single mb25">
      <div className="themeioan_blog">
        <article>
          <div className="blog-photo">
            <Link
              to={
                "/article/" + props.id + "/" + props.title.split(" ").join("-")
              }
            >
              {props.thumbnail ? (
                <img
                  src={
                    process.env.REACT_APP_API +
                    "/uploads/news/thumbnail/" +
                    props.thumbnail
                  }
                  alt={props.title}
                />
              ) : (
                <img
                  src={
                    process.env.REACT_APP_API +
                    "/uploads/news/thumbnail/default.jpg"
                  }
                  alt={props.title}
                />
              )}
            </Link>
          </div>
          <div className="blog-content">
            <h5 className="title">
              <Link
                to={
                  "/article/" +
                  props.id +
                  "/" +
                  props.title.split(" ").join("-")
                }
              >
                {props.title}
              </Link>
            </h5>
            <div className="blog-viewer">
              <ul>
                <li>
                  <i className="fas fa-calendar-alt"></i>{" "}
                  {moment(props.createdAt).format("D MMM, YYYY")}
                </li>
              </ul>
              <p>{props.headline}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleItem;
