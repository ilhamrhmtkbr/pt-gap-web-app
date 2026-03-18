import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {useNavigate} from 'react-router'
import Button from '@/shared/components/Button.jsx'
import {useTranslation} from 'react-i18next'
import {SuppliersData} from "../../features/purchases/index.js";

export default function SuppliersPage() {
    const navigate = useNavigate()
    const {t} = useTranslation()
    return (
        <AppLayout>
            <div className="flex items-center justify-between">
                <h1 className="font-['Bold',_ui-sans-serif] text-[length:var(--x)] capitalize">Suppliers</h1>
                <Button variety="button" shape="shape-2" text={t('common.add')}
                        onClick={() => navigate('/purchases/suppliers/add')}/>
            </div>
            <SuppliersData/>
        </AppLayout>
    )
}
