import {useAuthStore} from "../stores/authStore.js";
import {authService} from "../services/authService.js";
import {useState} from "react";
import {useCartStore} from "../../member/cart/index.js";
import {useTransactionStore} from "../../member/transaction/index.js";

export const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const setAuth = useAuthStore(s => s.setAuth)
    const setCart = useCartStore(s => s.setCarts)
    const setTransaction = useTransactionStore(s => s.setTransactions)

    const logout = async () => {
        setLoading(true)
        setError(null)
        try {
            await authService.logout()
            setAuth(null)
            setCart(null)
            setTransaction(null)
        } catch (err) {
            setError(err.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return {logout, loading, error}
}