'use client'

import { createContext, useContext, useState } from 'react'

interface ProductContextType {
  productType: 'bikes' | 'accessories'
  setProductType: React.Dispatch<React.SetStateAction<'bikes' | 'accessories'>>
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
  const [productType, setProductType] = useState<'bikes' | 'accessories'>(
    'bikes',
  )

  return (
    <ProductContext.Provider value={{ productType, setProductType }}>
      {children}
    </ProductContext.Provider>
  )
}
