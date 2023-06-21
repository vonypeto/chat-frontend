import React, { useEffect } from "react";
import { Row, Col, Form, Input, Button, Checkbox, Alert } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
} from "redux/actions/Auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function SignUpComponent(props) {
  let history = useNavigate();
  const {
    signUp,
    showLoading,
    token,
    loading,
    redirect,
    message,
    showMessage,
    hideAuthMessage,
  } = props;

  const [form] = Form.useForm();

  const onSignUp = (values) => {
    // const datas = values.code;
    showLoading();
    form.validateFields().then((values) => {
      signUp(values);
    });
  };

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
  useEffect(() => {
    let cancel = true;
    if (token !== null) {
      // history("/");
      window.location.replace("/");
    }
    if (showMessage) {
      const timer = setTimeout(hideAuthMessage, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      cancel = false;
    };
  }, [token, showMessage, history, redirect, hideAuthMessage]);
  return (
    <div className="container">
      <div style={{ alignSelf: "center" }}>
        <h1>Sign up</h1>
        <motion.div
          initial={{ opacity: 0, marginBottom: 0 }}
          animate={{
            opacity: showMessage ? 1 : 0,
            marginBottom: showMessage ? 20 : 0,
          }}
        >
          {" "}
          <Alert type="error" showIcon message={message}></Alert>
        </motion.div>
        <Form
          form={form}
          name="register_form"
          onFinish={onSignUp}
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
              loading={loading}
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

SignUpComponent.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
SignUpComponent.defaultProps = {
  otherSignIn: true,
  showForgetPassword: true,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signUp,
  showAuthMessage,
  hideAuthMessage,
  showLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
