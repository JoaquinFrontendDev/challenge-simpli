'use client'

import { useProductContext } from '@/context/ProductContext'
import styles from './Header.module.css'
import { ChevronDown, DollarSign, ShoppingBasket, User2 } from 'lucide-react'

function Header() {
  const { setProductType, productType } = useProductContext()

  return (
    <div className={styles.headerContainer}>
      <div className={styles.tradeMark}>
        Simpli<span className={styles.tradeMarkSpan}>Muv</span>
      </div>
      <div className={styles.navbarWrapper}>
        <div
          className={productType === 'bikes' ? styles.active : ''}
          onClick={() => {
            setProductType('bikes')
          }}
        >
          Bikes
        </div>
        <div
          className={productType === 'accessories' ? styles.active : ''}
          onClick={() => {
            setProductType('accessories')
          }}
        >
          Accesories
        </div>
        <div>Apparel</div>
      </div>
      <div className={styles.headerRightSide}>
        <div className={styles.currencySelect}>
          <DollarSign size={20} color="#999" />
          <span>USD</span>
          <ChevronDown size={25} />
        </div>
        <div>
          <ShoppingBasket size={30} />
        </div>
        <div>
          <User2 size={25} />
        </div>
      </div>
    </div>
  )
}

export default Header
