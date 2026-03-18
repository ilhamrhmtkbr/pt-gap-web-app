import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useTranslation} from 'react-i18next'
import {inventoriesSchema} from '../schemas/inventoriesSchema.js'
import {useInventories} from '../hooks/useInventories.js'
import FormInput from '@/shared/components/FormInput.jsx'
import FormWrapper from '@/shared/components/FormWrapper.jsx'
import Button from '@/shared/components/Button.jsx'
import Toast from '@/shared/components/Toast.jsx'
import Modal from '@/shared/components/Modal.jsx'
import {useEffect, useRef} from 'react'
import {AvatarCropField} from "../../../shared/components/AvatarCroppField.jsx";
import {parseRupiah} from "../../../shared/utils/formatText.js";

export const InventoriesForm = ({formType = 'add', formData = null}) => {
    const {t} = useTranslation()
    const modalRef = useRef(null)
    const {loading, error, success, add, edit, remove, clearMessage} = useInventories()

    const {register, control, reset, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(inventoriesSchema),
        defaultValues: {
            name: formData?.name ?? '',
            tag: formData?.tag ?? '',
            author: formData?.author ?? '',
            price: formData?.price ?? '',
            stock: formData?.stock ?? '',
        },
    })

    useEffect(() => {
        if (formData) {
            reset({
                name: formData.name ?? '',
                tag: formData?.tag ?? '',
                author: formData?.author ?? '',
                price: parseRupiah(formData?.price) ?? '',
                stock: formData?.stock ?? '',
            })
        }
    }, [formData])

    const onSubmit = async data => {
        const payload = new FormData()
        payload.append('name', data.name)
        payload.append('tag', data.tag)
        payload.append('author', data.author)
        payload.append('price', data.price)
        payload.append('stock', data.stock)
        if (data.image) payload.append('picture', data.image)
        if (formType === 'add') await add(payload)
        else await edit(payload, formData?.id)
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

                <AvatarCropField control={control}/>

                <FormInput
                    label={t('tag')} name="tag" id="tag"
                    register={register}
                    error={errors.tag || error?.errors?.tag?.[0]}
                />
                <FormInput
                    label={t('author')} name="author" id="author"
                    register={register}
                    error={errors.author || error?.errors?.author?.[0]}
                />
                <FormInput
                    label={t('price')} name="price" id="price"
                    register={register} type={'number'}
                    error={errors.price || error?.errors?.price?.[0]}
                />
                <FormInput
                    label={t('stock')} name="stock" id="stock"
                    register={register} type={'number'}
                    error={errors.stock || error?.errors?.stock?.[0]}
                />
                <Button isLoading={loading} shape="shape-2"/>
            </form>
            {success && <Toast type="success" message={success} onClose={clearMessage}/>}
            {error && <Toast type="danger" message={error.message} onClose={clearMessage}/>}
        </FormWrapper>
    )
}
