import {useState} from "react";
import {transactionService} from "../services/transactionService.js";
import {useTransactionStore} from "../stores/transactionStore.js";

export const useTransaction = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const setTransactions = useTransactionStore(s => s.setTransactions)
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
            const {data} = await transactionService.index(filters)
            setTransactions(data)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    const add = async value => {
        setLoading(true)
        try {
            const {data} = await transactionService.store(value)
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
            const {data} = await transactionService.destroy(id)
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

    function clearMessage() {
        setSuccess(null)
        setError(null)
    }

    return {get, add, remove, clearMessage, success, loading, error, filters, setFilters};
}