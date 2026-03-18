import {useParams} from 'react-router'
import {useEffect} from 'react'
import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {InventoriesForm, useInventories} from '@/features/inventories'

export default function InventoriesEditPage() {
    const {id} = useParams()
    const {show, detail} = useInventories()

    useEffect(() => {
        (async () => {
            await show(id)
        })()
    }, [id])

    return (
        <AppLayout>
            <InventoriesForm formType="edit" formData={detail}/>
        </AppLayout>
    )
}
