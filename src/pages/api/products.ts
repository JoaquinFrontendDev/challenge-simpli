import dbMiddleware from '@/db/middlewares/dbConnectionMiddleware'
import Product from '@/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'

interface ProductQuery {
  name?: RegExp
  price?: {
    $gte?: number
    $lte?: number
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page = 1, limit = 10, filter, minPrice, maxPrice } = req.query

    const filterValue = Array.isArray(filter) ? filter[0] : filter

    const query: ProductQuery = {}

    if (filterValue) {
      query.name = new RegExp(filterValue, 'i')
    }

    if (filterValue) {
      query.name = new RegExp(filterValue, 'i')
    }

    if (minPrice || maxPrice) {
      query.price = {}

      if (minPrice) {
        query.price.$gte = Number(minPrice)
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice)
      }
    }

    try {
      const products = await Product.find(query)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .exec()

      const count = await Product.countDocuments(query)

      res.status(200).json({
        products,
        totalPages: Math.ceil(count / Number(limit)),
        currentPage: Number(page),
      })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default dbMiddleware(handler)
