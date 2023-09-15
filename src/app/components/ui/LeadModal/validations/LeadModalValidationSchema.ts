import * as Yup from 'yup'

export const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Email invalid').required('Required'),
  phone: Yup.number().typeError('Phone must be a number').required('Required'),
})
