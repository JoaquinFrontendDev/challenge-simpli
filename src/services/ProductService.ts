import axiosInstance from '@/utils/axiosInstance'

const ProductService = {
  getProducts: async (
    productType: 'bikes' | 'accessories',
    page = 1,
    filter?: string,
    minPrice?: number,
    maxPrice?: number,
  ) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const params: any = { page }

      if (filter) params.filter = filter
      if (minPrice) params.minPrice = minPrice
      if (maxPrice) params.maxPrice = maxPrice

      const { data } = await axiosInstance.get(`${productType}`, {
        params,
      })
      return data
    } catch (error) {
      throw error
    }
  },

  getProductById: async (productId: string, type: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axiosInstance.get(`${type}/${productId}`)
      return data
    } catch (error) {
      throw error
    }
  },
}

export default ProductService
