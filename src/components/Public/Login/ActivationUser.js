import React from 'react';
import { Container, Row, Col } from 'reactstrap'
import LoginHeader from './LoginHeader';
import {Link} from 'react-router-dom'

const ActivationUser = (props) => {
    return (
      <main>
        <LoginHeader />
        <div id="login" className="wrap-bg">
          <Container>
            <Row>
              <Col className="text-center">
                <h4 className="text-success">
                  Your user account already active, please <Link to={"/login"} className="text-warning">LOGIN</Link>
                </h4>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    );
}

export default ActivationUser;