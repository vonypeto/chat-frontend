import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

function SignUpComponent(props) {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onGoogleLogin = () => {};

  const onFacebookLogin = () => {};
  const onSignUp = (values) => {
    // const datas = values.code;
    form.validateFields().then((values) => {
      // signUp(values);
    });
  };

  const handleRegister = (value) => {};

  const rules = {
    email: [
      {
        required: true,
        message: "Please input your email address",
      },
      {
        type: "email",
        message: "Please enter a validate email!",
      },
    ],
    password: [
      {
        required: true,
        message: "Please input your password",
      },
    ],
    confirm_password: [
      {
        required: true,
        message: "Please confirm your password!",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject("Passwords do not match!");
        },
      }),
    ],
  };

  return (
    <div className="container">
      <div style={{ alignSelf: "center" }}>
        <h1>Sign up</h1>

        <Form
          form={form}
          name="register_form"
          onFinish={handleRegister}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={rules.email}
            label="Email Address :"
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={rules.password}
            label="Password :"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm-password"
            rules={rules.confirm_password}
            label="Confirm Password :"
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-100"
              block
              style={{
                backgroundColor: "#0033cc",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Form.Item>

          <Form.Item name="remember" wrapperCol={{ span: 24 }}>
            <Row justify="space-between">
              <Col>
                <Checkbox className="antd-checkbox-transform">
                  Remember me
                </Checkbox>
              </Col>
              <Col>
                <Checkbox className="antd-checkbox-transform">
                  I agree to the{" "}
                  <a href={"/support/term-condition"}> terms and conditions</a>{" "}
                  and
                  <a href={"/support/privacy-policy"}> privacy policy </a>
                </Checkbox>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row justify="center" gutter={10}>
              <Col>
                <Button
                  className="d-flex justify-content-center text-center  align-items-center "
                  onClick={() => onGoogleLogin()}
                  disabled={loading}
                >
                  <FcGoogle size={18} style={{ marginRight: "10px" }} /> Sign up
                  with Google
                </Button>
              </Col>
              <Col>
                <Button
                  className="d-flex justify-content-center text-center  align-items-center "
                  onClick={() => onFacebookLogin()}
                  disabled={loading}
                >
                  <FaFacebook size={18} style={{ marginRight: "10px" }} />
                  Sign up with Facebook
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row justify="center">
              <Col>
                <a href="/auth/login">Already have an account? Sign in now.</a>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignUpComponent;
