import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import CompanyService from "../../../services/CompanyServices"
import Pagination from "@material-ui/lab/Pagination";

const AdminMembership = () => {
    const [company, setCompany] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);
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

        if (user) {
            setCurrentUser(user);
            retrieveCompany();
        }

    },[page, pageSize]);

    const retrieveCompany = () => {
      const params = getRequestParams(searchTitle, page, pageSize);
      CompanyService.getAll(params).then(
            (response) => {
                const { items, totalPages } = response.data;

                setCompany(items);
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

                setCompany(_content);
                console.log(`no user ${_content}`);
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
      <div className="col-md-12">
        {currentUser ? (
          <div>
            <h4>Admin Membership</h4>
            <div className="list row mb-3">
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                  onKeyUp={retrieveCompany}
                />
              </div>

              <div className="col-md-2">
                <Link to={"/admin/addMembership"} className="btn btn-primary">
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
                    <th>Name</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Active</th>
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
                        <td>
                          <Link
                            to={"/admin/membership/" + perusahaan.id}
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

export default AdminMembership;