import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {SuppliersForm} from "../../features/purchases/index.js";

export default function SupplierAddPage() {
    return (
        <AppLayout>
            <SuppliersForm formType="add"/>
        </AppLayout>
    )
}
