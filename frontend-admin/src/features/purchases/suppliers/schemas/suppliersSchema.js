import * as yup from 'yup'

export const suppliersSchema = yup.object({
  name: yup.string().required('Name wajib diisi'),
  address: yup.string().required('Address wajib diisi'),
})
