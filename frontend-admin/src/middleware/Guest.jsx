import { useAuthStore } from '@/features/auth/stores/authStore'
import {Navigate, Outlet} from "react-router";

export default function Guest() {
    const user = useAuthStore((s) => s.user)

    if (user) {
        return <Navigate to="/users" replace />
    }

    return <Outlet />
}
