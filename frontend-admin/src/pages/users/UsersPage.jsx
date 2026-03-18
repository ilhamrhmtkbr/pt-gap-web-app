import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {UsersData} from '@/features/users'
import {useTranslation} from 'react-i18next'

export default function UsersPage() {
    const {t} = useTranslation()
    return (
        <AppLayout>
            <div className="flex items-center justify-between">
                <h1 className="font-['Bold',_ui-sans-serif] text-[length:var(--x)] capitalize">users</h1>
            </div>
            <UsersData/>
        </AppLayout>
    )
}
