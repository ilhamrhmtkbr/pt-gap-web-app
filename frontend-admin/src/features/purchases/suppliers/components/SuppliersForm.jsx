import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useTranslation} from 'react-i18next'
import {suppliersSchema} from '../schemas/suppliersSchema.js'
import {useSuppliers} from '../hooks/useSuppliers.js'
import FormInput from '@/shared/components/FormInput.jsx'
import FormWrapper from '@/shared/components/FormWrapper.jsx'
import Button from '@/shared/components/Button.jsx'
import Toast from '@/shared/components/Toast.jsx'
import Modal from '@/shared/components/Modal.jsx'
import {useEffect, useRef} from 'react'

export const SuppliersForm = ({formType = 'add', formData = null}) => {
    const {t} = useTranslation()
    const modalRef = useRef(null)
    const {loading, error, success, add, edit, remove, clearMessage} = useSuppliers()

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(suppliersSchema),
        defaultValues: {
            name: formData?.name ?? '',
            address: formData?.address ?? ''
        },
    })

    useEffect(() => {
        if (formData) {
            reset({
                name: formData.name ?? '',
                address: formData.address ?? ''
            })
        }
    }, [formData])

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
                <FormInput
                    label={t('name')} name="name" id="name"
                    register={register}
                    error={errors.name || error?.errors?.name?.[0]}
                />
                <FormInput
                    label={t('address')} name="address" id="address"
                    register={register}
                    error={errors.address || error?.errors?.address?.[0]}
                />
                <Button isLoading={loading} shape="shape-2"/>
            </form>
            {success && <Toast type="success" message={success} onClose={clearMessage}/>}
            {error && <Toast type="danger" message={error.message} onClose={clearMessage}/>}
        </FormWrapper>
    )
}
