import dbMiddleware from '@/db/middlewares/dbConnectionMiddleware'
import errorHandlerMiddleware from '@/db/middlewares/errorHandlerMiddleware'
import { Accessory } from '@/db/models/Product'
import { ApiError } from '@/errors/ApiError'
import { type NextApiRequest, type NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    throw new ApiError(405, 'Method not allowed')
  }

  if (req.query.id) {
    try {
      const product = await Accessory.findById(req.query.id).exec()

      if (!product) {
        throw new ApiError(404, 'Product not found')
      }

      res.status(200).json(product)
    } catch (error) {
      throw new ApiError(500, 'Error fetching product by ID')
    }
  }
}

export default errorHandlerMiddleware(dbMiddleware(handler))
