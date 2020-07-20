import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/event");
};

const getAllFeatured = () => {
  return http.get("/event/featured");
};

const getAllPublished = () => {
  return http.get("/event/published");
};

const get = (id) => {
  return http.get(`/event/${id}`);
};

const AdminGetAll = (params) => {
  return http.get("/admin/event", {
    headers: authHeader(),
    params
  });
};

const create = (data) => {
  return http.post("/admin/event", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/admin/event/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/admin/event/${id}`, { headers: authHeader() });
};

const uploadThumbnail = (id, file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("thumbnail", file);

  return http.post(`/admin/event/${id}/thumbnail`, formData, {
    headers: authHeader(),
    onUploadProgress,
  });
};

const uploadFiles = (id, file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post(`/admin/event/${id}/files`, formData, {
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
  uploadFiles,
  getAllFeatured,
  getAllPublished
};
