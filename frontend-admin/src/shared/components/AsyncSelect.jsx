import {useEffect, useMemo, useRef, useState} from 'react'
import {removeUnderscoreAndCapitalize} from '../utils/formatText.js'
import {useDebounce} from "../utils/debounce.js";

const inputClass =
    "text-[length:var(--m)] font-inherit w-full cursor-pointer bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--border-color)] border p-[var(--s)] outline-none box-border h-max rounded-[var(--radius-s)]"

export default function AsyncSelect({
                                        label,
                                        id,
                                        name,
                                        error = null,
                                        placeholder = 'Search...',
                                        loading = false,
                                        getData,
                                        dataOptions = [],
                                        dataFilters,
                                        setFilters,
                                        register,
                                        pagination
                                    }) {
    const [open, setOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [search, setSearch] = useState('')

    const containerRef = useRef(null)
    const searchRef = useRef(null)
    const debouncedSearch = useDebounce(search)

    const registerProps = register(name)

    // Fetch setiap dataFilters berubah
    useEffect(() => {
        (async () => await getData())()
    }, [dataFilters])

    // Debounced search → reset ke page 1
    useEffect(() => {
        if (!open) return
        setFilters(ps => ({...ps, search: debouncedSearch, page: 1}))
    }, [debouncedSearch, open])

    // Tutup dropdown jika klik di luar
    useEffect(() => {
        const handler = e => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false)
                setSearch('')
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleOpen = () => {
        setOpen(prev => !prev)
        if (!open) setTimeout(() => searchRef.current?.focus(), 50)
    }

    const handleSelect = (opt) => {
        setSelectedOption(opt)
        registerProps.onChange({target: {name, value: opt.value}})
        setOpen(false)
        setSearch('')
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(()=>{
        if (pagination) {
            setCurrentPage(pagination.current_page)
            setTotalPages(pagination.total)
        }
    },[pagination])

    function handlePageClick(value) {
        if (value < 1 || value > totalPages) return
        setFilters(ps => ({...ps, page: value}))
    }

    // Tampilkan max 5 halaman di sekitar currentPage
    const visiblePages = useMemo(() => {
        const delta = 2
        const left  = Math.max(1, currentPage - delta)
        const right = Math.min(totalPages, currentPage + delta)
        const range = []
        for (let i = left; i <= right; i++) range.push(i)
        return range
    }, [currentPage, totalPages])

    const btnBase   = 'text-[length:var(--s)] cursor-pointer rounded-full border-style-default h-[25px] max-h-[25px] w-[25px] max-w-[25px] flex items-center justify-center'
    const btnActive = 'text-white bg-[var(--primary-color)]'
    const btnClick  = 'hover:text-white hover:bg-[var(--primary-color)]'
    const btnDisabled = 'cursor-not-allowed text-gray-400'

    return (
        <div className="w-full grid auto-rows relative" ref={containerRef}>
            <label className="capitalize font-['Medium',_ui-sans-serif]" htmlFor={id}>
                {removeUnderscoreAndCapitalize(label)}
            </label>

            <button
                type="button"
                id={id}
                onClick={handleOpen}
                className={`${inputClass} text-left flex justify-between items-center`}
            >
                <span className={selectedOption ? '' : 'opacity-40'}>
                    {selectedOption?.label ?? placeholder}
                </span>
                <span className="ml-2 opacity-50 text-xs">▼</span>
            </button>

            {/* Hidden input untuk RHF */}
            <input
                type="hidden"
                ref={registerProps.ref}
                name={registerProps.name}
                value={selectedOption?.value ?? ''}
                onChange={registerProps.onChange}
            />

            {open && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1
                                bg-[var(--bg-color)] border border-[var(--border-color)]
                                rounded-[var(--radius-s)] shadow-lg overflow-hidden">

                    {/* Search */}
                    <div className="p-[var(--s)] border-b border-[var(--border-color)]">
                        <input
                            ref={searchRef}
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={placeholder}
                            className={`${inputClass} border-0 p-0`}
                        />
                    </div>
                    <div className={'py-2 px-1 flex items-center justify-center gap-4 flex-wrap'}>
                        {/* Prev */}
                        <div
                            onClick={() => handlePageClick(currentPage - 1)}
                            className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnClick}`}
                        >&lt;</div>
                        {/* Elipsis kiri */}
                        {visiblePages[0] > 1 && <span className="text-gray-400 px-1">...</span>}
                        {/* Nomor halaman */}
                        {visiblePages.map(page => (
                            <div
                                key={page}
                                onClick={() => handlePageClick(page)}
                                className={`${btnBase} ${btnClick} ${page === currentPage ? btnActive : ''}`}
                            >
                                {page}
                            </div>
                        ))}
                        {/* Elipsis kanan */}
                        {visiblePages[visiblePages.length - 1] < totalPages && (
                            <span className="text-gray-400 px-1">...</span>
                        )}
                        {/* Next */}
                        <div
                            onClick={() => handlePageClick(currentPage + 1)}
                            className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnClick}`}
                        >&gt;</div>
                    </div>

                    {/* Options list */}
                    <ul className="max-h-52 overflow-y-auto">
                        {dataOptions.length === 0 && !loading && (
                            <li className="p-[var(--s)] opacity-50 text-center text-[length:var(--m)]">
                                No results
                            </li>
                        )}
                        {dataOptions.map(opt => (
                            <li
                                key={opt.value}
                                onMouseDown={() => handleSelect(opt)}
                                className={`p-[var(--s)] cursor-pointer text-[length:var(--m)]
                                            hover:bg-[var(--primary-color)] hover:text-white
                                            transition-colors
                                            ${selectedOption?.value === opt.value ? 'font-bold' : ''}`}
                            >
                                {opt.label}
                            </li>
                        ))}
                        {loading && (
                            <li className="p-[var(--s)] opacity-50 text-center text-[length:var(--m)]">
                                Loading...
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {error && (
                <p className="text-sm text-[var(--danger-color)]">
                    {error.message || error}
                </p>
            )}
        </div>
    )
}