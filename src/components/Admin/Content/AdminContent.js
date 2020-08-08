import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import ContentService from "../../../services/ContentServices"
import Pagination from "@material-ui/lab/Pagination";
import { Container, Row, Col, Table, Badge } from 'reactstrap'
import LoadingSpinner from "../../LoadingSpinner";
import AdminSearch from "../AdminSearch";

const AdminContent = () => {
    const [content, setContent] = useState("");
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
        if(user) {
            setCurrentAuth(user);
            setTimeout(() => {
                retrieveContent();
                setIsLoading(false)
            }, 1000);
        }
    },[page, pageSize])

    const retrieveContent = () => {
        const params = getRequestParams(searchTitle, page, pageSize);
        ContentService.AdminGetAll(params).then(
            (response) => {
                const { items, totalPages } = response.data;

                setContent(items);
                setCount(totalPages);
            }, 
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
                console.log(`no user ${_content}`);
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
                            <h4>Admin Content</h4>
                        </Col>
                    </Row>
                    <hr/>
                    <AdminSearch
                        onChangeSearchTitle={onChangeSearchTitle}
                        searchTitle={searchTitle}
                        retrieveTable={retrieveContent}
                        handlePageSizeChange={handlePageSizeChange}
                        pageSize={pageSize}
                        pageSizes={pageSizes}
                        isAddUrl={true}
                        addUrl={"/admin/addContent"}
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
                                        <th>url title</th>
                                        <th>Active</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content &&
                                        content.map((konten, i) => (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{konten.id}</td>
                                                <td>{konten.title}</td>
                                                <td>{konten.url_title}</td>
                                                <td>{konten.is_publish ? `Active` : `NotActive`}</td>
                                                <td>
                                                    <Link
                                                        to={"/admin/content/" + konten.id}
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
                <div>
                    <h4>Unauthorized</h4>
                </div>
            )}
        
            
        </Container>
    );
}

export default AdminContent;