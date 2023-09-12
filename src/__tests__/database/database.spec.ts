jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: { readyState: 0 },
  disconnect: jest.fn(),
}))

import connectDB from '@/db/database'
import mongoose from 'mongoose'
import 'dotenv/config'

describe('database connection', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('invokes mongoose.connect with the correct parameters', async () => {
    await connectDB()

    expect(mongoose.connect).toHaveBeenCalled()
  })
})
