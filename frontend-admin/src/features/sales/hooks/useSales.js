import {useState} from 'react'
import {salesService} from '../services/salesService.js'
import {useSalesStore} from '../stores/salesStore.js'

export const useSales = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [detail, setDetail] = useState(null)
    const setData = useSalesStore(s => s.setData)
    const [filters, setFilters] = useState({
        search: '', sortBy: 'created_at', sortDirection: 'desc', perPage: '', page: 1,
    })

    const get = async () => {
        setLoading(true)
        try {
            const {data} = await salesService.index(filters)
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
            const {data} = await salesService.show(id)
            setDetail(data)
        } catch (e) {
            setError(e?.response?.data ?? e)
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
        detail,
        setDetail,
        filters,
        setFilters
    }
}
