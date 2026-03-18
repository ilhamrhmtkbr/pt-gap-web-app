import GuestLayout from "../../shared/layouts/GuestLayout.jsx";
import {ProductDetail} from "../../features/guest/product/index.js";

export default function ProductDetailPage() {
    return (
        <GuestLayout>
            <ProductDetail />
        </GuestLayout>
    )
}