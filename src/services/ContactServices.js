import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
    return http.get("/contact");
};

const get = (id) => {
    return http.get(`/admin/contact/${id}`, {
        headers: authHeader(),
    });
};

const AdminGetAll = (params) => {
    return http.get("/admin/contact", {
        headers: authHeader(),
        params
    });
};

const create = (data) => {
    return http.post("/admin/contact", data, { headers: authHeader() });
};

const update = (id, data) => {
    return http.put(`/admin/contact/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
    return http.delete(`/admin/contact/${id}`, { headers: authHeader() });
};

export default {
    getAll,
    get,
    AdminGetAll,
    create,
    update,
    remove,
};
