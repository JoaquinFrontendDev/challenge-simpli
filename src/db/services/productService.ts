import Product from '@/models/Product'

export const fetchProducts = async (
  query: any,
  page: number,
  limit: number,
) => {
  const products = await Product.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec()

  const count = await Product.countDocuments(query)

  return { products, count }
}
