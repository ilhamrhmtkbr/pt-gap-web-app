import * as yup from 'yup'
export const profileSchema = yup.object({
    name: yup
        .string()
        .required('Email wajib diisi'),
    image: yup.mixed().nullable(),
    email: yup
        .string()
        .email('Email tidak valid')
        .required('Email wajib diisi'),
})