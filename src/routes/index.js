import React from "react";
import AppRoute from "./apps-routes";
import AuthRoute from "./auth-routes";

const routesConfig = [...AuthRoute, ...AppRoute];

export default routesConfig;
