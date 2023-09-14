import axiosInstance from '@/utils/axiosInstance'

const ProductService = {
  getProducts: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axiosInstance.get('products')
      return data.products
    } catch (error) {
      throw error
    }
  },
}

export default ProductService
