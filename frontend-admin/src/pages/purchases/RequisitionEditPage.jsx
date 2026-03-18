import {useParams} from 'react-router'
import {useEffect} from 'react'
import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {RequisitionForm, useRequisition} from "../../features/purchases/index.js";

export default function RequisitionEditPage() {
    const {id} = useParams()
    const {show, detail} = useRequisition()

    useEffect(() => {
        (async () => {
            await show(id)
        })()
    }, [id])

    return (
        <AppLayout>
            <RequisitionForm formType="edit" formData={detail}/>
        </AppLayout>
    )
}
