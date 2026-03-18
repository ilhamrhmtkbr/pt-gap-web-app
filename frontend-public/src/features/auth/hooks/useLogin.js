import {useState} from 'react'
import {useNavigate} from 'react-router'
import {authService, useAuthStore} from '../index.js'

export function useLogin() {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const setAuth = useAuthStore((s) => s.setAuth)
    const navigate = useNavigate()

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

    const loginWithGoogle = async (data) => {
        try {
            setLoading(true)
            setErrors(null)
            const res = await authService.loginGoogle(data)
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

    function clearMessage() {
        setErrors(null)
    }

    return {login, loginWithGoogle, loading, errors, clearMessage}
}
