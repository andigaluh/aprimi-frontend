import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import Pagination from "@material-ui/lab/Pagination";
import ArticleService from "../../../services/ArticleServices";
//import moment from "moment";
import { Container, Row, Col, Badge } from 'reactstrap'
import LoadingSpinner from "../../LoadingSpinner";
import AdminSearch from "../AdminSearch";

const AdminArticle = () => {
    const [article, setArticle] = useState("");
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
                retrieveArticle();
                setIsLoading(false)
            }, 1000);
            
        }
    }, [page, pageSize])

    const retrieveArticle = () => {
        const params = getRequestParams(searchTitle, page, pageSize);

        ArticleService.AdminGetAll(params).then(
            (response) => {
                const { items, totalPages } = response.data;
                setArticle(items);
                setCount(totalPages);
                console.log(items)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setArticle(_content);
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
                            <h4>Admin Article</h4>
                        </Col>
                    </Row>
                    <hr/>

                    <AdminSearch
                        onChangeSearchTitle={onChangeSearchTitle}
                        searchTitle={searchTitle}
                        retrieveTable={retrieveArticle}
                        handlePageSizeChange={handlePageSizeChange}
                        pageSize={pageSize}
                        pageSizes={pageSizes}
                        isAddUrl={true}
                        addUrl={"/admin/addArticle"}
                    />
                    <hr />
                    
                    <Row>
                        <Col>
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Id</th>
                                        <th>Thumbnail</th>
                                        <th>title</th>
                                        <th>Active</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {article &&
                                        article.map((artikel, i) => (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{artikel.id}</td>
                                                <td>
                                                    {artikel.thumbnail ? (
                                                        <div>
                                                            <img
                                                                src={
                                                                    process.env.REACT_APP_API + "/uploads/news/thumbnail/" +
                                                                    artikel.thumbnail
                                                                }
                                                                width="100"
                                                                alt={artikel.title}
                                                            /><br />
                                                        </div>
                                                    ) : (
                                                            <div>
                                                                No Image <br />
                                                            </div>
                                                        )}
                                                    <Link
                                                        to={"/admin/articleThumb/" + artikel.id}
                                                    >
                                                        <Badge color="info" pill><i className="fas fa-upload"></i> Thumbnail</Badge>
                                                    </Link>    
                                                </td>
                                                <td>{artikel.title}</td>
                                                <td>{artikel.is_publish ? `Active` : `NotActive`}</td>
                                                <td>
                                                    <Link
                                                        to={"/admin/article/" + artikel.id}
                                                    >
                                                        <Badge color="primary" pill><i className="fas fa-edit"></i> Edit</Badge>
                                                </Link>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
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

export default AdminArticle;