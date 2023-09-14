import { ApiError } from '@/errors/ApiError'
import {
  type NextApiHandler,
  type NextApiRequest,
  type NextApiResponse,
} from 'next'

const errorHandlerMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ message: error.message })
        return
      }

      if (process.env.NODE_ENV !== 'test') {
        console.error(error)
      }
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default errorHandlerMiddleware
