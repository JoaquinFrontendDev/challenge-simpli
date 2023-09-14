import Product from '@/db/models/Product'
import { type ProductsQueryParams } from '@/types/Api'

export const fetchProducts = async (
  query: ProductsQueryParams,
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
