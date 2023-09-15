import { Bike, Accessory } from '@/db/models/Product'

type ProductType = 'bikes' | 'accessories'

export const fetchProductById = async (
  productId: string,
  type: ProductType,
) => {
  let Model

  switch (type) {
    case 'bikes':
      Model = Bike
      break
    case 'accessories':
      Model = Accessory
      break
    default:
      throw new Error('Invalid product type')
  }

  const product = await Model.findById(productId).exec()

  if (product == null) {
    throw new Error('Product not found')
  }

  return product
}
