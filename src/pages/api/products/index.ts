import dbMiddleware from '@/db/middlewares/dbConnectionMiddleware'
import { productQueryBuilder } from '@/db/utils/products/productQueryBuilder'
import Product from '@/db/models/Product'
import {
  type ProductsListResponse,
  type ProductsQueryParams,
} from '@/types/Api'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { ApiError } from '@/errors/ApiError'
import errorHandlerMiddleware from '@/db/middlewares/errorHandlerMiddleware'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    throw new ApiError(405, 'Method not allowed')
  }

  let {
    page = 1,
    limit = 12,
    filter,
    minPrice,
    maxPrice,
  } = req.query as ProductsQueryParams

  page = Number(page)
  limit = Number(limit)

  if (page < 1 || limit < 1 || limit > 100) {
    throw new ApiError(400, 'Invalid page or limit values')
  }

  const query = productQueryBuilder(
    filter as string,
    minPrice as string,
    maxPrice as string,
  )

  try {
    const products = await Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    const count = await Product.countDocuments(query)

    const response: ProductsListResponse = {
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    }
    res.status(200).json(response)
  } catch (error) {
    throw new ApiError(500, 'Error fetching products')
  }
}

export default errorHandlerMiddleware(dbMiddleware(handler))
