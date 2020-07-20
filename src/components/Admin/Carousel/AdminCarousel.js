import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import Pagination from "@material-ui/lab/Pagination";
import CarouselService from "../../../services/CarouselServices";
//import moment from "moment";

const AdminCarousel = () => {
    const [carousel, setCarousel] = useState("");
    const [auth, setCurrentAuth] = useState(undefined);
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
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentAuth(user);
            retrieveCarousel();
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
        <div className="col-md-12">
            {auth ? (
                <div>
                    <h4>Admin Carousel</h4>
                    <div className="list row mb-3">
                        <div className="col-md-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={searchTitle}
                                onChange={onChangeSearchTitle}
                                onKeyUp={retrieveCarousel}
                            />
                        </div>

                        <div className="col-md-2">
                            <Link to={"/admin/addCarousel"} className="btn btn-primary">
                                + Add
                </Link>
                        </div>
                    </div>
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
                    <div className="list row mb-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Id</th>
                                    <th>Image</th>
                                    <th>title</th>
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
                                                        <Link
                                                            to={"/admin/thumbCarousel/" + carous.id}
                                                            className="badge badge-warning"
                                                        >
                                                            Image
                                                        </Link>
                                                    </div>
                                                ) : (
                                                        <div>
                                                            No Image <br />
                                                            <Link
                                                                to={"/admin/thumbCarousel/" + carous.id}
                                                                className="badge badge-warning"
                                                            >
                                                                Image
                                                            </Link>
                                                        </div>
                                                    )}
                                            </td>
                                            <td>{carous.title}</td>
                                            <td>{carous.is_publish ? `Active` : `NotActive`}</td>
                                            <td>
                                                <Link
                                                    to={"/admin/carousel/" + carous.id}
                                                    className="badge badge-warning"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
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
                    </div>
                </div>
            ) : (
                    <div>
                        <h4>Unauthorized</h4>
                    </div>
                )}
        </div>
    );
}

export default AdminCarousel;