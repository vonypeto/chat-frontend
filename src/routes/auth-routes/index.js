import React from "react";
import { Navigate } from "react-router-dom";
import Login from "views/auth-view/login";
import SignUp from "views/auth-view/signup";

const AuthRoute = [
  {
    path: "/",
    element: <Navigate to="/app" replace />,
    exact: true,
    children: [],
  },
  { path: "/auth/login", element: <Login />, exact: true },
  { path: "/auth/register", element: <SignUp />, exact: true },
];

export default AuthRoute;
