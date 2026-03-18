import {useTranslation} from 'react-i18next'
import {useEffect, useState} from 'react'
import {useSales} from '../hooks/useSales.js'
import {useSalesStore} from '../stores/salesStore.js'
import {Spinner} from '@/shared/components/Loading.jsx'
import Pagination from '@/shared/components/Pagination.jsx'
import BottomSheet from '@/shared/components/BottomSheet.jsx'
import NoData from '@/shared/components/NoData.jsx'
import FormInput from '@/shared/components/FormInput.jsx'
import Filter from '@/shared/components/Filter.jsx'
import Export from "../../../shared/components/Export.jsx";
import {useDebounce} from "../../../shared/utils/debounce.js";

export const SalesData = () => {
    const {t} = useTranslation()
    const {get, show, loading, detail, setDetail, filters, setFilters} = useSales()
    const rows = useSalesStore(s => s.data)
    const [searchInput, setSearchInput] = useState('')
    const debouncedSearch = useDebounce(searchInput)

    useEffect(() => {
        (async () => {
            if (rows === null) {
                await get()
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            await get()
        })()
    }, [filters])

    useEffect(() => {
        setFilters(ps => ({...ps, search: debouncedSearch, page: 1}))
    }, [debouncedSearch])

    return (
        <>
            <div className={'flex items-center justify-between gap-4 flex-wrap'}>
                <div className={'max-w-[500px]'}>
                    <FormInput
                        label={'search'} name={'search'} id={'search'}
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                    />
                </div>
                <div className={'flex items-center justify-between gap-4 w-max flex-wrap'}>
                    <Export exportPdfUrl={'/sales/export/pdf'} exportExcelUrl={'/sales/export/excel'}/>
                    <Filter title={'Sort By'} filters={['created_at', 'name']} value={filters.sortBy}
                            onChange={value => setFilters(ps => ({...ps, sortBy: value}))}/>
                    <Filter title={'Sort Direction'} filters={['asc', 'desc']} value={filters.sortDirection}
                            onChange={value => setFilters(ps => ({...ps, sortDirection: value}))}/>
                </div>
            </div>

            {rows?.data?.length > 0 ? (
                <>
                    {loading ? <Spinner/> :
                        <div
                            className="table-box overflow-auto text-[length:var(--s)] [&::-webkit-scrollbar]:w-[9px] [&::-webkit-scrollbar]:h-[9px]">
                            <table className="w-full whitespace-nowrap border-separate border-spacing-0">
                                <thead>
                                <tr className="[&_th]:bg-[var(--sidebar-color)] [&_th]:border-y [&_th]:border-y-[var(--border-color)] [&_th]:px-4 [&_th]:vertical-middle">
                                    <th className="border-l border-l-[var(--border-color)] rounded-tl-[var(--radius-m)] rounded-bl-[var(--radius-m)] h-[63px]">No</th>
                                    <th className="h-[63px]">User</th>
                                    <th className="h-[63px]">Product</th>
                                    <th className="h-[63px]">Quantity</th>
                                    <th className="h-[63px]">Total Price</th>
                                    <th className="h-[63px]">Date</th>
                                    <th className="border-r border-r-[var(--border-color)] rounded-tr-[var(--radius-m)] rounded-br-[var(--radius-m)] h-[63px]">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="[&_tr:nth-child(even)]:bg-[var(--sidebar-color)]">
                                {rows?.data?.map((item, index) => (
                                    <tr key={item.id ?? index}
                                        className="hover:bg-[var(--sidebar-hover-color)] transition-colors">
                                        <td className="align-middle px-4 text-center border-l-[var(--border-color)] rounded-tl-[var(--radius-m)] rounded-bl-[var(--radius-m)] hover:bg-[var(--transsecond-primary-color)] min-h-[63px]">
                                            {index + 1}
                                        </td>

                                        {/* User */}
                                        <td className="align-middle px-4 min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={item.user?.avatar ?? import.meta.VITE_APP_IMAGE_USER_URL + item.user?.image}
                                                    alt={item.user?.name}
                                                    className="w-8 h-8 rounded-full object-cover shrink-0"
                                                />
                                                <div className="flex flex-col leading-tight">
                                                    <span className="font-['Medium',_sans-serif]">{item.user?.name}</span>
                                                    <span className="text-[var(--text-secondary-color)] text-xs">{item.user?.email}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Product */}
                                        <td className="align-middle px-4 min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={import.meta.env.VITE_APP_IMAGE_PRODUCTS_URL + item.product?.picture}
                                                    alt={item.product?.name}
                                                    className="w-8 h-8 rounded object-cover shrink-0"
                                                />
                                                <div className="flex flex-col leading-tight">
                                                    <span className="font-['Medium',_sans-serif]">{item.product?.name}</span>
                                                    <span className="text-[var(--text-secondary-color)] text-xs">{item.product?.author}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Quantity */}
                                        <td className="align-middle px-4 text-center min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.quantity}
                                        </td>

                                        {/* Total Price */}
                                        <td className="align-middle px-4 text-center min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.total_price}
                                        </td>

                                        {/* Created At */}
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.created_at}
                                        </td>

                                        {/* Actions */}
                                        <td className="align-middle px-4 border-r-[var(--border-color)] rounded-tr-[var(--radius-m)] rounded-br-[var(--radius-m)] hover:bg-[var(--transsecond-primary-color)] min-h-[63px]">
                                            <div className="flex items-center justify-around gap-[var(--s)]">
                                                <span
                                                    onClick={async () => await show(item.id)}
                                                    className="cursor-pointer text-[var(--primary-color)] text-[length:var(--s)] capitalize font-['Medium',_sans-serif] hover:underline"
                                                >
                                                    {t('common.detail')}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    }

                    <Pagination
                        currentPage={rows?.meta?.current_page}
                        totalPages={rows?.meta?.last_page}
                        perPage={rows?.meta?.per_page}
                        onPageChange={page => setFilters(prev => ({...prev, page}))}
                        onPerPageChange={perPage => setFilters(prev => ({...prev, perPage, page: 1}))}
                    />

                    <BottomSheet show={detail !== null} onClose={() => setDetail(null)}>
                        <div
                            className="box-border shadow-[var(--box-shadow)] p-[var(--l)] rounded-[var(--radius-m)] grid gap-[var(--m)]">
                            <pre className="text-[length:var(--s)]">{JSON.stringify(detail, null, 2)}</pre>
                        </div>
                    </BottomSheet>
                </>
            ) : <NoData/>}
        </>
    )
}