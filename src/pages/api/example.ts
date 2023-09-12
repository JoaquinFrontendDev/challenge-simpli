import dbMiddleware from '@/db/middlewares/dbConnectionMiddleware'
import Product from '@/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(201).json({ message: 'API working fine' })
  }
}

export default dbMiddleware(handler)
