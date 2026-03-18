import {useState, useMemo, useEffect} from 'react'

/*
 * Pagination.jsx — Plain React
 *
 * Props:
 *   - currentPage     : halaman aktif sekarang (Number)
 *   - totalPages      : total jumlah halaman (Number)
 *   - perPage         : jumlah item per halaman (Number)
 *   - onPageChange    : callback saat user klik halaman, menerima (pageNumber)
 *   - onPerPageChange : callback saat user ganti per page, menerima (perPage)
 *
 * Cara pake di parent:
 *   const [page, setPage] = useState(1)
 *   const [perPage, setPerPage] = useState(15)
 *
 *   <Pagination
 *       currentPage={page}
 *       totalPages={Math.ceil(total / perPage)}
 *       perPage={perPage}
 *       onPageChange={setPage}
 *       onPerPageChange={p => { setPerPage(p); setPage(1) }}
 *   />
 */

export default function Pagination({
    currentPage = 1,
    totalPages = 1,
    perPage = 15,
    onPageChange,
    onPerPageChange
}) {
    const [perPageLocal, setPerPageLocal] = useState(perPage)

    useEffect(() => {
        setPerPageLocal(perPage)
    }, [perPage])

    function handlePerPageChange(e) {
        const val = Number(e.target.value)
        setPerPageLocal(val)
        onPerPageChange?.(val)
    }

    function handlePageClick(page) {
        if (page < 1 || page > totalPages) return
        onPageChange?.(page)
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

    const btnBase   = 'flex h-[var(--xx)] w-[var(--xx)] items-center justify-center rounded-[var(--radius-s)] border-[var(--border-color)] border text-[length:var(--s)]'
    const btnActive = 'bg-[var(--primary-color)] text-white'
    const btnClick  = 'cursor-pointer transition-colors hover:bg-[var(--primary-color)] hover:text-white'
    const btnDisabled = 'cursor-not-allowed text-gray-400'

    return (
        <div className="flex items-center justify-between gap-4 mt-[var(--m)]">
            {/* Navigasi halaman */}
            {totalPages > 1 && (
                <div className="flex w-max max-w-[77dvw] items-center justify-center gap-[var(--m)] overflow-auto rounded-full bg-[var(--bg-color)] p-[var(--m)_var(--xxxx)] mt-[var(--x)] font-['Medium',_ui-sans-serif] shadow-[var(--border-color)_0px_2px_5px_-1px,var(--border-color)_0px_1px_3px_-1px] border-t border-[var(--border-color)]">

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
            )}

            {/* Per Page selector */}
            <div className="flex items-center gap-4">
                <div className="text-[length:var(--s)] text-gray-500 whitespace-nowrap">Per Page : </div>
                <select
                    value={perPageLocal}
                    onChange={handlePerPageChange}
                    className="text-[length:var(--m)] font-inherit w-full cursor-pointer bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--border-color)] border p-[var(--s)] outline-none box-border h-max rounded-[var(--radius-s)]"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    )
}
