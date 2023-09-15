'use client'

import { type Product } from '@/types/Product'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductList.module.css'
import SelectComponent from '@/app/components/shared/SelectComponent/SelectComponent'
import ProductService from '@/services/ProductService'
import { useProductContext } from '@/context/ProductContext'
import { useEffect, useState } from 'react'
import { ApiError } from '@/errors/ApiError'
import Pagination from '../../Pagination/Pagination'
import FiltersWrapper from '../FiltersWrapper/FiltersWrapper'

function ProductList() {
  const { productType } = useProductContext()
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductService.getProducts(
        productType,
        currentPage,
      )
      setProducts(response.products)
      setCurrentPage(response.currentPage)
      setTotalPages(response.totalPages)
    }

    fetchProducts().catch((error) => {
      throw new ApiError(500, error.message)
    })
  }, [productType, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFiltersChange = (
    filter: string,
    minPrice: string,
    maxPrice: string,
  ) => {
    // Aquí puedes llamar a la API nuevamente o hacer lo que necesites con los valores de los filtros.
  }

  return (
    <div className={styles.productListContainer}>
      <div className={styles.filtersContainer}>
        <FiltersWrapper onFilterChange={handleFiltersChange} />
        <SelectComponent />
      </div>
      <div className={styles.productListWrapper}>
        {products.map((product: Product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.imageURL}
            name={product.name}
            price={product.price}
            isMultiple={product?.isMultiple}
          />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default ProductList
