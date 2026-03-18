import {useState} from "react";
import {cartService} from "../services/cartService.js";
import {useCartStore} from "../stores/cartStore.js";

export const useCart = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const setCarts = useCartStore(s => s.setCarts)
    const [filters, setFilters] = useState({
        search: '',
        sortBy: 'created_at',
        sortDirection: 'desc',
        perPage: '',
        page: 1,
    })

    const get = async () => {
        setLoading(true)
        try {
            const {data} = await cartService.index(filters)
            setCarts(data)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    const add = async value => {
        setLoading(true)
        try {
            const {data} = await cartService.store(value)
            setSuccess(data.message)
            if (data.success) {
                await get()
            }
        } catch ({response}) {
            setError(response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const edit = async (value, id) => {
        setLoading(true)
        try {
            const {data} = await cartService.update(value, id)
            setSuccess(data.message)
            if (data.success) {
                await get()
            }
        } catch ({response}) {
            setError(response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const remove = async id => {
        setLoading(true)
        try {
            const {data} = await cartService.destroy(id)
            setSuccess(data.message)
            if (data.success) {
                await get()
            }
        } catch ({response}) {
            setError(response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const clearMessage = () => {
        setError(null)
        setSuccess(null)
    }

    return { loading, error, success, clearMessage, get, add, edit, remove, filters, setFilters};
}