import dbMiddleware from '@/db/middlewares/dbConnectionMiddleware'
import { NextApiRequest, NextApiResponse } from 'next'
import errorHandlerMiddleware from '@/db/middlewares/errorHandlerMiddleware'
import { createLead } from '@/db/services/leadService'
import { validateLead } from '@/db/utils/leads/validateLead'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const validationError = validateLead(req.body)
    if (validationError) {
      throw validationError
    }

    const lead = await createLead(req.body)
    res.status(201).json({ message: 'Lead saved successfully', lead })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default errorHandlerMiddleware(dbMiddleware(handler))
