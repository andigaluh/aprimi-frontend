import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";
import { Link } from 'react-router-dom'
import NewsServices from '../../../services/NewsServices';
import Pagination from "@material-ui/lab/Pagination";
import ArticleServices from '../../../services/ArticleServices';

const ArticleByUser = (props) => {
    const [currentArticle, setCurrentArticle] = useState([])
    const [searchTitle, setSearchTitle] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const pageSizes = [10, 25, 50, 100];

    const getRequestParams = (searchTitle, page, pageSize) => {
      let params = {};

      if (searchTitle) {
        params["title"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    };
    
    useEffect(() => {
      retrieveArticleByMe();
    }, [page, pageSize]);

    const retrieveArticleByMe = () => {
        const params = getRequestParams(searchTitle, page, pageSize);
        NewsServices.getAllByMe(params).then(
          (response) => {
            const { items, totalPages } = response.data;
            console.log(response);
            setCurrentArticle(items);
            setCount(totalPages);
          },
          (error) => {
            console.log(error);
          }
        );
    }

    const handlePageChange = (event, value) => {
      setPage(value);
    };

    const handlePageSizeChange = (event) => {
      setPageSize(event.target.value);
      setPage(1);
    };

  const hapus = (id) => {
    ArticleServices.removeByMe(id)
      .then((response) => {
        console.log(response.data);
        retrieveArticleByMe()
      })
      .catch((e) => {
        console.log(e);
      });
  }; 
    
    return (
      <Container>
        <Row>
          <Col>
            <h4>Article by you</h4>
            <hr />
            <div className="text-right">
              <Link to={"/user/addArticle"}>
                <button className="color button">Add New Article</button>
              </Link>
            </div>
            <hr />
            <div className="mb-3">
              {"Items per Page: "}
              <select onChange={handlePageSizeChange} value={pageSize}>
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {currentArticle &&
              currentArticle.map((v, k) => (
                <Card body inverse color={k % 2 == 0 ? `primary` : `info`}>
                  <CardTitle>
                    {v.title} - <i>{v.is_published ? `Published ` : `Not Published `}</i>
                    &nbsp;&nbsp;
                    <Link to={`/user/editArticle/${v.id}`}>
                      <span><i className="fas fa-edit"></i></span>
                    </Link>
                    &nbsp;&nbsp;
                    <a href="#" onClick={(id) => hapus(v.id)}>
                      <span><i className="fas fa-trash-alt"></i></span>
                    </a>
                  </CardTitle>
                  <CardText>{v.headline}</CardText>
                    
                </Card>
              ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mt-3 text-right">
              <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
}

export default ArticleByUser;