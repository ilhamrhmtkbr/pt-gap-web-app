import api from '@/lib/axios'

export const usersService = {
    index: filters => api.get(`/users?search=${filters.search}&sort_by=${filters.sortBy}&sort_direction=${filters.sortDirection}&per_page=${filters.perPage}&page=${filters.page}`),
    show: id => api.get(`/users/${id}`),
    store: data => api.post(`/users`, data),
    update: (data, id) => api.patch(`/users/${id}`, data),
    destroy: id => api.delete(`/users/${id}`),
}
