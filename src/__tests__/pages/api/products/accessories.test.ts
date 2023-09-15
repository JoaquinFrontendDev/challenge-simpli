/**
 * @jest-environment node
 */
import {
  createMocks,
  type createRequest,
  type createResponse,
} from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { Accessory } from '@/db/models/Product'
import connectDB from '@/db/database'
import { accessoryHandler } from '@/db/utils/createProductHandler'
import { type Accessory as AccessoryType } from '@/types/Product'

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

describe('/api/path/to/products/endpoint API Endpoint', () => {
  const handler = accessoryHandler
  function mockRequestResponse(method: 'GET' = 'GET', query = {}) {
    const { req, res }: { req: ApiRequest; res: APiResponse } = createMocks({
      method,
      query,
    })
    return { req, res }
  }

  beforeAll(async () => {
    await connectDB()
    await Accessory.create([
      {
        name: 'Bike 1',
        description: 'Descripción del Bike 1',
        price: 100.5,
        imageURL: 'https://example.com/bike1.jpg',
      },
      {
        name: 'Bike 2',
        description: 'Descripción del Bike 2',
        price: 100.5,
        imageURL: 'https://example.com/bike2.jpg',
      },
      {
        name: 'Bike 3',
        description: 'Descripción del Bike 3',
        price: 100.5,
        imageURL: 'https://example.com/bike3.jpg',
      },
      {
        name: 'Bike 4',
        description: 'Descripción del Bike 4',
        price: 100.5,
        imageURL: 'https://example.com/bike4.jpg',
      },
    ])
  })

  afterAll(async () => {
    await Accessory.deleteMany({})
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

    responseData.products.forEach((product: AccessoryType) => {
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
    expect(responseData.products.length).toBeGreaterThan(0)
  })

  it('should use default limit when not provided', async () => {
    const { req, res } = mockRequestResponse('GET', { page: 1 })
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(responseData.products.length).toBeLessThanOrEqual(10)
  })

  it('should filter products by only minPrice', async () => {
    const { req, res } = mockRequestResponse('GET', { minPrice: 100 })

    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    responseData.products.forEach((product: AccessoryType) => {
      expect(product.price).toBeGreaterThanOrEqual(100)
    })
  })

  it('should filter products by only maxPrice', async () => {
    const { req, res } = mockRequestResponse('GET', { maxPrice: 500 })

    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    responseData.products.forEach((product: AccessoryType) => {
      expect(product.price).toBeLessThanOrEqual(500)
    })
  })

  it('should handle negative values for limit and page', async () => {
    const { req, res } = mockRequestResponse('GET', {
      page: '-5',
      limit: '-10',
    })

    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(400)
    expect(responseData).toEqual({ message: 'Invalid page or limit values' })
  })

  it('should handle special characters in name filter properly', async () => {
    const { req, res } = mockRequestResponse('GET', { filter: 'Producto$' })
    await handler(req, res)
    expect(res.statusCode).toBe(200)
  })

  it('should respect the maximum limit value', async () => {
    const { req, res } = mockRequestResponse('GET', { page: 1, limit: 13 })
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(200)
    expect(responseData.products.length).toBeLessThanOrEqual(10)
  })

  it('should return correct product structure in response', async () => {
    const { req, res } = mockRequestResponse('GET', { page: 1, limit: 10 })
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(200)
    expect(responseData).toHaveProperty('products')
    expect(responseData).toHaveProperty('totalPages')
    expect(responseData).toHaveProperty('currentPage')

    if (responseData.products.length > 0) {
      expect(responseData.products[0]).toHaveProperty('name')
      expect(responseData.products[0]).toHaveProperty('description')
      expect(responseData.products[0]).toHaveProperty('price')
      expect(responseData.products[0]).toHaveProperty('imageURL')
    }
  })
})
