import {useEffect, useState} from "react";
import {useParams} from "react-router";
import Button from "../../../../shared/components/Button.jsx";
import Breadcrumb from "../../../../shared/components/Breadcrumb.jsx";
import {Spinner} from "../../../../shared/components/Loading.jsx";
import {Quantity, useCart} from "../../../member/cart/index.js";
import {useAuthStore} from "../../../auth/index.js";
import {useTranslation} from "react-i18next";
import {useProduct} from "../index.js";
import {formatRupiah, parseRupiah} from "../../../../shared/utils/formatText.js";
import {HashLink} from "react-router-hash-link";
import Badge from "../../../../shared/components/Badge.jsx";

export function ProductDetail() {
    const {id} = useParams()
    const {show, product, loading} = useProduct()
    const {add, success, error, clearMessage} = useCart()
    const user = useAuthStore(s => s.user)
    const {t} = useTranslation()
    const [quantity, setQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        (async () => await show(id))()
    }, [])

    async function handleAddToCart() {
        if (user) {
            if (user.data?.role !== "user") {
                alert(t('alert.admin'))
            } else {
                if (quantity !== 0) {
                    await add({product_id: id, quantity})
                } else {
                    alert(t('alert.minimumProduct'))
                }
            }
        } else {
            alert(t('auth.login'))
        }
    }

    useEffect(() => {
        (() => {
            if (product) {
                setTotalPrice(parseRupiah(product.price) * quantity)
            }
        })()
    }, [quantity]);

    return (
        loading ?
            <div className={'flex items-center justify-center'}>
                <Spinner/>
            </div> :
            product &&
            <>
                <Breadcrumb/>
                <HashLink to={'/'}>
                    <p className={'text-[var(--link-color)] hover:underline'}>{t('back')}</p>
                </HashLink>
                {success &&
                    <Badge type={'success'} text={success||error} size={'with-close'} onClose={clearMessage}/>}
                <div className={'w-full flex gap-x-10 gap-y-4'}>
                    <img className={'w-full rounded-[var(--radius-m)] max-w-[400px] bg-[var(--border-color)]'}
                         src={import.meta.env.VITE_APP_IMAGE_PRODUCTS_URL + product.picture} loading={"lazy"}
                         decoding={"async"} alt={product.name}/>
                    <div>
                        <div
                            className={"font-['Medium',_ui-sans-serif] text-[length:var(--xxxx)] mt-2"}>{product.name}</div>
                        <div className={"flex items-center justify-between gap-4 flex-wrap mt-2 mb-4"}>
                            <div className={"font-['Light',_ui-sans-serif] text-[length:var(--s)]"}>Author
                                : {product.author}</div>
                            <div
                                className={'px-4 py-1 border-style-default rounded-full w-max text-[length:var(--s)]'}>{product.tag}</div>
                        </div>
                        <div>Sale : {product.sales}</div>
                        <div className={'mb-6'}>Stock : {product.stock}</div>
                        <Quantity stock={product.stock} onChangeQty={value => setQuantity(value)}/>
                        <br/>
                        <Button text={`Add To Cart : ${formatRupiah(totalPrice)}`} shape={'shape-1'} isLoading={false}
                                onClick={handleAddToCart}/>
                    </div>
                </div>
            </>
    )
}