import React from "react";

//Components
import SignUpComponent from "./SignUpComponent";

//CSS
import "./index.css";

//Hooks
import { Row, Col, Card } from "antd";

//Const
const registerIMG =
  "https://firebasestorage.googleapis.com/v0/b/barangay-dev.appspot.com/o/img%2Fregister_background.jpg?alt=media&token=253cdd37-4a4c-4acb-ba8d-dfb6edbf36d6";

const SignUp = () => {
  return (
    <Row className="container" justify="center" align="middle">
      <Card className="auth-login-card">
        <Row>
          <Col xl={12} span={0} className="auth-register-left">
            <img src={registerIMG} alt="" className="photo" />
          </Col>

          <Col
            xl={12}
            span={24}
            style={{ padding: "20px 20px 0px 20px" }}
            className="auth-login-right"
          >
            {/* <LoginForm /> */}
            <SignUpComponent />
          </Col>
        </Row>
      </Card>
    </Row>
  );
};

export default SignUp;
