import React, { useContext } from "react"
import { UserContext } from "../../../UserContext";
import { Link } from "react-router-dom";
import "../../../App.css"
import {
  Container,
  Row,
  Col,
} from "reactstrap";

const UserProfile = () => {
  const { userLogin } = useContext(UserContext);
  return (
    <Container>
      <Row>
        <Col>
          <h4>User Profile</h4>
          <hr />
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <strong>Name</strong>
                  </td>
                  <td>: {userLogin.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email</strong>
                  </td>
                  <td>: {userLogin.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Roles</strong>
                  </td>
                  <td>: {userLogin.roles}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-left">
            <Link to={"/user/changePassword"} className="mr-10">
              <button className="color-two button">Change Password</button>
            </Link>
            <Link to={"/user/profile"}>
              <button className="color-two button">Edit Profile</button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>

  );
}

export default UserProfile