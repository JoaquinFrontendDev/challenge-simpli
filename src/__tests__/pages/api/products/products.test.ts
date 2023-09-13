/**
 * @jest-environment node
 */
import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/products'
import { Product as ProductType } from '@/types/Product'
import mongoose from 'mongoose'
import Product from '@/models/Product'
import connectDB from '@/db/database'

describe('/api/path/to/products/endpoint API Endpoint', () => {
  function mockRequestResponse(method: 'GET' = 'GET', query = {}) {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
      createMocks({ method, query })
    return { req, res }
  }

  beforeAll(async () => {
    await connectDB()
    // Añadir algunos productos de ejemplo
    await Product.create([
      {
        name: 'Producto 1',
        description: 'Descripción del Producto 1',
        price: 100.5,
        imageURL: 'https://example.com/product1.jpg',
      },
      {
        name: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 150.75,
        imageURL: 'https://example.com/product2.jpg',
      }
    ])
  })

  afterAll(async () => {
    await Product.deleteMany({})
    await mongoose.connection.close()
  })

  it('should return products correctly when valid query is passed', async () => {
    const { req, res } = mockRequestResponse('GET', { page: 1, limit: 10 })
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(responseData.products)).toBe(true)
    expect(typeof responseData.totalPages).toBe('number')
    expect(responseData.currentPage).toBe(1)
  })

  it('should filter products by name', async () => {
    const { req, res } = mockRequestResponse('GET', { filter: 'testProduct' })

    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    if (responseData.products.length > 0) {
      expect(responseData.products[0].name).toContain('testProduct')
    }
  })

  it('should filter products by price range', async () => {
    const { req, res } = mockRequestResponse('GET', {
      minPrice: 100,
      maxPrice: 500,
    })

    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    responseData.products.forEach((product: ProductType) => {
      expect(product.price).toBeGreaterThanOrEqual(100)
      expect(product.price).toBeLessThanOrEqual(500)
    })
  })

  it('should return a 405 if HTTP method is not GET', async () => {
    const { req, res } = mockRequestResponse('POST')

    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(405)
    expect(responseData).toEqual({ message: 'Method not allowed' })
  })

  it('should return an empty list for a non-existent page', async () => {
    const { req, res } = mockRequestResponse('GET', { page: 9999, limit: 10 })
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(responseData.products)).toBe(true)
    expect(responseData.products.length).toBe(0)
  })

  it('should return an empty list when filtering by a non-existent product name', async () => {
    const { req, res } = mockRequestResponse('GET', {
      filter: 'nonExistentProductName',
    })
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(responseData.products)).toBe(true)
    expect(responseData.products.length).toBe(0)
  })

  it('should return an empty list when filtering by an out-of-range price', async () => {
    const { req, res } = mockRequestResponse('GET', {
      minPrice: 99999,
      maxPrice: 100000,
    })
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(responseData.products)).toBe(true)
    expect(responseData.products.length).toBe(0)
  })

  it('should handle non-numeric values for limit and page properly', async () => {
    const { req, res } = mockRequestResponse('GET', {
      page: 'notANumber',
      limit: 'alsoNotANumber',
    })

    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(responseData.products)).toBe(true)
    expect(responseData.products.length).toBeGreaterThan(0) // Asumiendo que haya productos para mostrar por defecto
  })
})
