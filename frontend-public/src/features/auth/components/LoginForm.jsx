import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useTranslation} from 'react-i18next'
import {loginSchema} from '../schemas/loginSchema'
import {useLogin} from '../hooks/useLogin'
import FormInput from "../../../shared/components/FormInput.jsx";
import Button from "../../../shared/components/Button.jsx";
import Badge from "../../../shared/components/Badge.jsx";

export function LoginForm() {
    const {t} = useTranslation()
    const {login, loading, errors: errorsBackend, clearMessage} = useLogin()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(loginSchema)
    })

    return (
        <>
            {errorsBackend?.message && <div className={'my-3'}>
                <Badge type={'danger'} onClose={clearMessage} size={'with-close'} text={errorsBackend?.message}/>
            </div>}
            <form
                onSubmit={handleSubmit(login)}
                noValidate
                className={'grid gap-4'}
            >
                <FormInput
                    label={t('email')}
                    name={'email'}
                    id={'email'}
                    register={register}
                    error={errors.email || errorsBackend?.errors?.email && errorsBackend?.errors?.email[0]}
                />

                <FormInput
                    label={t('password')}
                    name={'password'}
                    id={'password'}
                    type={'password'}
                    register={register}
                    error={errors.password}
                />

                <div className={'w-max place-self-center'}>
                    <Button
                        type={'primary'}
                        isLoading={loading}
                        shape={'shape-2'}
                    >
                        {t('login')}
                    </Button>
                </div>
            </form>
        </>
    )
}
