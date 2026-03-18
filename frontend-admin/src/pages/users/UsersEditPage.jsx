import {useParams} from 'react-router'
import {useEffect} from 'react'
import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {UsersForm, useUsers} from '@/features/users'

export default function UsersEditPage() {
    const {id} = useParams()
    const {show, detail} = useUsers()

    useEffect(() => {
        (async () => {
            await show(id)
        })()
    }, [id])

    return (
        <AppLayout>
            <UsersForm formType="edit" formData={detail}/>
        </AppLayout>
    )
}
