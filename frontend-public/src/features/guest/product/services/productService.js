import api from "../../../../lib/axios.js";

export const productService = {
    index: (filters) => api.get(`/products?search=${filters.search}&sort_by=${filters.sortBy}&sort_direction=${filters.sortDirection}&per_page=${filters.perPage}&page=${filters.page}`),
    show: id => api.get(`/products/${id}`)
}