import api from '@/lib/axios'

export const authService = {
  login:        (data)  => api.post('/auth/login', data),
  logout:       ()      => api.post('/auth/logout'),
  getMe:        ()      => api.get('/auth/me'),
  refreshToken: ()      => api.post('/auth/refresh'),
}
