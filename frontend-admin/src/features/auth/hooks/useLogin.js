import { useState } from 'react'
import { useNavigate } from 'react-router'
import { authService } from '../services/authService'
import { useAuthStore } from '../stores/authStore'

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [errors,  setErrors]  = useState(null)
  const setAuth   = useAuthStore((s) => s.setAuth)
  const navigate  = useNavigate()

  const login = async (data) => {
      try {
          setLoading(true)
          setErrors(null)
          const res = await authService.login(data)
          if (res) {
              const user = await authService.getMe()
              setAuth(user)
          }
          navigate('/')
      } catch ({response}) {
          setErrors(response?.data)
      } finally {
          setLoading(false)
      }
  }

  const clearMessage = () => setErrors(null)

  return { login, loading, errors, clearMessage }
}
