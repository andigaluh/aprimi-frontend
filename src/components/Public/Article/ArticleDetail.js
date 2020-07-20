import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import ArticleService from "../../../services/ArticleServices";
import moment from "moment";

const ArticleDetail = () => {
  let { articleId, articleTitle } = useParams();
  const [itemDetail, setItemDetail] = useState({});
  const [createdUser, setCreatedUser] = useState({});

  useEffect(() => {
    retriveEvent(articleId);
    window.scrollTo(0, 0);
  }, [articleId]);

  const retriveEvent = (id) => {
    ArticleService.get(id).then((response) => {
      setItemDetail(response.data);
      setCreatedUser(response.data.created_user);
      console.log(response.data);
    });
  };

  return (
    <div>
      <div className="lernen_banner large bg-blog-detail2">
        <div className="container opac">
          <div className="row">
            <div className="lernen_banner_title">
              <h1>{itemDetail.title}</h1>
              <div className="lernen_breadcrumb">
                <div className="breadcrumbs">
                  <span className="first-item">
                    <Link to={"/"}>Homepage</Link>
                  </span>
                  <span className="separator">&gt;</span>
                  <span className="first-item">
                    <Link to={"/article"}>Article</Link>
                  </span>
                  <span className="separator">&gt;</span>
                  <span className="last-item">{itemDetail.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="blog-detail" className="wrap-bg wrap-bg ">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="blog-content">
                <div className="section-title">
                  <div>
                    <h3>{itemDetail.headline}</h3>
                  </div>
                  <div className="course-viewer">
                    <ul>
                      <li>
                        <i className="fas fa-user"></i> {createdUser.name}
                      </li>
                      <li>
                        <i className="fas fa-calendar"></i>
                        {moment(itemDetail.createdAt).format("D MMM, YYYY")}
                      </li>
                      <li>
                        <i className="fas fa-search-location"></i>{" "}
                        {itemDetail.location}
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: itemDetail.content }}
                ></div>
              </div>
            </div>
            <div class="col-md-12 col-lg-4">
              <div class="relative sidebar-services mt-25">
                <div class="services_image services_bg3 hoverblack">
                  <div class="opac">
                    <h3>Coaching Courses</h3>
                    <p>
                      Open a beautiful store & increase your conversion rates.
                      Deploy a conversion rate optimization.
                    </p>
                    <a href="services-detail.html" class="color-one btn-custom">
                      Get in Touch <i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="detail-widgets widget-category">
                <h4 class="title">Categories</h4>
                <ul>
                  <li>
                    <a href="#">
                      Coaching <span>04</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Building <span>13</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      House <span>22</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Interior <span>19</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Architect <span>14</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div class="detail-widgets widget-tag">
                <h4 class="title">Tags Cloud</h4>
                <ul>
                  <li>
                    <a href="#">Doctor</a>
                  </li>
                  <li>
                    <a href="#">House</a>
                  </li>
                  <li>
                    <a href="#">Interior</a>
                  </li>
                  <li>
                    <a href="#">Coaching</a>
                  </li>
                  <li>
                    <a href="#">Architect</a>
                  </li>
                  <li>
                    <a href="#">Medical</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
