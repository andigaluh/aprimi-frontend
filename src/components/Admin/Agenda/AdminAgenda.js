import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";
import { Container, Row, Col, Badge } from "reactstrap";
import LoadingSpinner from "../../LoadingSpinner";
import AdminSearch from "../AdminSearch";
import AgendaServices from "../../../services/AgendaServices"

const AdminAgenda = (props) => {
  const [agenda, setAgenda] = useState("");
  const [auth, setCurrentAuth] = useState(undefined);
  const [searchTitle, setSearchTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    const user = AuthService.getCurrentUser();
    setIsLoading(true);
    if (user) {
      setCurrentAuth(user);
      setTimeout(() => {
        retrieveAgenda();
        setIsLoading(false);
      }, 1000);
    }
  }, [page, pageSize]);

  const retrieveAgenda = () => {
    const params = getRequestParams(searchTitle, page, pageSize);

    AgendaServices.AdminGetAll(params).then(
      (response) => {
        const { items, totalPages } = response.data;
        setAgenda(items);
        setCount(totalPages);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setAgenda(_content);
      }
    );
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };



  return (
    <Container>
      {auth ? (
        <div>
          <Row>
            <Col>
              <h4>Admin Agenda</h4>
            </Col>
          </Row>
          <hr />

          <AdminSearch
            onChangeSearchTitle={onChangeSearchTitle}
            searchTitle={searchTitle}
            retrieveTable={retrieveAgenda}
            handlePageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
            pageSizes={pageSizes}
            isAddUrl={true}
            addUrl={"/admin/addAgenda"}
          />
          <hr />

          <Row>
            <Col>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Id</th>
                          <th>Title</th>
                          <th>Start date</th>
                          <th>End date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agenda &&
                          agenda.map((itemAgenda, i) => (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{itemAgenda.id}</td>
                              <td>{itemAgenda.title}</td>
                              <td>
                                {moment(itemAgenda.start_date).format(
                                  "DD-MM-YYYY"
                                )}
                              </td>
                              <td>
                                {moment(itemAgenda.end_date).format(
                                  "DD-MM-YYYY"
                                )}
                              </td>
                              <td>
                                {itemAgenda.is_publish ? `Active` : `NotActive`}
                              </td>
                              <td>
                                <Link to={"/admin/agenda/" + itemAgenda.id}>
                                  <Badge color="primary" pill>
                                    <i className="fas fa-edit"></i> Edit
                                </Badge>
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
            </Col>
          </Row>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </div>
      ) : (
          <div>
            <h4>Unauthorized</h4>
          </div>
        )}
    </Container>
  );
}

export default AdminAgenda;