import {useState} from "react";
import {profileService} from "../services/profileService.js";
import {authService, useAuthStore} from "../../../auth/index.js";

export const useProfile = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [success, setSuccess] = useState(null)
    const setAuth = useAuthStore(s=> s.setAuth)

    const edit = async (value, id) => {
        setLoading(true)
        try {
            const {data} = await profileService.update(value, id)
            setSuccess(data?.message)
            if (data) {
                const user = await authService.getMe()
                setAuth(user)
            }
        } catch ({response}) {
            setErrors(response?.data)
        } finally {
            setLoading(false)
        }
    }

    const clearMessage = () => {
        setErrors(null)
        setSuccess(null)
    }

    return {loading, errors, success, edit, clearMessage}
}