import * as yup from 'yup'

export const usersSchema = yup.object({
  // TODO: definisikan kolom sesuai kebutuhan users
  name: yup.string().required('Name wajib diisi'),
})
