import {Quantity} from "./Quantity.jsx";
import {useCart} from "../hooks/useCart.js";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {formatRupiah, parseRupiah} from "../../../../shared/utils/formatText.js";
import Toast from "../../../../shared/components/Toast.jsx";
import Button from "../../../../shared/components/Button.jsx";
import {useTransaction} from "../../transaction/index.js";
import {Spinner} from "../../../../shared/components/Loading.jsx";

export const CartDataItem = ({data}) => {
    const {edit, success, clearMessage, loading, remove} = useCart()
    const [quantity, setQuantity] = useState(data?.quantity)
    const [totalPrice, setTotalPrice] = useState(0)
    const {t} = useTranslation()
    const {add, success: successBuy, clearMessage: clearMessageBuy, loading: loadingBuy} = useTransaction()

    async function handleUpdateCart(value) {
        if (quantity !== 0) {
            if (value !== quantity) {
                await edit({product_id: data?.product?.id, quantity: value}, data?.id)
                setQuantity(value)
            }
        } else {
            alert(t('alert.minimumProduct'))
        }
    }

    async function handleBuy() {
        await add({items: [{product_id: data?.product?.id, quantity}]})
    }

    async function handleRemove() {
        await remove(data?.product?.id)
    }

    useEffect(() => {
        (() => {
            setTotalPrice(parseRupiah(data?.product?.price) * quantity)
        })()
    }, [quantity]);

    return (
        (loadingBuy || loading) ? <Spinner/> :
            <div
                className="box-border shadow-[var(--box-shadow)] p-[var(--l)] rounded-[var(--radius-m)] grid grid-cols-1 min-[800px]:grid-cols-4 items-center gap-[var(--m)]">
                {success && <Toast type={"success"} message={success} onClose={clearMessage}/>}
                {successBuy && <Toast type={"success"} message={successBuy} onClose={clearMessageBuy}/>}
                <img
                    className={'w-full rounded-[var(--radius-m)] max-w-[253px] min-h-[253px] max-h-[253px] bg-[var(--border-color)] object-cover'}
                    src={import.meta.env.VITE_APP_IMAGE_PRODUCTS_URL + data?.product?.picture} loading={"lazy"}
                    decoding={"async"} alt={data?.product?.picture}/>
                <div>
                    <div className="font-['Bold',_ui-sans-serif] text-[length:var(--l)]">{data?.product?.name}</div>
                    <div
                        className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">Oleh: {data?.product?.author}</div>
                    <div className="font-['Medium',_ui-sans-serif] mt-4">{data?.product?.price}</div>
                    <div
                        className="font-['Light',_ui-sans-serif] text-[length:var(--s)] mt-4">Sales: {data?.product?.sales}</div>
                    <div
                        className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">Stock: {data?.product?.stock}</div>
                    <div
                        className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">Tag: {data?.product?.tag}</div>
                </div>
                <div>
                    <div>
                        <div className="font-['Bold',_ui-sans-serif] text-[length:var(--s)]">Quantity</div>
                        <div className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">{quantity}</div>
                    </div>
                    <div className={'my-2'}>
                        <div className="font-['Bold',_ui-sans-serif] text-[length:var(--s)]">Total Price</div>
                        <div
                            className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">{formatRupiah(totalPrice)}</div>
                    </div>
                    <div>
                        <div className="font-['Bold',_ui-sans-serif] text-[length:var(--s)]">Last Updated</div>
                        <div className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">{data?.updated_at}</div>
                    </div>
                </div>
                <div>
                    <Quantity stock={data?.product?.stock} onChangeQty={value => handleUpdateCart(value)}
                              defaultQty={quantity}/>
                    <br/>
                    <Button variety={'button'} shape={"shape-3"} text={t('buy')} isLoading={loadingBuy}
                            onClick={handleBuy}/>
                    <br/>
                    <div onClick={handleRemove} className={'text-[var(--danger-color)] hover:underline cursor-pointer text-[length:var(--s)]'}>{t('remove')}</div>
                </div>
            </div>
    )
}