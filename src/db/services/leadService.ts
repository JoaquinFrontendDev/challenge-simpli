import Lead from '@/db/models/Lead'
import { type Lead as LeadType } from '@/types/Lead'

export async function createLead(data: LeadType) {
  const cleanedData: {
    productID: string
    name: string
    email: string
    message?: string
  } = {
    productID: data.productID,
    name: data.name,
    email: data.email,
  }

  if (data.message != null) {
    cleanedData.message = data.message
  }

  const lead = new Lead(cleanedData)
  return lead.save()
}
