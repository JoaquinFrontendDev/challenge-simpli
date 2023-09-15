import dbMiddleware from '@/db/middlewares/dbConnectionMiddleware'
import { type NextApiRequest, type NextApiResponse } from 'next'
import errorHandlerMiddleware from '@/db/middlewares/errorHandlerMiddleware'
import { createLead } from '@/db/services/leadService'
import { validateLead } from '@/db/utils/leads/validateLead'
import {
  type CreateLeadRequestBody,
  type CreateLeadResponse,
} from '@/types/Api'
import { ApiError } from '@/errors/ApiError'
import Lead from '@/db/models/Lead'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const leadBody: CreateLeadRequestBody = req.body

  if (req.method === 'POST') {
    const validationError = validateLead(leadBody)
    if (validationError != null) {
      throw new ApiError(400, validationError.message ?? 'Validation error')
    }

    const existingLead = await Lead.findOne({ email: leadBody.email })
    if (existingLead) {
      throw new ApiError(400, 'Bad Request')
    }

    const lead = await createLead(leadBody)
    const response: CreateLeadResponse = {
      message: 'Lead saved successfully',
      lead,
    }

    res.status(201).json(response)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default errorHandlerMiddleware(dbMiddleware(handler))
