import http from "../http-common";
import authHeader from "./auth-header";

const getAll = (params) => {
    return http.get("/admin/membership", {
      headers: authHeader(),
      params
    });
};

const getAllForPublic = () => {
  return http.get("/membership", {
    headers: authHeader()
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

const findMembership = (id) => {
  return http.get(`/membership/findMembership/${id}`);
};

const upload = (id, file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("id", id);

  return http.post("/membership/upload", formData);
};

export default {
  getAll,
  findByName,
  create,
  get,
  update,
  remove,
  getAllForPublic,
  findMembership,
  upload
};
