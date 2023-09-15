import axiosInstance from '@/utils/axiosInstance'
import { type CreateLeadRequestBody } from '../types/Api'

const LeadService = {
  createLead: async (leadData: CreateLeadRequestBody) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axiosInstance.post('leads/create', leadData)
      return data
    } catch (error) {
      throw error
    }
  },
}

export default LeadService
