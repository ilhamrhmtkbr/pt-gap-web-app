import api from '@/lib/axios'

export const salesService = {
  index:       filters => api.get(`/sales?search=${filters.search}&sort_by=${filters.sortBy}&sort_direction=${filters.sortDirection}&per_page=${filters.perPage}&page=${filters.page}`),
  show:        id      => api.get(`/sales/${id}`),
}
