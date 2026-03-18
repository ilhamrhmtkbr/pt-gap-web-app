import {useEffect, useState} from "react";
/*
cara pakenya
    const [searchInput, setSearchInput] = useState('')
    const debouncedSearch = useDebounce(searchInput)
    onChange={e => setSearchInput(e.target.value)}
    value=searchInput
    // Debounced search → reset ke page 1
    useEffect(() => {
        setFilters(ps => ({...ps, search: debouncedSearch, page: 1}))
    }, [debouncedSearch])
 */
export function useDebounce(value, delay = 400) {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(t)
    }, [value, delay])
    return debounced
}