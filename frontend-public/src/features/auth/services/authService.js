import api from '../../../lib/axios.js'

export const authService = {
    login: data => api.post('/auth/login', data),
    register: data => api.post('/auth/register', data),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
    refreshToken: () => api.get('/auth/refresh'),
    loginGoogle: data => api.post('/auth/login-with-google', data),
}
