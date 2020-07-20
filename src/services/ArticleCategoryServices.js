import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
    return http.get("/news_category");
};

const get = (id) => {
    return http.get(`/news_category/${id}`);
};

const AdminGetAll = (params) => {
    return http.get("/admin/news_category", {
        headers: authHeader(),
        params,
    });
};

export default {
    getAll,
    get,
    AdminGetAll,
};
