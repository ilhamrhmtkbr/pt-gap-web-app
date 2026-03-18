import api from "../../../../lib/axios.js";

export const transactionService = {
    index : filters => api.get(`users/transactions?search=${filters.search}&sort_by=${filters.sortBy}&sort_direction=${filters.sortDirection}&per_page=${filters.perPage}&page=${filters.page}`),
    store : data => api.post('users/transactions', data),
    destroy : id => api.delete(`users/transactions/${id}`),
}