import { ChevronDown } from 'lucide-react'
import styles from './SelectComponent.module.css'

const SelectComponent = () => {
  return (
    <div className={styles.selectContainer}>
      <select className={styles.selectBox} defaultValue="Order: Relevance">
        <option value="relevance">Order: Relevance</option>
        <option value="asc">Order: Price Ascendent</option>
        <option value="desc">Order: Price Descendent</option>
      </select>
      <ChevronDown className={styles.chevronIcon} />
    </div>
  )
}

export default SelectComponent
