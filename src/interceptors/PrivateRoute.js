import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (props) => {
  const { token } = props;
  console.log(props, token);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

const mapStateToProps = ({ auth, test }) => {
  const { token } = auth;
  return { token };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
