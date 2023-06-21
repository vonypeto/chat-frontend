import fetch from "interceptors/FetchInterceptor";

const UserData = [];

UserData.getUser = function (params) {
  return fetch({
    url: "/api/user",
    method: "POST",
    params,
  });
};

UserData.updateUser = function (data) {
  return fetch({
    url: "/api/user/update",
    method: "post",
    data: data,
  });
};
export default UserData;
