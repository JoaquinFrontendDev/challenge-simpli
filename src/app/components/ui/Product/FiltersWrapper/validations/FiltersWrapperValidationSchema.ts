import * as Yup from 'yup'

export const validationSchema = Yup.object({
  filter: Yup.string().trim(),
  minPrice: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Price cannot be negative')
    .test(
      'is-greater',
      'Min price should not be greater than Max price',
      function (value: number | undefined) {
        const maxPrice = this.resolve(Yup.ref('maxPrice'))
        if (typeof value !== 'number' || typeof maxPrice !== 'number')
          return true
        return value <= maxPrice
      },
    ),
  maxPrice: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Price cannot be negative')
    .test(
      'is-less',
      'Max price should not be less than Min price',
      function (value: number | undefined) {
        const minPrice = this.resolve(Yup.ref('minPrice'))
        if (typeof value !== 'number' || typeof minPrice !== 'number')
          return true
        return value >= minPrice
      },
    ),
})
