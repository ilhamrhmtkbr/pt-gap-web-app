import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {InventoriesData} from '@/features/inventories'
import {useNavigate} from 'react-router'
import Button from '@/shared/components/Button.jsx'
import {useTranslation} from 'react-i18next'

export default function InventoriesPage() {
    const navigate = useNavigate()
    const {t} = useTranslation()
    return (
        <AppLayout>
            <div className="flex items-center justify-between">
                <h1 className="font-['Bold',_ui-sans-serif] text-[length:var(--x)] capitalize">inventories</h1>
                <Button variety="button" shape="shape-2" text={t('common.add')}
                        onClick={() => navigate('/inventories/add')}/>
            </div>
            <InventoriesData/>
        </AppLayout>
    )
}
