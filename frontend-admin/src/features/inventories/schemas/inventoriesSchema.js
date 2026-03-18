import * as yup from 'yup'

export const inventoriesSchema = yup.object({
    name: yup.string().required(),
    picture: yup.mixed().nullable(),
    tag: yup.string().required(),
    author: yup.string().required(),
    price: yup.string().required(),
    stock: yup.string().required()
})
