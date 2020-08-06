import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import Pagination from "@material-ui/lab/Pagination";
import CarouselService from "../../../services/CarouselServices";
import { Container, Row, Col, Table, Badge } from 'reactstrap'
import LoadingSpinner from "../../LoadingSpinner";
import AdminSearch from "../AdminSearch";

const AdminCarousel = () => {
    const [carousel, setCarousel] = useState("");
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
                retrieveCarousel();
                setIsLoading(false)    
            }, 1000);
        }
    }, [page, pageSize])

    const retrieveCarousel = () => {
        const params = getRequestParams(searchTitle, page, pageSize);

        CarouselService.AdminGetAll(params).then(
            (response) => {
                const { items, totalPages } = response.data;
                setCarousel(items);
                setCount(totalPages);
                console.log(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCarousel(_content);
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
                            <h4>Admin Carousel</h4>
                        </Col>
                    </Row>
                    <hr/>
                    <AdminSearch
                        onChangeSearchTitle={onChangeSearchTitle}
                        searchTitle={searchTitle}
                        retrieveTable={retrieveCarousel}
                        handlePageSizeChange={handlePageSizeChange}
                        pageSize={pageSize}
                        pageSizes={pageSizes}
                        isAddUrl={true}
                        addUrl={"/admin/addCarousel"}
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
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Active</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carousel &&
                                        carousel.map((carous, i) => (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{carous.id}</td>
                                                <td>
                                                    {carous.image ? (
                                                        <div>
                                                            <img
                                                                src={
                                                                    process.env.REACT_APP_API + "/uploads/carousel/" +
                                                                    carous.image
                                                                }
                                                                width="100"
                                                                alt={carousel.title}
                                                            /><br />
                                                            
                                                        </div>
                                                    ) : (
                                                            <div>
                                                                No Image <br />
                                                            </div>
                                                        )}
                                                    <Link
                                                        to={"/admin/thumbCarousel/" + carous.id}
                                                    >
                                                        <Badge color="info" pill><i className="fas fa-upload"></i> Image</Badge>
                                                            </Link>
                                                </td>
                                                <td>{carous.title}</td>
                                                <td>{carous.is_publish ? `Active` : `NotActive`}</td>
                                                <td>
                                                    <Link
                                                        to={"/admin/carousel/" + carous.id}>
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

export default AdminCarousel;