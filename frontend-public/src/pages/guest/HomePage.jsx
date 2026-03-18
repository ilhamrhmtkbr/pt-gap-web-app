import GuestLayout from "../../shared/layouts/GuestLayout.jsx";
import {ProductData} from "../../features/guest/product/index.js";

export default function HomePage() {
    return (
        <GuestLayout>
            <div className={"font-['Bold',_ui-sans-serif] text-3xl"}>Products</div>
            <ProductData/>
        </GuestLayout>
    )
}