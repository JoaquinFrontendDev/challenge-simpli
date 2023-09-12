import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import connectDB from '../database'

const dbMiddleware =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDB()
    return handler(req, res)
  }

export default dbMiddleware
