import {Link} from "react-router";

export function ProductDataItem({product}) {
    return(
        <Link to={`/products/${product.id}`} className={"box-border shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid auto-rows-max overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300"}>
            <img className={'object-cover max-h-[253px] min-h-[253px] w-full rounded-b-[var(--radius-m)]'}
                 src={import.meta.env.VITE_APP_IMAGE_PRODUCTS_URL + product.picture} loading={"lazy"} decoding={"async"} alt={product.name}/>
            <div className={'p-[var(--m)]'}>
                    <div className="font-['Bold',_ui-sans-serif] text-[length:var(--l)]">{product.name}</div>
                <div className="font-['Light',_ui-sans-serif] text-[length:var(--s)]">Oleh: {product.author}</div>
                <div className={'border-style-default px-4 mt-6 pt-1 rounded-lg w-max'}>{product.price}</div>
            </div>
        </Link>
    )
}