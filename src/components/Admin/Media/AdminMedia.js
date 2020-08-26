import React, { useState, useEffect } from "react";
import AuthService from "../../../services/auth.service";
import Pagination from "@material-ui/lab/Pagination";
import MediaService from "../../../services/MediaServices";
import { Container, Row, Col, Table, Badge } from 'reactstrap'
import LoadingSpinner from "../../LoadingSpinner";
import AdminSearch from "../AdminSearch";

const AdminMedia = () => {

    const [media, setMedia] = useState("");
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
                retrieveMedia();
                setIsLoading(false)
            }, 1000);
        }
    }, [page, pageSize])

    const retrieveMedia = () => {
        const params = getRequestParams(searchTitle, page, pageSize);

        MediaService.AdminGetAll(params).then(
            (response) => {
                const { items, totalPages } = response.data;
                setMedia(items);
                setCount(totalPages);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMedia(_content);
                console.log(`no user ${_content}`);
            }
        )
    }

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const handlePageChange = (media, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (media) => {
        setPageSize(media.target.value);
        setPage(1);
    };

    const hapus = (id) => {
        setIsLoading(true)
        MediaService.remove(id)
            .then(() => {
                setTimeout(() => {
                    retrieveMedia();
                    setIsLoading(false)
                }, 1000);     
                window.location.href("/admin/media");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <Container>
            {auth ? (
                <div>
                    <Row>
                        <Col>
                            <h4>Admin Media</h4>
                        </Col>
                    </Row>
                    <hr/>
                    <AdminSearch
                        onChangeSearchTitle={onChangeSearchTitle}
                        searchTitle={searchTitle}
                        retrieveTable={retrieveMedia}
                        handlePageSizeChange={handlePageSizeChange}
                        pageSize={pageSize}
                        pageSizes={pageSizes}
                        isAddUrl={true}
                        addUrl={"/admin/addMedia"}
                    />
                    <hr />

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
                                        <th>title</th>
                                        <th>Attachment</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {media &&
                                        media.map((med, i) => (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{med.id}</td>
                                                <td>{med.title}</td>

                                                <td>
                                                    {med.name ? (
                                                        <div>
                                                            <a href={process.env.REACT_APP_API + "/uploads/media/" + med.name}>Download</a>
                                                        </div>
                                                    ) : (
                                                            <div>
                                                                No Files <br />

                                                            </div>
                                                        )}
                                                </td>
                                                <td>
                                                    <span onClick={() => hapus(med.id)}>
                                                        <Badge color="danger" pill><i className="fas fa-trash"></i> Delete</Badge>
                                                    </span>


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

export default AdminMedia;