/**
 * @jest-environment node
 */
jest.mock('@/db/services/leadService.ts')

import { createMocks } from 'node-mocks-http'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/leads/create'
import mongoose from 'mongoose'
import * as leadService from '@/db/services/leadService'

describe('/api/leads/create API Endpoint', () => {
  function mockRequestResponse(method: 'POST' = 'POST', body = {}) {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
      createMocks({ method, body })
    return { req, res }
  }

  const someInvalidLeadData = {
    name: '',
    email: '',
  }

  const someValidLeadData = {
    productID: 'adas1231f123f1233dxS',
    name: 'Joaquin Retola',
    email: 'joaquin.retola@gmail.com'
  }

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should create a lead and return a successful message for a valid POST request', async () => {
    leadService.createLead.mockResolvedValue({
      id: 'someId',
      ...someValidLeadData,
    })

    const { req, res } = mockRequestResponse('POST', someValidLeadData)
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(201)
    expect(responseData.message).toBe('Lead saved successfully')
    expect(responseData.lead).toBeDefined()
  })

  it('should return an error if data validation fails', async () => {
    const { req, res } = mockRequestResponse('POST', someInvalidLeadData)
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(400)
    expect(responseData.message).toBeDefined()
  })

  it('should return a 405 if HTTP method is not POST', async () => {
    const { req, res } = mockRequestResponse('GET')
    await handler(req, res)

    const responseData = JSON.parse(res._getData())

    expect(res.statusCode).toBe(405)
    expect(responseData).toEqual({ message: 'Method not allowed' })
  })
})
