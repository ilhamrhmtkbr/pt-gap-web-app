import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {RequisitionForm} from "../../features/purchases/index.js";

export default function RequisitionAddPage() {
    return (
        <AppLayout>
            <RequisitionForm formType="add"/>
        </AppLayout>
    )
}
