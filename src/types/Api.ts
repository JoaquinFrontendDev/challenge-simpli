// Lead API types

import { type Lead } from './Lead'

export interface LeadResponse {
  id: string
  fullName: string
  email: string
  productId: string
  message?: string
}

export interface CreateLeadResponse {
  message: string
  lead: LeadResponse
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type CreateLeadRequestBody = Omit<Lead, '_id'>

// Products API types

export interface ProductResponse {
  id: string
  name: string
  price: number
  imageUrl: string
  description?: string
}

export interface ProductsListResponse {
  products: ProductResponse[]
  totalPages: number
  currentPage: number
}

export interface ProductsQueryParams {
  page?: number
  limit?: number
  filter?: string
  minPrice?: string
  maxPrice?: string
}

export interface ApiError {
  message: string
  statusCode: number
}
