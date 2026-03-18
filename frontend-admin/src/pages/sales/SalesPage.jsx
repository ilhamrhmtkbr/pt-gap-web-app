import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {SalesData} from '@/features/sales'
import {useNavigate} from 'react-router'
import {useTranslation} from 'react-i18next'

export default function SalesPage() {
    const navigate = useNavigate()
    const {t} = useTranslation()
    return (
        <AppLayout>
            <div className="flex items-center justify-between">
                <h1 className="font-['Bold',_ui-sans-serif] text-[length:var(--x)] capitalize">sales</h1>
            </div>
            <SalesData/>
        </AppLayout>
    )
}
