import axios from "axios";
import { API_BASE_URL } from "configs/AppConfig";
import history from "../history";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { notification } from "antd";

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

const ENTRY_ROUTE = "/auth/login";
const TOKEN_PAYLOAD_KEY = "authorization";
const PUBLIC_REQUEST_KEY = "public-request";

service.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem(AUTH_TOKEN);

  if (jwtToken) {
    config.headers[TOKEN_PAYLOAD_KEY] = jwtToken;
  }

  if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
    console.log("errpr");
    redirectToEntryRoute();
  }

  return config;
}, handleRequestError);

service.interceptors.response.use((response) => {
  return response.data;
}, handleResponseError);

function redirectToEntryRoute() {
  history.push(ENTRY_ROUTE);
  // window.location.reload();
}

function handleRequestError(error) {
  notification.error({
    message: "Error",
  });
  return Promise.reject(error);
}

function handleResponseError(error) {
  const notificationParam = {
    message: "",
  };

  if (error.response.status === 400 || error.response.status === 403) {
    handleAuthenticationError(notificationParam);
  } else if (error.response.status === 404) {
    notificationParam.message = "Not Found";
  } else if (error.response.status === 500) {
    notificationParam.message = "Internal Server Errors";
  } else if (error.response.status === 508) {
    notificationParam.message = "Time Out";
  }

  notification.error(notificationParam);

  return Promise.reject(error);
}

function handleAuthenticationError(notificationParam) {
  notificationParam.message = "Authentication Fail";
  notificationParam.description = "Please login again";
  localStorage.removeItem(AUTH_TOKEN);
  redirectToEntryRoute();
}

export default service;
