import fetch from "interceptors/FetchInterceptor";

const AuthService = [];
AuthService.Signup = async (data) => {
  return fetch({
    url: "/api/auth/signup",
    method: "POST",
    data: data,
  });
};

AuthService.SignIn = async (data) => {
  return fetch({
    url: "/api/auth/login",
    method: "POST",
    data: data,
  });
};
AuthService.getPost = async (params) => {
  return fetch({
    url: "/api/get",
    method: "POST",
    params,
  });
};

AuthService.setPost = async (data) => {
  return fetch({
    url: "/api/create",
    method: "post",
    data: data,
  });
};
export default AuthService;
