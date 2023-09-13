import dbMiddleware from '@/db/middlewares/dbConnectionMiddleware'
import {productQueryBuilder} from '@/db/utils/products/productQueryBuilder'
import Product from '@/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let { page = 1, limit = 10, filter, minPrice, maxPrice } = req.query

    page = Number(page)
    limit = Number(limit)

    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({ message: 'Invalid page or limit values' })
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

      res.status(200).json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default dbMiddleware(handler)
