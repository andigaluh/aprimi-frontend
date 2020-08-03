import http from "../http-common";
import authHeader from "./auth-header";

const getAgendaUser = () => {
    return http.get("/agenda/user", {
        headers: authHeader()
    });
};



export default {
    getAgendaUser
};
