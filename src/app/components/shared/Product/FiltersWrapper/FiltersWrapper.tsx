import React, { useEffect, useState } from 'react'
import styles from './FiltersWrapper.module.css'
import SelectComponent from '../../SelectComponent/SelectComponent'

interface FiltersProps {
  onFilterChange: (filter: string, minPrice: number, maxPrice: number) => void
}

function FiltersWrapper({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState({
    filter: '',
    minPrice: null as number | null,
    maxPrice: null as number | null,
  })

  useEffect(() => {
    onFilterChange(
      filters.filter,
      Number(filters.minPrice),
      Number(filters.maxPrice),
    )
  }, [filters])

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterInput}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={filters.filter}
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, filter: e.target.value }))
          }}
        />
      </div>
      <div className={styles.filterInput}>
        <input
          type="number"
          placeholder="Precio mínimo"
          value={filters.minPrice ?? ''}
          onChange={(e) => {
            setFilters((prev) => ({
              ...prev,
              minPrice: e.target.value ? parseFloat(e.target.value) : null,
            }))
          }}
        />
      </div>
      <div className={styles.filterInput}>
        <input
          type="number"
          placeholder="Precio máximo"
          value={filters.maxPrice ?? ''}
          onChange={(e) => {
            setFilters((prev) => ({
              ...prev,
              maxPrice: e.target.value ? parseFloat(e.target.value) : null,
            }))
          }}
        />
      </div>
      <SelectComponent />
    </div>
  )
}

export default FiltersWrapper
