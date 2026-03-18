import {useState} from "react";
import {useNavigate} from 'react-router'
import {authService} from '../index.js'

export function useRegister() {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()

    const register = async data => {
        try {
            setLoading(true)
            setErrors(null)
            await authService.register(data)
            navigate('/login')
        } catch ({response}) {
            setErrors(response?.data)
        } finally {
            setLoading(false)
        }
    }

    return {register, loading, errors}
}