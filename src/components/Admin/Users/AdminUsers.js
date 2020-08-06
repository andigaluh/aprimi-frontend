import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import UserService from "../../../services/UserService";
import Pagination from "@material-ui/lab/Pagination";
import { Container, Row, Col, Table, Badge } from "reactstrap"
import LoadingSpinner from "../../LoadingSpinner";
import AdminSearch from "../AdminSearch";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [searchTitle, setSearchTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const pageSizes = [10, 25, 50, 100];

    const getRequestParams = (searchTitle, page, pageSize) => {
      let params = {};

      if (searchTitle) {
        params["name"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    };

    const retrieveUsers = () => {
      const params = getRequestParams(searchTitle, page, pageSize);

      UserService.getAll(params).then(
        (response) => {
          const { items, totalPages } = response.data;

          setUsers(items);
          setCount(totalPages);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setUsers(_content);
          console.log(`no user ${_content}`);
        }
      );
    };

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setIsLoading(true)
        if (user) {
            setCurrentUser(user);
            setTimeout(() => {
              retrieveUsers();
              setIsLoading(false)  
            }, 1000);
        }
    },[page, pageSize]);

    const onChangeSearchTitle = e => {
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
        {currentUser ? (
          <div>
            <Row>
              <Col><h4>Admin Users</h4></Col>
            </Row>
            <hr/>
            <AdminSearch
              onChangeSearchTitle={onChangeSearchTitle}
              searchTitle={searchTitle}
              retrieveTable={retrieveUsers}
              handlePageSizeChange={handlePageSizeChange}
              pageSize={pageSize}
              pageSizes={pageSizes}
              isAddUrl={true}
              addUrl={"/admin/addUser"}
            />
            <hr/>
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
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Company</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.map((user, i) => (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.status ? `Active` : `NotActive`}</td>
                              <td>{user.company.name}</td>
                              <td>
                                <Link
                                  to={"/admin/users/" + user.id}
                                >
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
              <h4>UnAuthorized</h4>
            </Col>
          </Row>
        )}
      </Container>
      
    );
}

export default AdminUsers;