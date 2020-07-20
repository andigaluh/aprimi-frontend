import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import UserService from "../../../services/UserService";
import Pagination from "@material-ui/lab/Pagination";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
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

    const retrieveUsers = () => {
      const params = getRequestParams(searchTitle, page, pageSize);

      UserService.getAll(params).then(
        (response) => {
          const { items, totalPages } = response.data;

          setUsers(items);
          setCount(totalPages);
          console.log(response);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setUsers(_content);
          console.log(`no user ${_content}`);
        }
      );
    };

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            retrieveUsers();
        }
    },[page, pageSize]);

    const onChangeSearchTitle = e => {
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
            <h4>Admin Users</h4>
            <div className="list row mb-3">
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                  onKeyUp={retrieveUsers}
                />
              </div>

              <div className="col-md-2">
                <Link to={"/admin/addUser"} className="btn-custom">
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
            <div className="">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Company</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.status ? `Active` : `NotActive`}</td>
                        <td>{user.company.name}</td>
                        <td>
                          <Link
                            to={"/admin/users/" + user.id}
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

export default AdminUsers;