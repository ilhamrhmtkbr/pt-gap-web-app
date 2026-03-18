import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {InventoriesForm} from '@/features/inventories'

export default function InventoriesAddPage() {
    return (
        <AppLayout>
            <InventoriesForm formType="add"/>
        </AppLayout>
    )
}
