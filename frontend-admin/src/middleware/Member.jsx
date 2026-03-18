import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/features/auth/stores/authStore'

export default function Member() {
    const {user, logout} = useAuthStore()

    if (user) {
        let {data} = user
        if (data.role === 'user') {
            logout()
            window.location.href = import.meta.env.VITE_APP_FRONTEND_PUBLIC_URL
        }
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
