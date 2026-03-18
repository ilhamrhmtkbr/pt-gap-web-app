import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useTranslation} from 'react-i18next'
import {requisitionSchema} from '../schemas/requisitionSchema.js'
import {useRequisition} from '../hooks/useRequisition.js'
import FormInput from '@/shared/components/FormInput.jsx'
import FormWrapper from '@/shared/components/FormWrapper.jsx'
import Button from '@/shared/components/Button.jsx'
import Toast from '@/shared/components/Toast.jsx'
import Modal from '@/shared/components/Modal.jsx'
import {useRef} from 'react'
import {useInventories, useInventoriesStore} from "../../../inventories/index.js";
import {useSuppliersStore} from "../../suppliers/stores/suppliersStore.js";
import {useSuppliers} from "../../suppliers/hooks/useSuppliers.js";
import AsyncSelect from "../../../../shared/components/AsyncSelect.jsx";

export const RequisitionForm = ({formType = 'add', formData = null}) => {
    const {t} = useTranslation()
    const modalRef = useRef(null)
    const {loading, error, success, add, edit, remove, clearMessage} = useRequisition()

    const products = useInventoriesStore(s => s.data)
    const suppliers = useSuppliersStore(s => s.data)

    const {get: getSuppliers, loading: loadingSuppliers, filters: filtersSuppliers, setFilters: setFiltersSuppliers} = useSuppliers()
    const {get: getProducts, loading: loadingProducts, filters: filtersProducts, setFilters: setFiltersProducts} = useInventories()

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(requisitionSchema),
        defaultValues: {
            supplier_id: formData?.supplier_id,
            product_id: formData?.product_id,
            qty: formData?.qty
        },
    })

    const onSubmit = async data => {
        if (formType === 'add') await add(data)
        else await edit(data, formData?.id)
    }

    return (
        <FormWrapper name={formType === 'add' ? t('common.add') : t('common.edit')}>
            {formType === 'edit' && (
                <>
                    <p
                        className={"capitalize font-['Medium',_ui-sans-serif] text-[length:var(--s)] text-[var(--danger-color)] cursor-pointer hover:underline justify-self-end"}
                        onClick={() => modalRef.current.toggleModal()}
                    >
                        {t('common.delete')}
                    </p>
                    <Modal ref={modalRef} title={t('common.delete')}>
                        <p>{t('confirm_delete')}</p>
                        <div className={"flex items-center justify-center gap-4 flex-wrap"}>
                            <Button onClick={() => remove(formData?.id)} variety={'button'} text={t('common.confirm')}/>
                            <Button onClick={() => modalRef.current.toggleModal()} variety={'button'} type={'danger'}
                                    text={t('common.cancel')}/>
                        </div>
                    </Modal>
                </>
            )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
                <AsyncSelect
                    label={'supplier'}
                    id={'supplier'}
                    name={'supplier_id'}
                    error={errors.supplier_id || error?.errors?.supplier_id?.[0]}
                    placeholder={'Ketik Supplier'}
                    loading={loadingSuppliers}
                    getData={getSuppliers}
                    dataOptions={suppliers?.data?.map(item => ({value: item.id, label: item.name}))}
                    dataFilters={filtersSuppliers}
                    setFilters={setFiltersSuppliers}
                    register={register}
                    pagination={suppliers?.meta}
                />
                <AsyncSelect
                    label={'product'}
                    id={'product'}
                    name={'product_id'}
                    error={errors.product_id || error?.errors?.product_id?.[0]}
                    placeholder={'Ketik Produk'}
                    loading={loadingProducts}
                    getData={getProducts}
                    dataOptions={products?.data?.map(item => ({value: item.id, label: item.name}))}
                    dataFilters={filtersProducts}
                    setFilters={setFiltersProducts}
                    register={register}
                    pagination={products?.meta}
                />
                <FormInput
                    label={t('quantity')} name="qty" id="qty" type={'number'}
                    register={register}
                    error={errors.qty || error?.errors?.qty?.[0]}
                />
                <Button isLoading={loading} shape="shape-2"/>
            </form>
            {success && <Toast type="success" message={success} onClose={clearMessage}/>}
            {error && <Toast type="danger" message={error.message} onClose={clearMessage}/>}
        </FormWrapper>
    )
}