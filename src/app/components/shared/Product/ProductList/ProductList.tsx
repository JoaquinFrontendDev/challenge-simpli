'use client'

import { type Product } from '@/types/Product'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductList.module.css'
import ProductService from '@/services/ProductService'
import { useProductContext } from '@/context/ProductContext'
import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '@/errors/ApiError'
import Pagination from '../../Pagination/Pagination'
import FiltersWrapper from '../FiltersWrapper/FiltersWrapper'
import { validateFilters } from './utils/validateFilters'
import { debounce } from '@/utils/debounce'

function ProductList() {
  const { productType } = useProductContext()
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchProducts = async (filters: {
    filter?: string
    minPrice?: number | null
    maxPrice?: number | null
    page?: number
  }) => {
    const { filter, minPrice, maxPrice, page = currentPage } = filters
    const response = await ProductService.getProducts(
      productType,
      page,
      filter,
      minPrice,
      maxPrice,
    )
    setProducts(response.products)
    setCurrentPage(response.currentPage)
    setTotalPages(response.totalPages)
  }

  useEffect(() => {
    fetchProducts({ page: currentPage }).catch((error) => {
      throw new ApiError(500, error.message)
    })
  }, [productType, currentPage])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const debouncedFetchProducts = useCallback(
    debounce(
      (filters: { filter: string; minPrice: number; maxPrice: number }) => {
        fetchProducts(filters).catch((error) => {
          throw new ApiError(500, error.message)
        })
      },
      800,
    ),
    [],
  )

  const handleFiltersChange = useCallback(
    (filter: string, minPrice: number | null, maxPrice: number | null) => {
      if (validateFilters(filter, minPrice, maxPrice)) {
        debouncedFetchProducts({ filter, minPrice, maxPrice })
      }
    },
    [debouncedFetchProducts],
  )

  return (
    <div className={styles.productListContainer}>
      <div className={styles.filtersContainer}>
        <FiltersWrapper onFilterChange={handleFiltersChange} />
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
