import http from "../http-common";
import authHeader from "./auth-header";

const signin = () => {
  return http.post("/auth/signin");
};

const getAll = (params) => {
  return http.get("/admin/users", {
    headers: authHeader(),
    params
  });
};

const get = (id) => {
  return http.get(`/admin/users/${id}`, {
    headers: authHeader(),
  });
};

const update = (id, data) => {
  return http.put(`/admin/users/${id}`, data, {
    headers: authHeader(),
  });
};

const updateByMe = (data) => {
  return http.put(`/users/me`, data, {
    headers: authHeader(),
  });
}

const updatePasswordByMe = (data) => {
  return http.put(`/users/updatePassword`, data, {
    headers: authHeader(),
  });
};

const findByName = (params) => {
  return http.get("/admin/users", {
    headers: authHeader(),
    params,
  });
}

const create = (data) => {
  return http.post("/auth/signup", data);
};

const remove = (id) => {
  return http.delete(`/admin/users/${id}`, {
    headers: authHeader(),
  });
};

const checkPassword = (data) => {
  return http.post(`/users/checkPassword`, data, {
    headers: authHeader(),
  });
};

const getByMe = () => {
  return http.get(`/users/me`, {
    headers: authHeader(),
  });
}

const checkEmail = (data) => {
  return http.post(`/users/checkEmail`, data);
}

const checkEmailEnc = (id) => {
  return http.get(`/users/findEmailEnc/${id}`)
}

const updatePasswordByEmail = (data) => {
  return http.put(`/users/updatePasswordByEmail`, data);
};

export default {
  signin,
  getAll,
  get,
  update,
  findByName,
  create,
  remove,
  updateByMe,
  updatePasswordByMe,
  checkPassword,
  getByMe,
  checkEmail,
  checkEmailEnc,
  updatePasswordByEmail
};
