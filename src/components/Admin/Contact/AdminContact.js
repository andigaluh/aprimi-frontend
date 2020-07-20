import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import Pagination from "@material-ui/lab/Pagination";
import ContactService from "../../../services/ContactServices";
//import moment from "moment";

const AdminContact = () => {
    const [contact, setContact] = useState("");
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
            retrieveContact();
        }
    }, [page, pageSize])

    const retrieveContact = () => {
        const params = getRequestParams(searchTitle, page, pageSize);

        ContactService.AdminGetAll(params).then(
            (response) => {
                const { items, totalPages } = response.data;
                setContact(items);
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

                setContact(_content);
                console.log(`no user ${_content}`);
            }
        )
    }

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const handlePageChange = (contact, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (contact) => {
        setPageSize(contact.target.value);
        setPage(1);
    };


    return (
        <div className="col-md-12">
            {auth ? (
                <div>
                    <h4>Admin Contact</h4>
                    <div className="list row mb-3">
                        <div className="col-md-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={searchTitle}
                                onChange={onChangeSearchTitle}
                                onKeyUp={retrieveContact}
                            />
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contact &&
                                    contact.map((kontak, i) => (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{kontak.id}</td>
                                            <td>{kontak.name}</td>
                                            <td>{kontak.email}</td>
                                            <td>{kontak.subject}</td>
                                            <td>
                                                <Link
                                                    to={"/admin/contact/" + kontak.id}
                                                    className="badge badge-warning"
                                                >
                                                    Detail
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

export default AdminContact;