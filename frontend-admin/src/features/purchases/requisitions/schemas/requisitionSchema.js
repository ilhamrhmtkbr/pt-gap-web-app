import * as yup from 'yup'

export const requisitionSchema = yup.object({
  supplier_id: yup.string().required(),
  product_id: yup.string().required(),
  qty: yup.string().required(),
})
