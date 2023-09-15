import { ApiError } from '@/errors/ApiError'
import dbMiddleware from '../middlewares/dbConnectionMiddleware'
import errorHandlerMiddleware from '../middlewares/errorHandlerMiddleware'
import { Accessory, Bike } from '../models/Product'
import {
  type ProductsListResponse,
  type ProductsQueryParams,
} from '@/types/Api'
import { productQueryBuilder } from './products/productQueryBuilder'
import { type NextApiRequest, type NextApiResponse } from 'next'

// Este es un constructor de manejadores que toma un modelo de Mongoose.
function createProductHandler(Model: any) {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    // Nota: Puedes necesitar modificar productQueryBuilder para soportar
    // diferentes tipos de productos o adaptar la lógica de consulta según sea necesario.
    const query = productQueryBuilder(
      filter as string,
      minPrice as string,
      maxPrice as string,
    )

    try {
      const products = await Model.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec()

      const count = await Model.countDocuments(query)

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
}

// Luego puedes crear manejadores específicos para Bikes y Accessories:
const bikeHandler = errorHandlerMiddleware(
  dbMiddleware(createProductHandler(Bike)),
)
const accessoryHandler = errorHandlerMiddleware(
  dbMiddleware(createProductHandler(Accessory)),
)

export { bikeHandler, accessoryHandler }
