import React, { useState } from 'react'
import styles from './FiltersWrapper.module.css'

interface FiltersProps {
  onFilterChange: (filter: string, minPrice: string, maxPrice: string) => void
}

function FiltersWrapper({ onFilterChange }: FiltersProps) {
  const [filter, setFilter] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleInputChange = () => {
    onFilterChange(filter, minPrice, maxPrice)
  }

  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value)
          handleInputChange()
        }}
        className={styles.filterInput}
      />
      <input
        type="number"
        placeholder="Precio mínimo"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value)
          handleInputChange()
        }}
        className={styles.filterInput}
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(e.target.value)
          handleInputChange()
        }}
        className={styles.filterInput}
      />
    </div>
  )
}

export default FiltersWrapper
