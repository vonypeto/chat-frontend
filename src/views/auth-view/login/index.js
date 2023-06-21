import React from "react";

//Components
import LoginForm from "./LoginComponent";
//CSS
import "./index.css";

//Hooks
import { Row, Col, Card } from "antd";

//Const
const loginImgURL =
  "https://firebasestorage.googleapis.com/v0/b/barangay-dev.appspot.com/o/img%2Flogin_background.jpg?alt=media&token=6c4ec02e-2b59-488f-8fde-8d7d97d6a4fa";

const Login = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Row className="container" justify="center" align="middle">
        <Card className="auth-login-card">
          <Row>
            <Col
              xl={12}
              className="auth-login-left"
              style={{ backgroundImage: `url(${loginImgURL})` }}
            ></Col>

            <Col
              xl={12}
              span={24}
              style={{ padding: "20px 20px 0px 20px" }}
              className="auth-login-right"
            >
              <LoginForm />
            </Col>
          </Row>
        </Card>
      </Row>
    </div>
  );
};

export default Login;
