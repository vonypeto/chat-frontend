import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox, Alert } from "antd";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector, connect } from "react-redux";
import { setHello } from "redux/actions/Test";
import {
  signIn,
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  signOut,
} from "redux/actions/Auth";
import AuthService from "services/auth-services/BasicAuthServies";
export const LoginComponent = (props) => {
  const {
    hideAuthMessage,
    showLoading,

    signIn,
    token,
    loading,
    redirect,
    showMessage,
    message,
  } = props;
  console.log(props);
  let history = useNavigate();

  const data = useSelector((state) => state);
  console.log(data);
  const dispatch = useDispatch();
  const onLogin = (values) => {
    console.log(values);
    // const datas = "your-token-value";
    // dispatch(setHello(values.email));
    console.log(data);
    showLoading();
    signIn(values);
  };

  useEffect(() => {
    // AuthService.setPost({ name: "value", age: 12 })
    //   .then((response) => {
    //     // Handle the response after retrieving the post
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     // Handle any error that occurred during the request
    //   });
  }, []);

  useEffect(() => {
    let cancel = true;
    if (token !== null) {
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
    <>
      <div>
        <div style={{ alignSelf: "center" }}>
          <h1 className="form-title">Login now</h1>
          <motion.div
            initial={{ opacity: 0, marginBottom: 0 }}
            animate={{
              opacity: showMessage ? 1 : 0,
              marginBottom: showMessage ? 20 : 0,
            }}
          >
            <Alert type="error" showIcon message={message}></Alert>
          </motion.div>
          {}
          <Form name="login-form" onFinish={onLogin}>
            <Form.Item
              name="email"
              label="Username: "
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password: "
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-btn"
                block
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>

            <Form.Item name="remember" wrapperCol={{ span: 24 }}>
              <Row justify="space-between">
                <Checkbox className="antd-checkbox-transform">
                  Remember me
                </Checkbox>
                <a href="/auth/forgot-password">Forgot Password?</a>
              </Row>
            </Form.Item>

            <Row justify="center" style={{ marginBottom: "10px" }}>
              <Col>
                <a href="/auth/register">
                  Don't have an account yet? Sign up now.
                </a>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
const mapStateToProps = ({ auth, test }) => {
  const { loading, message, showMessage, token, redirect, signOut } = auth;
  const { hello } = test;
  return { loading, message, showMessage, token, redirect, signOut, hello };
};
const mapDispatchToProps = {
  signIn,
  signOut,
  showAuthMessage,
  showLoading,
  hideAuthMessage,

  setHello,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
