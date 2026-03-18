import {useRegister} from "../hooks/useRegister.js";
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {registerSchema} from '../schemas/registerSchema'
import FormInput from "../../../shared/components/FormInput.jsx";
import Button from "../../../shared/components/Button.jsx";

export function RegisterForm() {
    const {t} = useTranslation()
    const {register: submitRegister, loading, errors: errorsBackend} = useRegister()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: yupResolver(registerSchema)})

    return (
        <form onSubmit={handleSubmit(submitRegister)} noValidate className={'grid gap-4'}>
            <FormInput
                label={'name'}
                name={'name'}
                id={'name'}
                register={register}
                error={errors.name || errorsBackend?.errors?.name && errorsBackend?.errors?.name[0]}/>
            <FormInput
                label={'email'}
                name={'email'}
                id={'email'}
                register={register}
                error={errors.email || errorsBackend?.errors?.email && errorsBackend?.errors?.email[0]}/>
            <FormInput
                label={'password'}
                name={'password'}
                id={'password'}
                register={register}
                error={errors.password || errorsBackend?.errors?.password && errorsBackend?.errors?.password[0]}/>
            <FormInput
                label={'password_confirmation'}
                name={'password_confirmation'}
                id={'password_confirmation'}
                register={register}
                error={errors.password_confirmation || errorsBackend?.errors?.password_confirmation && errorsBackend?.errors?.password_confirmation[0]}/>
            <div className={'w-max place-self-center'}>
                <Button isLoading={loading} shape={'shape-2'}/>
            </div>
        </form>
    )
}

export default RegisterForm;