import {ProductDataItem} from "./ProductDataItem.jsx";
import Pagination from "../../../../shared/components/Pagination.jsx";
import { useEffect, useState } from "react";
import {useProduct} from "../index.js";
import Filter from "../../../../shared/components/Filter.jsx";
import FormInput from "../../../../shared/components/FormInput.jsx";
import NoData from "../../../../shared/components/NoData.jsx";
import {useDebounce} from "../../../../shared/utils/debounce.js";

export function ProductData() {
    const {index, loading, products} = useProduct()
    const [filters, setFilters] = useState({
        search: '',
        sortBy: 'created_at',
        sortDirection: 'desc',
        perPage: '',
        page: 1,
    })
    const [searchInput, setSearchInput] = useState('')
    const debouncedSearch = useDebounce(searchInput)


    useEffect(() => {
        (async () => await index(filters))()
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
                        onChange={e => setSearchInput(e.target.value)}
                    />
                </div>
                <div className={'flex items-center justify-between gap-4 w-max flex-wrap'}>
                    <Filter title={'Sort By'} filters={['created_at', 'name']} value={filters.sortBy}
                            onChange={value => setFilters(ps => ({...ps, sortBy: value}))}/>
                    <Filter title={'Sort Direction'} filters={['asc', 'desc']} value={filters.sortDirection}
                            onChange={value => setFilters(ps => ({...ps, sortDirection: value}))}/>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : products?.data?.length > 0 ?
                <div className="grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-[var(--x)_var(--l)] box-border">
                    {products && products.data?.map(product => (
                        <ProductDataItem key={product.id} product={product}/>
                    ))}
                </div> : <NoData />}

            <Pagination
                currentPage={products?.meta?.current_page}
                totalPages={products?.meta?.last_page}
                perPage={products?.meta?.per_page}
                onPageChange={page => setFilters(prev => ({ ...prev, page }))}
                onPerPageChange={perPage => setFilters(prev => ({ ...prev, perPage, page: 1 }))}
            />
        </>
    )
}