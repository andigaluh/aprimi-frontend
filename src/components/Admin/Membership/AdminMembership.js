import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import CompanyService from "../../../services/CompanyServices"
import Pagination from "@material-ui/lab/Pagination";
import { Container, Row, Col, Table, Badge } from 'reactstrap'
import LoadingSpinner from "../../LoadingSpinner";
import AdminSearch from "../AdminSearch";

const AdminMembership = () => {
    const [company, setCompany] = useState("");
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

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setIsLoading(true)
        if (user) {
            setCurrentUser(user);
            setTimeout(() => {
              retrieveCompany();
              setIsLoading(false)
            }, 1000);
        }

    },[page, pageSize]);

    const retrieveCompany = () => {
      const params = getRequestParams(searchTitle, page, pageSize);
      CompanyService.getAll(params).then(
            (response) => {
                const { items, totalPages } = response.data;

                setCompany(items);
                setCount(totalPages);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCompany(_content);
            }
        )
    }

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
        {currentUser ? (
          <div>
            <Row>
              <Col><h4>Admin Membership</h4></Col>
            </Row>
            <hr />
            <AdminSearch 
              onChangeSearchTitle={onChangeSearchTitle}
              searchTitle={searchTitle}
              retrieveTable={retrieveCompany}
              handlePageSizeChange={handlePageSizeChange}
              pageSize={pageSize}
              pageSizes={pageSizes}
              isAddUrl={true}
              addUrl={"/admin/addMembership"}
            />
            <hr/>
            <Row>
              <Col>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Contact Person</th>
                          <th>Email</th>
                          <th>Active</th>
                          <th>Date confirmation</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {company &&
                          company.map((perusahaan, i) => (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{perusahaan.id}</td>
                              <td>{perusahaan.name}</td>
                              <td>{perusahaan.contact_person_name}</td>
                              <td>{perusahaan.contact_person_email}</td>
                              <td>{perusahaan.is_active ? `Active` : `NotActive`}</td>
                              <td>{perusahaan.confirmation_date}</td>
                              <td>
                                <Link
                                  to={"/admin/membership/" + perusahaan.id}
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

export default AdminMembership;