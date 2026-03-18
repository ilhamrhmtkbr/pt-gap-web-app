import {useTranslation} from "react-i18next";
import {useTransaction} from "../hooks/useTransaction.js";
import {useTransactionStore} from "../stores/transactionStore.js";
import {useEffect, useState} from "react";
import {Spinner} from "../../../../shared/components/Loading.jsx";
import Pagination from "../../../../shared/components/Pagination.jsx";
import BottomSheet from "../../../../shared/components/BottomSheet.jsx";
import {useProduct} from "../../../guest/product/index.js";
import Button from "../../../../shared/components/Button.jsx";
import FormInput from "../../../../shared/components/FormInput.jsx";
import Filter from "../../../../shared/components/Filter.jsx";
import NoData from "../../../../shared/components/NoData.jsx";
import {useDebounce} from "../../../../shared/utils/debounce.js";
import Toast from "../../../../shared/components/Toast.jsx";

export const TransactionsData = () => {
    const {t} = useTranslation()
    const {get, loading, remove, filters, setFilters, error, clearMessage} = useTransaction()
    const {show, loading: loadingProduct, product, setProduct} = useProduct()
    const [totalPrice, setTotalPrice] = useState(null)
    const [qty, setQty] = useState(null)
    const [midtransUrl, setMidtransUrl] = useState(null)
    const rows = useTransactionStore(s => s.transactions)
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

    async function handlePay(id, total_price, quantity, url) {
        await show(id)
        setTotalPrice(total_price)
        setQty(quantity)
        setMidtransUrl(url)
    }

    async function handleCancel(id) {
        await remove(id)
    }

    useEffect(() => {
        setFilters(ps => ({...ps, search: debouncedSearch, page: 1}))
    }, [debouncedSearch])

    return (
        <>
            {error && <Toast type={'danger'} onClose={clearMessage} message={error}/>}
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
            {
                rows?.data?.length > 0 ?
                    (loading || loadingProduct) ? <Spinner/> :
                        <>
                            <div
                                className="table-box overflow-auto text-[length:var(--s)] [&::-webkit-scrollbar]:w-[9px] [&::-webkit-scrollbar]:h-[9px]">
                                <table className="w-full whitespace-nowrap border-separate border-spacing-0">
                                    <thead>
                                    <tr className="[&_th]:bg-[var(--sidebar-color)] [&_th]:border-y [&_th]:border-y-[var(--border-color)] [&_th]:px-4 [&_th]:vertical-middle">
                                        <th className="border-l border-l-[var(--border-color)] rounded-tl-[var(--radius-m)] rounded-bl-[var(--radius-m)] h-[63px]">No</th>
                                        <th className="h-[63px]">{t('id')}</th>
                                        <th className="h-[63px]">{t('quantity')}</th>
                                        <th className="h-[63px]">{t('total-price')}</th>
                                        <th className="h-[63px]">{t('status')}</th>
                                        <th className="h-[63px]">{t('created_at')}</th>
                                        <th className="h-[63px]">{t('updated_at')}</th>
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
                                                {item.products[0]?.quantity}
                                            </td>
                                            <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                                {item.total_price}
                                            </td>
                                            <td className="align-middle px-4 text-center [hyphens:auto] break-words [overflow-wrap:break-word] whitespace-normal min-h-[63px] h-[63px] hover:bg-[var(--transsecond-primary-color)]">
                                                {item.status}
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
                                                onClick={() => handlePay(item.products[0]?.product_id, item.total_price, item.products[0]?.quantity, item.midtrans_data?.redirect_url)}
                                                className="cursor-pointer text-[var(--primary-color)] text-[length:var(--s)] capitalize font-['Medium',_sans-serif] hover:underline">
                                                    {t('pay')}
                                            </span>
                                                    <span onClick={() => handleCancel(item.id)}
                                                          className="cursor-pointer text-[var(--danger-color)] text-[length:var(--s)] capitalize font-['Medium',_sans-serif] hover:underline">
                                                    {t('cancel')}
                                            </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                currentPage={rows?.meta?.current_page}
                                totalPages={rows?.meta?.last_page}
                                perPage={rows?.meta?.per_page}
                                onPageChange={page => setFilters(prev => ({...prev, page}))}
                                onPerPageChange={perPage => setFilters(prev => ({...prev, perPage, page: 1}))}
                            />
                            <BottomSheet show={product !== null} onClose={() => setProduct(null)}>
                                <div
                                    className="box-border shadow-[var(--box-shadow)] p-[var(--l)] rounded-[var(--radius-m)] grid grid-cols-1 min-[800px]:grid-cols-3 items-center gap-[var(--m)]">
                                    <img
                                        className={'w-full rounded-[var(--radius-m)] max-w-[253px] min-h-[253px] max-h-[253px] bg-[var(--border-color)] object-cover'}
                                        src={import.meta.env.VITE_APP_IMAGE_PRODUCTS_URL + product?.picture}
                                        loading={"lazy"}
                                        decoding={"async"} alt={product?.picture}/>
                                    <div>
                                        <div
                                            className="font-['Bold',_ui-sans-serif] text-[length:var(--l)]">{product?.name}</div>
                                        <div
                                            className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">Oleh: {product?.author}</div>
                                        <div className="font-['Medium',_ui-sans-serif] mt-4">{product?.price}</div>
                                        <div
                                            className="font-['Light',_ui-sans-serif] text-[length:var(--s)] mt-4">Sales: {product?.sales}</div>
                                        <div
                                            className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">Stock: {product?.stock}</div>
                                        <div
                                            className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">Tag: {product?.tag}</div>
                                    </div>
                                    <div>
                                        <div>
                                            <div
                                                className="font-['Bold',_ui-sans-serif] text-[length:var(--s)]">Quantity
                                            </div>
                                            <div
                                                className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">{qty}</div>
                                        </div>
                                        <div className={'my-2'}>
                                            <div className="font-['Bold',_ui-sans-serif] text-[length:var(--s)]">Total
                                                Price
                                            </div>
                                            <div
                                                className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">{totalPrice}</div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>

                                <div
                                    className="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm shadow-sm">
                                    <p className="font-medium">Midtrans masih dalam mode sandbox</p>
                                    <p>
                                        Klik{" "}
                                        <a
                                            href="https://simulator.sandbox.midtrans.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline font-semibold hover:text-blue-600 transition"
                                        >
                                            di sini
                                        </a>{" "}
                                        untuk mencoba simulasi pembayaran.
                                    </p>
                                </div>
                                <div className={'w-full flex justify-center'}>
                                    <Button variety={'button'} shape={'shape-4'} text={t('paid')}
                                            onClick={() => window.location.href = midtransUrl}/>
                                </div>
                            </BottomSheet>
                        </> : <NoData/>
            }
        </>
    )
}