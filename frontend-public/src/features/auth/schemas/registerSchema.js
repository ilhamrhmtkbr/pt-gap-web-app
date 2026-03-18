import * as yup from 'yup'

export const registerSchema = yup.object({
    name: yup
        .string()
        .required('Email wajib diisi'),
    email: yup
        .string()
        .email('Email tidak valid')
        .required('Email wajib diisi'),
    password: yup
        .string()
        .min(8, 'Password minimal 8 karakter')
        .required('Password wajib diisi'),
    password_confirmation: yup
        .string()
        .min(8, 'Password minimal 8 karakter')
        .required('Password wajib diisi'),
})