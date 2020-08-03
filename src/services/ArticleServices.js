import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
    return http.get("/news");
};

const getAllFeatured = () => {
  return http.get("/news/featured");
};

const getAllPublished = () => {
  return http.get("/news/published");
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

const create = (data) => {
    return http.post("/admin/news", data, { headers: authHeader() });
};

const update = (id, data) => {
    return http.put(`/admin/news/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
    return http.delete(`/admin/news/${id}`, { headers: authHeader() });
};

const uploadThumbnail = (id, file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("thumbnail", file);

    return http.post(`/admin/news/${id}/thumbnail`, formData, {
        headers: authHeader(),
        onUploadProgress,
    });
};

const uploadFiles = (id, file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);

    return http.post(`/admin/news/${id}/files`, formData, {
        headers: authHeader(),
        onUploadProgress,
    });
};

const createByMe = (data) => {
  return http.post("/news/me", data, { headers: authHeader() });
};

const updateByMe = (id, data) => {
    return http.put(`/news/${id}`, data, { headers: authHeader() });
};

const removeByMe = (id) => {
    return http.delete(`/news/${id}`, { headers: authHeader() });
};

export default {
  getAll,
  getAllFeatured,
  get,
  AdminGetAll,
  create,
  update,
  remove,
  uploadThumbnail,
  uploadFiles,
  getAllPublished,
  createByMe,
  updateByMe,
  removeByMe
};
