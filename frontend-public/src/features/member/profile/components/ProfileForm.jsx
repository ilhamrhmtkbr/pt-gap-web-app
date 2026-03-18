import FormInput from "../../../../shared/components/FormInput.jsx";
import FormWrapper from "../../../../shared/components/FormWrapper.jsx";
import {useTranslation} from "react-i18next";
import {profileSchema} from "../index.js";
import Button from "../../../../shared/components/Button.jsx";
import {useProfile} from "../hooks/useProfile.js";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuthStore} from "../../../auth/index.js";
import {AvatarCropField} from "../../../../shared/components/AvatarCroppField.jsx";
import Image from "../../../../shared/components/Image.jsx";
import Toast from "../../../../shared/components/Toast.jsx";

export const ProfileForm = () => {
    const {t} = useTranslation()
    const user = useAuthStore(s => s.user)
    const {loading, errors: errorsBackend, success, edit, clearMessage} = useProfile()

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: user?.data?.name ?? '',
            email: user?.data?.email ?? ''
        }
    })

    const onSubmit = async (data) => {
        const payload = new FormData()
        payload.append('name', data.name)
        payload.append('email', data.email)
        if (data.image) payload.append('image', data.image)

        await edit(payload, user?.data?.id)
    }

    return (
        <FormWrapper name={t('common.edit')}>
            {user?.data?.image ? <Image src={import.meta.env.VITE_APP_IMAGE_USER_URL + user?.data?.image}/> :
                user?.data?.avatar && <Image src={user?.data?.avatar}/>}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">

                <AvatarCropField control={control}/>

                <FormInput label={t('name')} name="name" id="name"
                           register={register}
                           error={errors.name || errorsBackend?.errors?.name && errorsBackend?.errors?.name[0]}/>

                <FormInput label={t('email')} name="email" id="email"
                           register={register}
                           error={errors.email || errorsBackend?.errors?.email && errorsBackend?.errors?.email[0]}/>

                <Button isLoading={loading} shape="shape-2">
                    {t('login')}
                </Button>
            </form>

            {success && <Toast type={"success"} message={success} onClose={clearMessage}/>}
        </FormWrapper>
    )
}

