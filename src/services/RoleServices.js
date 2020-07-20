import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/role", {
    headers: authHeader(),
  });
};

/* const get = (id) => {
  return http.get(`/admin/users/${id}`, {
    headers: authHeader(),
  });
};

const update = (id, data) => {
  return http.put(`/admin/users/${id}`, data, {
    headers: authHeader(),
  });
};

const findByName = (title) => {
  return http.get(`/admin/users?name=${title}`, {
    headers: authHeader(),
  });
};

const create = (data) => {
  return http.post("/auth/signup", data);
}; */

/* const create = (data) => {
  return http.post("/tutorials", data);
};



const remove = (id) => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
}; */

export default {
  getAll,
  /*signin,
  get,
  update,
  findByName,
  create,
  remove,
  removeAll,
  findByTitle, */
};
