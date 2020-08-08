import http from "../http-common";
import authHeader from "./auth-header";

const getAgendaUser = () => {
    return http.get("/agenda/user", {
        headers: authHeader()
    });
};

const AdminGetAll = (params) => {
    return http.get("/admin/agenda", {
      headers: authHeader(),
      params
    });
} 

const create = (data) => {
    return http.post("/admin/agenda", data, { headers: authHeader() });  
}

const AdminGet = (id) => {
  return http.get(`/admin/agenda/${id}`, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/admin/agenda/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
  return http.delete(`/admin/agenda/${id}`, { headers: authHeader() });
};

export default {
    getAgendaUser,
    AdminGetAll,
    create,
    AdminGet,
    update,
    remove
};
