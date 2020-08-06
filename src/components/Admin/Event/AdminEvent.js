import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import Pagination from "@material-ui/lab/Pagination";
import EventService from "../../../services/EventServices";
import moment from "moment";
import { Container, Row, Col, Table, Badge } from 'reactstrap'
import LoadingSpinner from "../../LoadingSpinner";
import AdminSearch from "../AdminSearch";

const AdminEvent = () => {
    const [event, setEvent] = useState("");
    const [auth, setCurrentAuth] = useState(undefined);
    const [searchTitle, setSearchTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        if (user) {
            setCurrentAuth(user);
            setTimeout(() => {
              retrieveEvent();
              setIsLoading(false)
            }, 1000);
        }
    }, [page, pageSize])

    const retrieveEvent = () => {
        const params = getRequestParams(searchTitle, page, pageSize);

        EventService.AdminGetAll(params).then(
            (response) => {
                const { items, totalPages } = response.data;
                setEvent(items);
                setCount(totalPages);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setEvent(_content);
            }
        )
    }

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

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
                <h4>Admin Event</h4>
              </Col>
            </Row>
            <hr/>
            <AdminSearch
              onChangeSearchTitle={onChangeSearchTitle}
              searchTitle={searchTitle}
              retrieveTable={retrieveEvent}
              handlePageSizeChange={handlePageSizeChange}
              pageSize={pageSize}
              pageSizes={pageSizes}
              isAddUrl={true}
              addUrl={"/admin/addEvent"}
            />
            <hr />
            <Row>
              <Col>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                    <Table hover>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Id</th>
                          <th>title</th>
                          <th>Date event</th>
                          <th>Location</th>
                          <th>Active</th>
                          <th>Thumbnail</th>
                          <th>Attachment</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {event &&
                          event.map((epent, i) => (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{epent.id}</td>
                              <td>{epent.title}</td>
                              <td>{moment(epent.date_event).format("DD/MM/YYYY")}</td>
                              <td>{epent.location}</td>
                              <td>{epent.is_publish ? `Active` : `NotActive`}</td>
                              <td>
                                {epent.thumbnail ? (
                                  <div>
                                    <img
                                      src={
                                        process.env.REACT_APP_API + "/uploads/event/thumbnail/" +
                                        epent.thumbnail
                                      }
                                      width="100"
                                      alt={epent.title}
                                    /><br />
                                  </div>
                                ) : (
                                    <div>
                                      No Image <br />
                                    </div>
                                  )}
                                <Link
                                  to={"/admin/thumbEvent/" + epent.id}
                                >
                                  <Badge color="info" pill><i className="fas fa-upload"></i> Thumbnail</Badge>
                                </Link>
                              </td>
                              <td>
                                {epent.file ? (
                                  <div>
                                    <a href={process.env.REACT_APP_API + "/uploads/event/files/" + epent.file}>Download</a>
                                    <br />
                                  </div>
                                ) : (
                                    <div>
                                      No Files <br />
                                    </div>
                                  )}
                                <Link
                                  to={"/admin/fileEvent/" + epent.id}
                                >
                                  <Badge color="info" pill><i className="fas fa-upload"></i> File</Badge>
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={"/admin/event/" + epent.id}>
                                  <Badge color="primary" pill><i className="fas fa-edit"></i> Edit</Badge>
                            </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
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
          <Row>
            <Col>
              <h4>Unauthorized</h4>
            </Col>
          </Row>
        )}
      </Container>
    );
}

export default AdminEvent;