import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export const Quantity = ({stock, onChangeQty, defaultQty = 0}) => {
    const {t} = useTranslation()
    const [quantity, setQuantity] = useState(defaultQty)

    useEffect(() => {
        (()=>{
           onChangeQty(quantity)
        })()
    }, [quantity])

    function handleClick(value) {
        if (value<0) {
            if (quantity< 1){
                alert(t('alert.minimumProduct'))
            } else {
                let sum = parseInt(value) + parseInt(quantity)
                setQuantity(sum)
            }
        } else {
            if (quantity===stock) {
                alert(t('alert.maximumProduct'))
            } else {
                let sum = parseInt(value) + parseInt(quantity)
                setQuantity(sum)
            }
        }
    }

    return (
        <div className={'flex items-center justify-center gap-4 w-max'}>
            <div onClick={() => handleClick(-1)} className={'flex items-center justify-center min-h-[32px] min-w-[32px] max-w-[32px] max-h-[32px] border-style-default rounded cursor-pointer'}>-</div>
            <input type={"number"} className={'flex items-center justify-center min-h-[40px] min-w-[40px] max-w-[40px] max-h-[40px] border-style-default shadow-md rounded cursor-pointer pl-2'}
                value={quantity} onChange={e => setQuantity(e.target.value)}/>
            <div onClick={() => handleClick(1)} className={'flex items-center justify-center min-h-[32px] min-w-[32px] max-w-[32px] max-h-[32px] border-style-default rounded cursor-pointer'}>+</div>

        </div>
    )
}