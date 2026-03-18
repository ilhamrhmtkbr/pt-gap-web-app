import api from "../../../../lib/axios.js";

export const cartService = {
    index : filters => api.get(`users/carts?search=${filters.search}&sort_by=${filters.sortBy}&sort_direction=${filters.sortDirection}&per_page=${filters.perPage}&page=${filters.page}`),
    store : data => api.post('users/carts', data),
    update : (data, id) => api.patch(`users/carts/${id}`, data),
    destroy : id => api.delete(`users/carts/${id}`)
}