import api from '@/lib/axios'

export const suppliersService = {
    index: filters => api.get(`/purchase/supplier?search=${filters.search}&sort_by=${filters.sortBy}&sort_direction=${filters.sortDirection}&per_page=${filters.perPage}&page=${filters.page}`),
    show: id => api.get(`/purchase/supplier/${id}`),
    store: data => api.post(`/purchase/supplier`, data),
    update: (data, id) => api.patch(`/purchase/supplier/${id}`, data),
    destroy: id => api.delete(`/purchase/supplier/${id}`),
}
