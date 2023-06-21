import PrivateRoute from "interceptors/PrivateRoute";
import React from "react";
import { Navigate } from "react-router-dom";

import Home from "views/apps-view/home";
const AppRoute = [
  {
    path: "/app",
    element: <PrivateRoute />,
    exact: true,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "",
        element: <Navigate to="home" replace />,
      },
    ],
  },
];

export default AppRoute;
