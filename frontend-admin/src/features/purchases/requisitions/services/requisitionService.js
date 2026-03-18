import api from '@/lib/axios'

export const requisitionService = {
    index: filters => api.get(`/purchase/requisition?search=${filters.search}&sort_by=${filters.sortBy}&sort_direction=${filters.sortDirection}&per_page=${filters.perPage}&page=${filters.page}`),
    show: id => api.get(`/purchase/requisition/${id}`),
    store: data => api.post(`/purchase/requisition`, data),
    update: (data, id) => api.patch(`/purchase/requisition/${id}`, data),
    destroy: id => api.delete(`/purchase/requisition/${id}`),
}
