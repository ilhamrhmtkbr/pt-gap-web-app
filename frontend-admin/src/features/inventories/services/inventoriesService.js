import api from '@/lib/axios'

export const inventoriesService = {
  index:       filters => api.get(`/products?search=${filters.search}&sort_by=${filters.sortBy}&sort_direction=${filters.sortDirection}&per_page=${filters.perPage}&page=${filters.page}`),
  show:        id      => api.get(`/products/${id}`),
  store:       data    => api.post(`/products`, data),
  update:      (data, id) => api.patch(`/products/${id}`, data),
  destroy:     id      => api.delete(`/products/${id}`),
}
