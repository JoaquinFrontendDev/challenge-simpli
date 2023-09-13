import { leadSchema } from '@/db/validators/leadValidator'

interface ValidationError extends Error {
  status?: number
}

export const validateLead = (data: any): ValidationError | null => {
  const { error } = leadSchema.validate(data, { allowUnknown: true })
  if (error) {
    const validationError: ValidationError = new Error(error.details[0].message)
    validationError.status = 400
    return validationError
  }
  return null
}
