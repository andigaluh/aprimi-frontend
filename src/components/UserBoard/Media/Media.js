import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap'
import MediaServices from '../../../services/MediaServices'
const Media = (props) => {
    const [currentMedia, setCurrentMedia] = useState([])
    const [searchTitle, setSearchTitle] = useState("");

    const [page, setPage] = useState(1);
    /* const [count, setCount] = useState(0); */
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
        retrieveMedia()
    },[])

    const retrieveMedia = () => {
        const params = getRequestParams(searchTitle, page, pageSize);
        MediaServices.getAll(params).then(
            (response) => {
                const { items } = response.data;
                setCurrentMedia(items)
                /* setCount(totalPages); */
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentMedia(_content);
                console.log(`no user ${_content}`);
            }
        )
    }

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const handlePageSizeChange = (media) => {
        setPageSize(media.target.value);
        setPage(1);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Media for Komite</h4>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col xs="9">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                        onKeyUp={retrieveMedia}
                    />
                </Col>
                <Col xs="3">
                    {"Items per Page: "}
                    <select onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Filename</th>
                                <th className="text-center">Dowload</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMedia && currentMedia.map((v,k) => (
                                <tr>
                                    <td>{k + 1}</td>
                                    <td>{v.title}</td>
                                    <td>{v.type}</td>
                                    <td>{v.name}</td>
                                    <td className="text-center">
                                        <a href={process.env.REACT_APP_API + "/uploads/media/" + v.name} target="_BLANK" rel="noopener noreferrer">
                                            <span><i className="fas fa-download"></i></span>
                                        </a>
                                    </td>
                                </tr>
                            ))
                                
                            }
                            
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Media;