import { useAuthStore } from '../stores/authStore'
import { authService }  from '../services/authService'
import { useNavigate }  from 'react-router'

export function useLogout() {
  const logout   = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try { await authService.logout() } catch (_) { /* ignore */ }
    logout()
    navigate('/login')
  }

  return { logout: handleLogout }
}
