import Joi from 'joi'

export const leadSchema = Joi.object({
  productID: Joi.string().required().messages({
    'string.base': 'El ID del producto debe ser un texto.',
    'string.empty': 'El ID del producto no debe estar vacío.',
    'any.required': 'El ID del producto es requerido.',
  }),
  name: Joi.string().min(3).required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre no debe estar vacío.',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
    'any.required': 'El nombre es requerido.',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'El correo electrónico debe ser un texto.',
    'string.email': 'El correo electrónico no es válido.',
    'string.empty': 'El correo electrónico no debe estar vacío.',
    'any.required': 'El correo electrónico es requerido.',
  }),
  message: Joi.string().optional().messages({
    'string.base': 'El mensaje debe ser un texto.',
    'string.empty': 'El mensaje no debe estar vacío.',
  }),
})
