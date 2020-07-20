import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/logo");
};

const get = (id) => {
  return http.get(`/logo/${id}`);
};

const AdminGetAll = (params) => {
  return http.get("/admin/logo", {
    headers: authHeader(),
    params
  });
};

const create = (data) => {
  return http.post("/admin/logo", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/admin/logo/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/admin/logo/${id}`, { headers: authHeader() });
};

const uploadThumbnail = (id, file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("image", file);

  return http.post(`/admin/logo/${id}/image`, formData, {
    headers: authHeader(),
    onUploadProgress,
  });
};

export default {
  getAll,
  get,
  AdminGetAll,
  create,
  update,
  remove,
  uploadThumbnail
};
