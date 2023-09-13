import Joi from 'joi'

export const leadSchema = Joi.object({
  productID: Joi.string().required().messages({
    'string.base': 'Product ID must be a string.',
    'string.empty': 'Product ID should not be empty.',
    'any.required': 'Required data missing',
  }),
  name: Joi.string().min(3).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name should not be empty.',
    'string.min': 'Name should have at least {#limit} characters.',
    'any.required': 'Name is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.email': 'Invalid email format',
    'string.empty': 'Email should not be empty.',
    'any.required': 'Email is required.',
  }),
  message: Joi.string().optional().messages({
    'string.base': 'Message must be a string.',
    'string.empty': 'Message should not be empty.',
  }),
})
