import {CartDataItem} from "./CartDataItem.jsx";
import {useCartStore} from "../stores/cartStore.js";
import {useEffect, useState} from "react";
import {useCart} from "../hooks/useCart.js";
import {Spinner} from "../../../../shared/components/Loading.jsx";
import Pagination from "../../../../shared/components/Pagination.jsx";
import {useTranslation} from "react-i18next";
import FormInput from "../../../../shared/components/FormInput.jsx";
import Filter from "../../../../shared/components/Filter.jsx";
import NoData from "../../../../shared/components/NoData.jsx";
import {useDebounce} from "../../../../shared/utils/debounce.js";

export const CartData = () => {
    const {t} = useTranslation()
    const {get, loading, filters, setFilters} = useCart()
    const rows = useCartStore(s => s.carts)
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
                        placeholder={'Ketik Nama Buku'} value={searchInput}
                        onChange={e => setSearchInput(e?.target?.value)}
                    />
                </div>
                <div className={'flex items-center justify-between gap-4 w-max flex-wrap'}>
                    <Filter title={'Sort By'} filters={['created_at', 'name', 'tag']} value={filters.sortBy}
                            onChange={value => setFilters(ps => ({...ps, sortBy: value}))}/>
                    <Filter title={'Sort Direction'} filters={['asc', 'desc']} value={filters.sortDirection}
                            onChange={value => setFilters(ps => ({...ps, sortDirection: value}))}/>
                </div>
            </div>
            {rows?.data?.length > 0 ?
                <>
                    {loading ? <Spinner/> :
                        <div>
                            {rows?.data?.map((data) => (
                                <CartDataItem data={data} key={data.id}/>
                            ))}
                        </div>}
                    <Pagination
                        currentPage={rows?.meta?.current_page}
                        totalPages={rows?.meta?.last_page}
                        perPage={rows?.meta?.per_page}
                        onPageChange={page => setFilters(prev => ({...prev, page}))}
                        onPerPageChange={perPage => setFilters(prev => ({...prev, perPage, page: 1}))}
                    />
                </>
                :
                <NoData/>}
        </>
    )
}