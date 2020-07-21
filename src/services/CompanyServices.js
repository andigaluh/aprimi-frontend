import http from "../http-common";
import authHeader from "./auth-header";

const getAll = (params) => {
    return http.get("/admin/membership", {
      headers: authHeader(),
      params
    });
};

const findByName = (title) => {
  return http.get(`/admin/membership?name=${title}`, {
    headers: authHeader(),
  });
};

const create = (data) => {
  return http.post("/membership", data);
};

const get = (id) => {
  return http.get(`/admin/membership/${id}`, {
    headers: authHeader(),
  });
};

const update = (id, data) => {
  return http.put(`/admin/membership/${id}`, data, {
    headers: authHeader(),
  });
};

const remove = (id) => {
  return http.delete(`/admin/membership/${id}`,{
    headers: authHeader()
  });
};

export default {
  getAll,
  findByName,
  create,
  get,
  update,
  remove
};
