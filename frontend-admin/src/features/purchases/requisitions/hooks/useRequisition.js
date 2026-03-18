import {useState} from 'react'
import {requisitionService} from '../services/requisitionService.js'
import {useRequisitionStore} from "../stores/requisitionStore.js";
import {useNavigate} from "react-router";
import {useInventories} from "../../../inventories/index.js";

export const useRequisition = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [detail, setDetail] = useState(null)
    const setData = useRequisitionStore(s => s.setData)
    const {get:refreshProducts} = useInventories()
    const [filters, setFilters] = useState({
        search: '', sortBy: 'created_at', sortDirection: 'desc', perPage: '', page: 1,
    })
    const navigate = useNavigate()

    const get = async () => {
        setLoading(true)
        try {
            const {data} = await requisitionService.index(filters)
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
            const {data} = await requisitionService.show(id)
            setDetail(data)
        } catch (e) {
            setError(e?.response?.data ?? e)
        } finally {
            setLoading(false)
        }
    }

    const add = async value => {
        setLoading(true)
        try {
            const {data} = await requisitionService.store(value)
            setSuccess(data.message)
            if (data.success) {
                await get()
                await refreshProducts()
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
            const {data} = await requisitionService.update(value, id)
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
            const {data} = await requisitionService.destroy(id)
            setSuccess(data.message)
            if (data.success) {
                await get()
            }
            navigate('/purchases/requisition')
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
