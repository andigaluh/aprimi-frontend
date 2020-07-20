import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/content");
};

const getAllAbout = () => {
  return http.get("/about");
};

const getAllWhatWeDo = () => {
  return http.get("/whatwedo");
};

const getSumWhatWeDo = () => {
  return http.get("/whatwedo/summary");
};

const AdminGetAll = (params) => {
  return http.get("/admin/content", { 
    headers: authHeader(), 
    params
  });
};

const findByName = (title) => {
  return http.get(`/admin/content?title=${title}`, {
    headers: authHeader(),
  });
};

const get = (id) => {
  return http.get(`/content/${id}`);
};

const AdminGet = (id) => {
  return http.get(`/admin/content/${id}`, { headers: authHeader() });
};

const getWhatWeDo = () => {
  return http.get("/content/items/what-we-do");
};

const create = (data) => {
  return http.post("/admin/content", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/admin/content/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/admin/content/${id}`, { headers: authHeader() });
};

export default {
  getAll,
  get,
  getWhatWeDo,
  AdminGetAll,
  findByName,
  create,
  update,
  remove,
  AdminGet,
  getAllAbout,
  getAllWhatWeDo,
  getSumWhatWeDo
};
