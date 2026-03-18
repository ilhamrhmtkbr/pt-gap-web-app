import {useState} from 'react'
import {usersService} from '../services/usersService.js'
import {useUsersStore} from '../stores/usersStore.js'
import {useNavigate} from "react-router";

export const useUsers = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [detail, setDetail] = useState(null)
    const setData = useUsersStore(s => s.setData)
    const [filters, setFilters] = useState({
        search: '', sortBy: 'created_at', sortDirection: 'desc', perPage: '', page: 1,
    })
    const navigate = useNavigate()

    const get = async () => {
        setLoading(true)
        try {
            const {data} = await usersService.index(filters)
            setData(data)
        } catch (e) {
            setError(e?.response?.data ?? e)
        } finally {
            setLoading(false)
        }
    }

    const show = async id => {
        setLoading(true)
        try {
            const {data} = await usersService.show(id)
            setDetail(data?.data)
        } catch (e) {
            setError(e?.response?.data ?? e)
        } finally {
            setLoading(false)
        }
    }

    const add = async value => {
        setLoading(true)
        try {
            const {data} = await usersService.store(value)
            setSuccess(data.message)
            if (data.success) {
                await get()
            }
        } catch ({response}) {
            setError(response?.data)
        } finally {
            setLoading(false)
        }
    }

    const edit = async (value, id) => {
        setLoading(true)
        try {
            const {data} = await usersService.update(value, id)
            setSuccess(data.message)
            if (data.success) {
                await get()
            }
        } catch ({response}) {
            setError(response?.data)
        } finally {
            setLoading(false)
        }
    }

    const remove = async id => {
        setLoading(true)
        try {
            const {data} = await usersService.destroy(id)
            setSuccess(data.message)
            if (data.success) {
                await get()
            }
            navigate('/users')
        } catch ({response}) {
            setError(response?.data)
        } finally {
            setLoading(false)
        }
    }

    const clearMessage = () => {
        setError(null);
        setSuccess(null)
    }

    return {
        loading,
        error,
        success,
        clearMessage,
        get,
        show,
        add,
        edit,
        remove,
        detail,
        setDetail,
        filters,
        setFilters
    }
}
