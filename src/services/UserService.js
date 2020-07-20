import http from "../http-common";
import authHeader from "./auth-header";

const signin = () => {
  return http.post("/auth/signin");
};

const getAll = (params) => {
  return http.get("/admin/users", {
    headers: authHeader(),
    params
  });
};

const get = (id) => {
  return http.get(`/admin/users/${id}`, {
    headers: authHeader(),
  });
};

const update = (id, data) => {
  return http.put(`/admin/users/${id}`, data, {
    headers: authHeader(),
  });
};

const findByName = (params) => {
  /* return http.get(`/admin/users?name=${title}`, {
    headers: authHeader(),
  }) */
  return http.get("/admin/users", {
    headers: authHeader(),
    params,
  });
}

const create = (data) => {
  return http.post("/auth/signup", data);
};

const remove = (id) => {
  return http.delete(`/admin/users/${id}`, {
    headers: authHeader(),
  });
};

export default {
  signin,
  getAll,
  get,
  update,
  findByName,
  create,
  remove,
};
