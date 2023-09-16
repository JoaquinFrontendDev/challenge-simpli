'use client'

import { createContext, useContext, useState } from 'react'

enum ProductTypes {
  BIKES = 'bikes',
  ACCESSORIES = 'accessories',
}

interface ProductContextType {
  productType: ProductTypes
  setProductType: React.Dispatch<React.SetStateAction<ProductTypes>>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}

export const ProductProvider: React.FC = ({ children }) => {
  const [productType, setProductType] = useState<ProductTypes>(
    ProductTypes.BIKES,
  )

  return (
    <ProductContext.Provider value={{ productType, setProductType }}>
      {children}
    </ProductContext.Provider>
  )
}
