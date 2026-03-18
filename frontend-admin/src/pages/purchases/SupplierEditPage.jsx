import {useParams} from 'react-router'
import {useEffect} from 'react'
import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {SuppliersForm, useSuppliers} from "../../features/purchases/index.js";

export default function SupplierEditPage() {
    const {id} = useParams()
    const {show, detail} = useSuppliers()

    useEffect(() => {
        (async () => {
            await show(id)
        })()
    }, [id])

    return (
        <AppLayout>
            <SuppliersForm formType="edit" formData={detail}/>
        </AppLayout>
    )
}
