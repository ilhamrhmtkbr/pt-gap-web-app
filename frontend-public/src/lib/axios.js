import axios from 'axios'
import { authService, useAuthStore } from "../features/auth/index.js";

// Flag untuk mencegah multiple refresh token request berjalan bersamaan
let isRefreshing = false;

// Antrian request yang gagal 401 saat refresh token sedang berjalan
// Masing-masing entry berisi resolve/reject dari Promise yang sedang menunggu
let failedQueue = [];

/**
 * Memproses semua request yang sedang antri setelah proses refresh selesai.
 * - Jika refresh berhasil (error = null), semua request di-resolve → akan di-retry
 * - Jika refresh gagal (error = ada), semua request di-reject → akan ikut gagal
 */
const processQueue = (error) => {
    failedQueue.forEach(({ resolve, reject }) => {
        error ? reject(error) : resolve();
    });
    failedQueue = [];
};

// Buat instance axios dengan konfigurasi default
const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
    timeout: 10000,
    headers: { "Accept": "application/json" },
    withCredentials: true // wajib agar cookie (access_token, refresh_token) ikut terkirim
})

// ============================================================
// REQUEST INTERCEPTOR
// Dijalankan sebelum setiap request dikirim ke server
// ============================================================
api.interceptors.request.use((config) => {
    // Sisipkan header bahasa jika tersedia di localStorage
    const lang = localStorage.getItem('lang');
    if (lang) config.headers['Accept-Language'] = lang;

    return config;
})

// ============================================================
// RESPONSE INTERCEPTOR
// Dijalankan setelah response diterima dari server
// ============================================================
api.interceptors.response.use(
    // ✅ Jika response sukses, langsung teruskan
    (response) => response,

    // ❌ Jika response error
    async (error) => {
        const originalRequest = error.config;

        // ----------------------------------------------------------
        // CASE 1: Access token expired → coba refresh
        // Kondisi:
        // - Status 401
        // - Bukan request ke /auth/refresh itu sendiri (hindari infinite loop)
        // - Belum pernah di-retry sebelumnya (flag _retry)
        // ----------------------------------------------------------
        if (
            error.response?.status === 401 &&
            !originalRequest.url.includes('/auth/refresh') &&
            !originalRequest._retry
        ) {
            // Jika refresh sedang berjalan, masukkan request ini ke antrian
            // dan tunggu sampai refresh selesai sebelum di-retry
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => api(originalRequest))   // refresh berhasil → retry request
                    .catch(err => Promise.reject(err)); // refresh gagal → ikut gagal
            }

            // Tandai request ini sudah pernah di-retry
            // agar tidak masuk loop retry tak terbatas
            originalRequest._retry = true;

            // Tandai bahwa proses refresh sedang berjalan
            isRefreshing = true;

            try {
                // Minta access token baru menggunakan refresh token (via cookie)
                await authService.refreshToken();

                // Refresh berhasil → beritahu semua request di antrian untuk lanjut
                processQueue(null);

                // Retry request original yang gagal tadi
                return api(originalRequest);

            } catch (refreshError) {
                // Refresh gagal → beritahu semua request di antrian untuk ikut gagal
                processQueue(refreshError);

                // Hapus state auth di Zustand store
                // (gunakan .getState() karena ini bukan React component)
                useAuthStore.getState().logout();

                // Redirect ke halaman login
                window.location.href = import.meta.env.VITE_APP_FRONTEND_PUBLIC_URL + '/login';

                return Promise.reject(refreshError);

            } finally {
                // Apapun hasilnya, reset flag agar refresh berikutnya bisa berjalan
                isRefreshing = false;
            }
        }

        // ----------------------------------------------------------
        // CASE 2: Token benar-benar tidak valid atau tidak ada
        // Kondisi ini terjadi jika:
        // - Status 401 dari endpoint /auth/refresh itu sendiri
        // - Atau server eksplisit bilang token expired/tidak ada
        // → Langsung logout tanpa coba refresh lagi
        // ----------------------------------------------------------
        if (
            error?.response?.status === 401 &&
            (error?.response?.data?.message === 'Token has expired' ||
                error?.response?.data?.message === 'Token not provided')
        ) {
            useAuthStore.getState().logout();
            window.location.href = import.meta.env.VITE_APP_FRONTEND_PUBLIC_URL + '/login';
        }

        // Teruskan error ke caller (komponen/service yang memanggil API)
        return Promise.reject(error);
    }
)

export default api