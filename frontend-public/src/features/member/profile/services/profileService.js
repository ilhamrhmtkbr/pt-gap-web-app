import api from "../../../../lib/axios.js";

export const profileService = {
    update : (data, id) => api.patch(`users/${id}`, data),
    destroy : id => api.delete(`users/${id}`)
}