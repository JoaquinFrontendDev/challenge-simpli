import Lead from '@/models/Lead'

export async function createLead(data: {
  productID: string
  name: string
  email: string
  message?: string
}) {
  const lead = new Lead(data)
  return await lead.save()
}
