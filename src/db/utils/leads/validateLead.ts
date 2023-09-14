import { leadSchema } from '@/db/validators/leadValidator'
import { type CreateLeadRequestBody } from '@/types/Api'

interface ValidationError extends Error {
  status?: number
}

export const validateLead = (
  data: CreateLeadRequestBody,
): ValidationError | null => {
  const { error } = leadSchema.validate(data, { allowUnknown: true })
  if (error != null) {
    const validationError: ValidationError = new Error(error.details[0].message)
    validationError.status = 400
    return validationError
  }
  return null
}
