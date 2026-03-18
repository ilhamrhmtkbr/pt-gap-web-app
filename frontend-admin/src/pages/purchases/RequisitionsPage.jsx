import AppLayout from '@/shared/layouts/AppLayout.jsx'
import {useNavigate} from 'react-router'
import {useTranslation} from 'react-i18next'
import {RequisitionData} from "../../features/purchases/index.js";
import Button from "../../shared/components/Button.jsx";

export default function SuppliersPage() {
    const navigate = useNavigate()
    const {t} = useTranslation()
    return (
        <AppLayout>
            <div className="flex items-center justify-between">
                <h1 className="font-['Bold',_ui-sans-serif] text-[length:var(--x)] capitalize">Requisition</h1>
                <Button variety="button" shape="shape-2" text={t('common.add')}
                        onClick={() => navigate('/purchases/requisition/add')}/>
            </div>
            <RequisitionData/>
        </AppLayout>
    )
}
