import {useTranslation} from 'react-i18next'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router'
import {useInventories} from '../hooks/useInventories.js'
import {useInventoriesStore} from '../stores/inventoriesStore.js'
import {Spinner} from '@/shared/components/Loading.jsx'
import Pagination from '@/shared/components/Pagination.jsx'
import BottomSheet from '@/shared/components/BottomSheet.jsx'
import NoData from '@/shared/components/NoData.jsx'
import Button from '@/shared/components/Button.jsx'
import FormInput from '@/shared/components/FormInput.jsx'
import Filter from '@/shared/components/Filter.jsx'
import Export from "../../../shared/components/Export.jsx";
import {useDebounce} from "../../../shared/utils/debounce.js";

export const InventoriesData = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const {get, show, loading, detail, setDetail, filters, setFilters} = useInventories()
    const rows = useInventoriesStore(s => s.data)
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
                        label={'search'} name={'search'} id={'search'} value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                    />
                </div>
                <div className={'flex items-center justify-between gap-4 w-max flex-wrap'}>
                    <Export exportPdfUrl={'/products/export/pdf'} exportExcelUrl={'/products/export/excel'} />
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
                                    <th className="h-[63px]">ID</th>
                                    <th className="h-[63px]">Name</th>
                                    <th className="h-[63px]">Picture</th>
                                    <th className="h-[63px]">Tag</th>
                                    <th className="h-[63px]">Author</th>
                                    <th className="h-[63px]">Price</th>
                                    <th className="h-[63px]">Stock</th>
                                    <th className="h-[63px]">Sales</th>
                                    <th className="h-[63px]">Created At</th>
                                    <th className="h-[63px]">Updated At</th>
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
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.id}
                                        </td>
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.name}
                                        </td>
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            <img className={'object-cover max-h-[111px] min-h-[175px] my-4 w-full rounded-[var(--radius-m)]'}
                                                 src={import.meta.env.VITE_APP_IMAGE_PRODUCTS_URL + item.picture} loading={"lazy"} decoding={"async"} alt={item.name}/>
                                        </td>
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.tag}
                                        </td>
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.author}
                                        </td>
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.price}
                                        </td>
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.stock}
                                        </td>
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.sales}
                                        </td>
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.created_at}
                                        </td>
                                        <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                            {item.updated_at}
                                        </td>
                                        <td className="align-middle px-4 border-r-[var(--border-color)] rounded-tr-[var(--radius-m)] rounded-br-[var(--radius-m)] hover:bg-[var(--transsecond-primary-color)] min-h-[63px]">
                                            <div className="flex items-center justify-around gap-[var(--s)]">
                                        <span
                                            onClick={async () => {
                                                await show(item.id)
                                            }}
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
                        </div>}

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
                        <br/>
                        <div className={'w-full flex justify-center gap-4'}>
                            <Button variety={'button'} shape={'shape-4'} text={t('common.edit')}
                                    onClick={() => navigate(`/inventories/edit/${detail?.id}`)}/>
                        </div>
                    </BottomSheet>
                </>
            ) : <NoData/>}
        </>
    )
}
