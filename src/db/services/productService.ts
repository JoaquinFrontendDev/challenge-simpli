import Product from '@/models/Product'

export const fetchProducts = async (
  query: any,
  page: number,
  limit: number,
) => {
  const validPage = page > 0 ? page : 1
  const validLimit = limit > 0 ? limit : 10

  const products = await Product.find(query)
    .limit(validLimit)
    .skip((validPage - 1) * validLimit)
    .exec()

  const count = await Product.countDocuments(query)

  return { products, count }
}
