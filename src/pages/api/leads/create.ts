import dbMiddleware from '@/db/middlewares/dbConnectionMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import { leadSchema } from '@/db/validators/leadValidator'
import errorHandlerMiddleware from '@/db/middlewares/errorHandlerMiddleware'
import { createLead } from '@/db/services/leadService'

interface validationError extends Error {
  status?: number
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { error } = leadSchema.validate(req.body)

    if (error) {
      const validationError: validationError = new Error(error.details[0].message)
      validationError.status = 400
      throw validationError
    }

    try {
      const lead = await createLead(req.body)

      res.status(201).json({ message: 'Lead saved successfully', lead })
    } catch (error) {
      throw error
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default errorHandlerMiddleware(dbMiddleware(handler))
