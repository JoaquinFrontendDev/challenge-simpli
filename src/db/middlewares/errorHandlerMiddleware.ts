import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

interface ApiError extends Error {
  status?: number
  message: string
}

const errorHandlerMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error)
      }

      const statusCode = (error as ApiError).status || 500
      const errorMessage =
        (error as ApiError).message || 'Internal server error'

      res.status(statusCode).json({ message: errorMessage })
    }
  }
}

export default errorHandlerMiddleware
