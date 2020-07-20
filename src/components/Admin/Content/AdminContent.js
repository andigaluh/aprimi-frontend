import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import ContentService from "../../../services/ContentServices"
import Pagination from "@material-ui/lab/Pagination";

const AdminContent = () => {
    const [content, setContent] = useState("");
    const [auth, setCurrentAuth] = useState(undefined);
    const [searchTitle, setSearchTitle] = useState("");

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

        if(user) {
            setCurrentAuth(user);
            retrieveContent();
        }
    },[page, pageSize])

    const retrieveContent = () => {
        const params = getRequestParams(searchTitle, page, pageSize);
        ContentService.AdminGetAll(params).then(
            (response) => {
                const { items, totalPages } = response.data;

                setContent(items);
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
        <div className="col-md-12">
            {auth ? (
                <div>
                    <h4>Admin Content</h4>
                    <div className="list row mb-3">
                        <div className="col-md-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={searchTitle}
                                onChange={onChangeSearchTitle}
                                onKeyUp={retrieveContent}
                            />
                        </div>

                        <div className="col-md-2">
                            <Link to={"/admin/addContent"} className="btn btn-primary">
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
                                    <th>title</th>
                                    <th>url title</th>
                                    <th>Content</th>
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
                                            <td>{konten.content}</td>
                                            <td>{konten.is_publish ? `Active` : `NotActive`}</td>
                                            <td>
                                                <Link
                                                    to={"/admin/content/" + konten.id}
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

export default AdminContent;