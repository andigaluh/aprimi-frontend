import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/news");
};

const get = (id) => {
  return http.get(`/news/${id}`);
};

const AdminGetAll = (params) => {
  return http.get("/admin/news", {
    headers: authHeader(),
    params
  });
};

/* const create = (data) => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
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
  get,
  AdminGetAll,
  /* create,
  update,
  remove,
  removeAll,
  findByTitle, */
};
