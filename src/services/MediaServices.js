import http from "../http-common";
import authHeader from "./auth-header";

const getAll = (params) => {
    return http.get("/admin/media", {
        headers: authHeader(),
        params
    });
};

const get = (id) => {
    return http.get(`/media/${id}`);
};

const AdminGetAll = (params) => {
    return http.get("/admin/media", {
        headers: authHeader(),
        params
    });
};

/* const create = (data) => {
    return http.post("/admin/media", data, { headers: authHeader() });
}; */

const update = (id, data) => {
    return http.put(`/admin/media/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
    return http.delete(`/admin/media/${id}`, { headers: authHeader() });
};

const create = (title,file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("title", title);

    return http.post("/admin/media", formData, {
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
    /* uploadFiles */
};
