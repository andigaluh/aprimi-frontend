import React, { useState, useEffect }  from "react";
import AuthService from "../../../services/auth.service";
import { Container, Row, Col, Table } from "reactstrap"

const Profile = () => {
  //const currentUser = AuthService.getCurrentUser();
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

  },[]);

  return (
    <Container>
      {currentUser ? (
        <div>
          <Row>
            <Col>
              <h4>User Profile</h4>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Token</th>
                    <th>Authorities</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{currentUser.id}</td>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.email}</td>
                    <td>
                      {currentUser.accessToken.substring(0, 20)} ...{" "}
                      {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </td>
                    <td>
                      <ul>
                        {currentUser.roles &&
                          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </Table>
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
};

export default Profile;
