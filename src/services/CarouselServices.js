import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/carousel");
};

const get = (id) => {
  return http.get(`/carousel/${id}`);
};

const AdminGetAll = (params) => {
  return http.get("/admin/carousel", {
    headers: authHeader(),
    params
  });
};

const create = (data) => {
  return http.post("/admin/carousel", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/admin/carousel/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/admin/carousel/${id}`, { headers: authHeader() });
};

const uploadThumbnail = (id, file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("image", file);

  return http.post(`/admin/carousel/${id}/image`, formData, {
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
  uploadThumbnail,
};
