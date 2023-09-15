import axiosInstance from '@/utils/axiosInstance'

const ProductService = {
  getProducts: async (productType: 'bikes' | 'accessories', page = 1) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axiosInstance.get(
        `products/${productType}?page=${page}`,
      )
      return data
    } catch (error) {
      throw error
    }
  },

  getProductById: async (productId: string, type: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axiosInstance.get(`products/${type}/${productId}`)
      return data
    } catch (error) {
      throw error
    }
  },
}

export default ProductService
